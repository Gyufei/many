'use client';

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Web3Context } from './web3-context';
import { Chains, ChainName, chainNameMap } from './lib/const';
import { useRpcInput } from './hook/use-rpc-input';
import NewWalletDialog from './new-wallet-dialog';
import { CopyBtn } from './copy-btn';
import { Paths } from './lib/PathMap';
import { NFTContext } from './nft-context';
import { constants } from 'ethers';
import { IWallet } from './hook/use-wallet';
import { useBalanceDisplay } from './hook/use-balance-display';
import { GlobalMsgContext } from './global-msg-context';
import FaucetIcon from './faucet-icon';

let CurrentHash: string = '';
let InfoTimeout: number;

export default function Section2() {
  const {
    currentChainInfo,
    wallets,
    currentWalletInfo,
    addWallet,
    setCurrentWallet,
    setCurrentChain,
    provider,
    wallet,
    deleteWallet,
    contract,
    setHashRate,
  } = useContext(Web3Context);

  const { currentNFTInfo } = useContext(NFTContext);

  const { setGlobalMessage } = useContext(GlobalMsgContext);

  const { balance, balanceSymbol, rewardBalance, updateBalance } = useBalanceDisplay();

  const address = currentWalletInfo?.address || '';
  const currency = currentChainInfo?.nativeCurrency || '';

  const {
    rpcInputRef,
    currentRpc,
    showRpcInput,
    showInputAction,
    customRpcValue,
    setCustomRpcValue,
    handleInputKeyDown,
    handleOnBlur,
    handleSaveRpc,
  } = useRpcInput(currentChainInfo?.id);

  const [rpcBlockHover, setRpcBlockHover] = useState(false);
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [showNetSelect, setShowNetSelect] = useState(false);
  const [showNewWalletDialog, setShowNewWalletDialog] = useState(false);

  const [mineTimeout, setMineTimeout] = useState<number>();
  const [isMining, setIsMining] = useState(false);

  const [currentHash, setCurrentHash] = useState<string | null>(null);

  const workerRef = useRef<Worker>();

  function shorterAddress(address: string) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const shortenAddress = useMemo(() => {
    return shorterAddress(address);
  }, [address]);

  function handleSelectWallet(address: string) {
    if (currentWalletInfo && address) {
      setGlobalMessage({ type: 'success', message: 'Wallet Changed' });
    }
    setCurrentWallet(address);
    setShowWalletSelect(false);
  }

  function handleToSelectWallet() {
    if (isMining && !showWalletSelect) {
      return;
    }

    setShowWalletSelect(!showWalletSelect);
  }

  function handleToSelectNet() {
    if (isMining && !showNetSelect) {
      return;
    }

    setShowNetSelect(!showNetSelect);
  }

  function handleSelectNet(chain: ChainName) {
    setCurrentChain(chain);
    setShowNetSelect(false);
  }

  async function getNonce() {
    const nonce = await provider.getTransactionCount(currentWalletInfo.address);
    return nonce;
  }

  async function register() {
    const contractObj = contract;

    const nonce = await getNonce();

    if (Number(nonce) !== 0) {
      throw new Error('nonce error');
    }

    try {
      const gasLimit = await (contractObj.estimateGas as any)['register']();
      await contractObj.register({
        gasLimit: gasLimit.toString(),
      });
    } catch (e) {
      console.error(e);
      console.log('register failed');
      throw new Error('register failed');
    }
    console.log('register complete');
  }

  async function getContractInfo(prevHash: string) {
    return new Promise<{
      minedCurrentHash: string;
      minedLastMinedAt: number;
      difficultyHash: string;
      minBlockTimes: string;
    }>(async (resolve, reject) => {
      const contractObj = contract;

      const checkHash = async () => {
        const user_info = await contractObj.userInfoMap(address);
        const newCurrentHash = user_info.currentHash;

        if (newCurrentHash == '0x0000000000000000000000000000000000000000000000000000000000000000') {
          await register();
        }

        if (prevHash !== newCurrentHash) {
          if (InfoTimeout) {
            clearTimeout(InfoTimeout);
          }
          CurrentHash = user_info.currentHash;

          const treasuryInfo = await contractObj.treasuryInfo();
          const difficultyHash = treasuryInfo.difficultyHash;
          const minBlockTimes = treasuryInfo.minBlockTimes.toString();

          resolve({
            minedCurrentHash: user_info.currentHash,
            minedLastMinedAt: user_info.lastMinedAt,
            difficultyHash,
            minBlockTimes,
          });
        } else {
          InfoTimeout = setTimeout(checkHash, 1000) as any;
        }
      };

      try {
        await checkHash();
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  async function fetchMineSignature(minedHash: string, salt: string) {
    const path = Paths.mine;
    const chainName = chainNameMap[currentChainInfo.name];
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        minedHash,
        salt,
        wallet: currentWalletInfo.address,
        chain_name: chainName,
      }),
    });

    const jsonRes = await res.json();
    return jsonRes.status ? jsonRes.data : {};
  }

  async function mineAction(mined: { computedHash: string; saltHex: string }) {
    try {
      const { signature, orderId, merkleProof } = await fetchMineSignature(mined.computedHash, mined.saltHex);

      const {
        id: serialId,
        tokenId,
        address: nftTokenAddress,
      } = currentNFTInfo || {
        id: 0,
        tokenId: 0,
        address: constants.AddressZero,
      };

      const contractObj = contract;
      const gasLimit = await (contractObj.estimateGas as any)['mine'](
        serialId,
        tokenId,
        nftTokenAddress,
        mined.computedHash,
        mined.saltHex,
        merkleProof,
        signature
      );

      await contractObj.mine(serialId, tokenId, nftTokenAddress, mined.computedHash, mined.saltHex, merkleProof, signature, {
        gasLimit: gasLimit.toString(),
      });

      updateBalance();
    } catch (e) {
      mineStop();
    }
  }

  async function mineStart() {
    if (!currentWalletInfo) {
      setGlobalMessage({ type: 'error', message: 'No Wallet!' });
      return;
    }

    if (Number(balance) <= 0) {
      setGlobalMessage({ type: 'error', message: 'Insufficient Gas!' });
      return;
    }

    try {
      if (workerRef.current) {
        workerRef.current.terminate();
      }

      const worker = new Worker('/js/work.js');
      workerRef.current = worker;

      setIsMining(true);

      worker.addEventListener('message', (event) => {
        const { data } = event;
        console.log(data, 'receive form worker');
        const dataReal = JSON.parse(data);

        if (dataReal.type === 'hash') {
          const { computedHash, saltHex, signature, hashRate } = dataReal.payload;
          mineAction({ computedHash, saltHex }).then(() => {
            mineStart();
          });
        }

        if (dataReal.type === 'rate') {
          const { hashRate } = dataReal.payload;
          setHashRate(hashRate);
        }
      });

      const prevHash = CurrentHash;
      const { minedCurrentHash, minedLastMinedAt, difficultyHash, minBlockTimes } = await getContractInfo(CurrentHash);

      const now_at = new Date().getTime();
      const lMinedAt = Number(minedLastMinedAt) * 1000;
      const minBTimes = Number(minBlockTimes) * 1000;

      let timeout: number;
      if (now_at < lMinedAt + minBTimes) {
        timeout = setTimeout(() => {
          CurrentHash = prevHash;
          mineStart();
        }, lMinedAt + minBTimes - now_at) as any;
        setMineTimeout(timeout);
        return;
      }

      workerRef.current?.postMessage(
        JSON.stringify({ type: 'start', payload: { address, currentHash: minedCurrentHash, difficultyHash } })
      );
    } catch (e) {
      console.log('mine failed', e);
      setGlobalMessage({ type: 'error', message: 'Mine Failed!' });
      mineStop();
    }
  }

  function mineStop() {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    clearTimeout(mineTimeout);
    setIsMining(false);
    setHashRate('0');
  }

  const sliderRef = useRef<any>(null);

  useEffect(() => {
    if (isMining) {
      handleStartClick();
    } else {
      handleStopClick();
    }
  }, [isMining]);

  const handleStopClick = () => {
    clearTimeout(sliderTimer);
    if (sliderRef.current) {
      sliderRef.current.style.transform = 'translateX(-90%)';
    }
  };

  const handleStartClick = () => {
    if (!sliderRef.current || !isMining) {
      return;
    }

    sliderRef.current.style.transform = 'translateX(-90%)';
    animateSlider();
  };

  const [sliderTimer, setSliderTimer] = useState<any>(null);

  const animateSlider = () => {
    let position = -90;
    const sliderElement = sliderRef.current;

    const slide = () => {
      if (!sliderElement || !isMining) {
        return;
      }

      if (position >= 0) {
        position = -90;
      }
      position += 1;
      sliderElement.style.transform = `translateX(${position}%)`;
      const timer = setTimeout(() => {
        slide();
      }, 300);

      setSliderTimer(timer);
    };

    slide();
  };

  function handleDeleteWallet(wa: IWallet) {
    deleteWallet(wa.address);
    setGlobalMessage({ type: 'success', message: 'Wallet Deleted Successfully' });
  }

  return (
    <section className="section-2" id="section2">
      <div className="div-block-9">
        <h1 className="heading">system</h1>

        {!wallets.length ? (
          <NewWalletDialog />
        ) : (
          <div className="div-block-10">
            <div className="div-block-15">
              <div>
                <div>
                  <div className="div-block-13">
                    <div className="text-block-6">Account</div>
                    <div className="div-block-12">
                      <NewWalletDialog />
                      <CopyBtn address={address} />
                    </div>
                  </div>
                </div>
                <div
                  className="div-block-14"
                  style={{
                    position: 'relative',
                  }}
                  onClick={() => handleToSelectWallet()}
                >
                  <div
                    className="text-block-8"
                    id="account"
                    style={{
                      width: '500px',
                    }}
                  >
                    {address}
                  </div>
                  <div className="text-block-44" id="accountMb">
                    {shortenAddress}
                  </div>
                  <img
                    src="images/down-one-2-1.svg"
                    style={{
                      transform: showWalletSelect ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    loading="lazy"
                    alt=""
                    className="image-10"
                  />
                  {showWalletSelect && (
                    <nav
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: 0,
                        right: 0,
                        padding: '12px 16px',
                        borderRadius: '16px',
                        backgroundColor: '#F5F5F5',
                        zIndex: 901,
                        border: '2px solid #D3D4D6',
                      }}
                    >
                      {wallets.map((wallet, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '16px 0px',
                            borderBottom: index !== wallets.length - 1 ? '1px solid #D3D4D6' : 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: wallet.address === currentWalletInfo?.address ? '#F79218' : '#111',
                            opacity: wallet.address === currentWalletInfo?.address ? '1' : '0.5',
                          }}
                        >
                          <div onClick={() => handleSelectWallet(wallet.address)} className="text-block-8">
                            {wallet.address}
                          </div>
                          <div onClick={() => handleSelectWallet(wallet.address)} className="text-block-44">
                            {shorterAddress(wallet.address)}
                          </div>
                          <div
                            onClick={() => handleDeleteWallet(wallet)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {wallet.address === currentWalletInfo?.address ? (
                              <img src="images/x.svg" loading="lazy" alt="" className="image-9" />
                            ) : (
                              <img src="images/x-gray.svg" loading="lazy" alt="" className="image-9" />
                            )}
                          </div>
                        </div>
                      ))}
                    </nav>
                  )}
                </div>
              </div>
              <div className="div-block-16">
                <div className="text-block-9">balance</div>
                <div className="div-block-161">
                  <div className="text-block-10">
                    <span className="text-block-101">{rewardBalance}</span>
                    <span className="text-block-102">MANY</span>
                  </div>
                  <div className="text-block-10">
                    <span className="text-block-101">{balance}</span>
                    <span className="text-block-102">{balanceSymbol}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-17">
              <div>
                <div className="text-block-6">network</div>
                <div data-hover="false" data-delay="0" className="dropdown w-dropdown" onClick={() => handleToSelectNet()}>
                  <div className="dropdown-toggle w-dropdown-toggle">
                    <div className="div-block-63">
                      <img width="32" height="32" alt="" src={currentChainInfo.logo} loading="lazy" className="image-11" id="chainLogo" />
                      <div className="text-block-46">{currentChainInfo.name}</div>
                    </div>
                    <img loading="lazy" src="images/down-one-2-1.svg" alt="" className="image-10" />
                  </div>
                  {showNetSelect && (
                    <nav
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: 0,
                        right: 0,
                        padding: '12px 16px',
                        borderRadius: '16px',
                        backgroundColor: '#F5F5F5',
                        zIndex: 901,
                        border: '2px solid #D3D4D6',
                      }}
                    >
                      {Chains.map((chain, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '16px 0px',
                            borderBottom: index !== Chains.length - 1 ? '1px solid #D3D4D6' : 'none',
                            color: chain.name === currentChainInfo.name ? '#F79218' : 'rgba(17, 17, 17, 0.5)',
                          }}
                          onClick={() => setCurrentChain(chain.name)}
                        >
                          <div className="div-block-61">
                            <img width="32" height="32" alt="" src={chain.logo} loading="lazy" className="image-11" />
                            <div className="text-block-8 mb">{chain.name}</div>
                          </div>
                        </div>
                      ))}
                    </nav>
                  )}
                </div>
              </div>
              <div
                className="div-block-18"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                {!showRpcInput ? (
                  <div
                    onMouseEnter={() => setRpcBlockHover(true)}
                    onMouseLeave={() => setRpcBlockHover(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="text-block-11"
                      style={{
                        color: rpcBlockHover ? '#111' : 'rgba(17, 17, 17, 0.5)',
                      }}
                    >
                      {currentRpc}
                    </div>
                    <img
                      onClick={() => showInputAction()}
                      src={rpcBlockHover ? 'images/setup-b.svg' : 'images/set-up.svg'}
                      style={{
                        cursor: 'pointer',
                      }}
                      loading="lazy"
                      alt=""
                      className="image-12"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <input
                      ref={rpcInputRef}
                      className="rpc-input"
                      style={{
                        height: '48px',
                        lineHeight: '72px',
                        fontSize: '22px',
                        paddingRight: '72px',
                        border: 'none',
                        borderBottom: '2px solid #111',
                        background: 'transparent',
                        outline: 'none',
                      }}
                      value={customRpcValue}
                      onChange={(e) => setCustomRpcValue(e.target.value)}
                      onKeyDown={(e) => handleInputKeyDown(e)}
                      onBlur={() => handleOnBlur()}
                    />
                    <img
                      onClick={() => handleSaveRpc()}
                      src="images/save.svg"
                      style={{
                        cursor: 'pointer',
                        marginBottom: '2px',
                      }}
                      loading="lazy"
                      alt=""
                      className="image-12"
                    />
                  </div>
                )}
                <FaucetIcon onSuccess={() => updateBalance()} />
              </div>
            </div>
            <div className="div-block-19">
              <div className="div-block-mining">
                <div className="text-block-9">
                  <strong>mining status</strong>
                </div>
                <div className="image-slider-container">
                  <div ref={sliderRef} className="image-slider" style={{ transform: `translateX(-90%)` }}>
                    <img src="images/path-1.svg" alt="" className="image-13" />
                  </div>
                </div>
              </div>
              <div className="div-block-20">
                <div className="text-block-9">
                  <strong>mining Guard</strong>
                </div>
                <div className="text-block-103">{currentNFTInfo?.id || 'N/A'}</div>
              </div>
            </div>
            {isMining ? (
              <div className="div-block-stop" onClick={() => mineStop()}>
                <img src="images/stop-block.svg" loading="lazy" alt="" className="image-20" />
                <div className="text-block-stop">stop</div>
              </div>
            ) : (
              <div className="div-block-22" onClick={() => mineStart()}>
                <img src="images/path.svg" loading="lazy" alt="" className="image-20" />
                <div className="text-block-12">start</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
