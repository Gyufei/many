'use client';

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Web3Context } from './web3-context';
import { formatEther, JsonRpcProvider, keccak256 } from 'ethers';
import { Chains, TypeChain } from './lib/const';
import BigNumber from 'bignumber.js';
import { useRpcInput } from './hook/use-rpc-input';
import { useBalanceDisplay } from './hook/use-balance-display';

export default function Section2() {
  const {
    currentChainInfo,
    wallets,
    currentWalletInfo,
    addWallet,
    setCurrentWallet,
    setCurrentChain,
    getProvider,
    getWallet,
    getContract,
  } = useContext(Web3Context);

  const address = currentWalletInfo?.address || '';
  const currency = currentChainInfo?.nativeCurrency || '';

  const { currentRpc, showRpcInput, setShowRpcInput, customRpcValue, setCustomRpcValue, handleInputKeyDown, handleOnBlur, handleSaveRpc } =
    useRpcInput(currentChainInfo?.id);

  const { balance, balanceSymbol } = useBalanceDisplay();

  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [showNetSelect, setShowNetSelect] = useState(false);

  const [mineTimeout, setMineTimeout] = useState<number>();
  const [isMining, setIsMining] = useState(false);

  const workerRef = useRef<Worker>();

  useEffect(() => {
    addWallet({
      address: '0xb347921E0524d05362D77CbBc247fc9E2Ad5dc95',
      privateKey: 'a37e30c516210751449d62e6a8a5c17ce6025bbdc5851192013f30e90ea8d8c8',
    });
    setCurrentWallet('0xb347921E0524d05362D77CbBc247fc9E2Ad5dc95');
  }, []);

  const shortenAddress = useMemo(() => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  function handleSelectWallet(address: string) {
    setCurrentWallet(address);
    setShowWalletSelect(false);
  }

  function handleSelectNet(chain: TypeChain) {
    setCurrentChain(chain);
    setShowNetSelect(false);
  }

  async function getNonce() {
    const provider = getProvider();
    const nonce = await provider.getTransactionCount(currentWalletInfo.address);
    return nonce;
  }

  async function register() {
    const contractObj = getContract();

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

  useEffect(() => {
    const worker = new Worker('/js/work.js');
    workerRef.current = worker;

    worker.addEventListener('message', (event) => {
      const { data } = event;
      console.log(data, 'receive form worker');
      const dataReal = JSON.parse(data);

      if (dataReal.type === 'hash') {
        const { computed_hash, saltHex } = data.payload;
        mineAction({ computed_hash, saltHex });
      }

      if (dataReal.type === 'salt') {
      }
    });

    // 在组件卸载时终止Web Worker
    return () => {
      worker.terminate();
    };
  }, []);

  async function getContractInfo() {
    const contractObj = getContract();

    const user_info = await contractObj.userInfoMap(address);
    const currentHash = user_info.currentHash;
    const lastMinedAt = user_info.lastMinedAt;

    if (currentHash == '0x0000000000000000000000000000000000000000000000000000000000000000') {
      await register();
    }

    const treasuryInfo = await contractObj.treasuryInfo();
    const difficultyHash = treasuryInfo.difficultyHash;
    const minBlockTimes = treasuryInfo.minBlockTimes.toString();

    return {
      currentHash,
      lastMinedAt,
      difficultyHash,
      minBlockTimes,
    };
  }

  async function mineAction(mined: { computed_hash: string; saltHex: string }) {
    const contractObj = getContract();
    const gasLimit = await (contractObj.estimateGas as any)['mine'](mined.computed_hash, mined.saltHex);

    await contractObj.mine(mined.computed_hash, mined.saltHex, {
      gasLimit: gasLimit.toString(),
    });
  }

  async function mineStart() {
    try {
      setIsMining(true);
      const { currentHash, lastMinedAt, difficultyHash, minBlockTimes } = await getContractInfo();

      const now_at = new Date().getTime();
      const lMinedAt = Number(lastMinedAt) * 1000;
      const minBTimes = Number(minBlockTimes) * 1000;

      let timeout: number;
      if (now_at < lMinedAt + minBTimes) {
        timeout = setTimeout(() => {
          mineStart();
        }, lMinedAt + minBTimes - now_at) as any;
      } else {
        timeout = setTimeout(() => {
          mineStart();
        }, minBTimes) as any;
      }
      setMineTimeout(timeout);
      console.log('mine timeout:', timeout);

      workerRef.current?.postMessage(JSON.stringify({ type: 'start', payload: { address, currentHash, difficultyHash } }));
      // console.log(mined);
      // await mineAction(mined);
    } catch (e) {
      console.log(e);
      console.log('mine failed');
    }
  }

  function mineStop() {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    clearTimeout(mineTimeout);
    setIsMining(false);
  }

  return (
    <section className="section-2">
      <div className="div-block-9">
        <h1 className="heading">system</h1>
        <div className="div-block-10">
          <div className="div-block-15">
            <div>
              <div>
                <div className="div-block-13">
                  <div className="text-block-6">Account</div>
                  <div className="div-block-12">
                    <div className="div-block-11">
                      <div className="text-block-7">New</div>
                      <img src="images/添加.svg" loading="lazy" alt="" className="image-8" />
                    </div>
                    <div className="div-block-11">
                      <div className="text-block-7">COPY</div>
                      <img src="images/copy.svg" loading="lazy" alt="" className="image-9" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="div-block-14"
                style={{
                  position: 'relative',
                }}
                onClick={() => setShowWalletSelect(!showWalletSelect)}
              >
                <div className="text-block-8" id="account">
                  {address}
                </div>
                <div className="text-block-44" id="accountMb">
                  {shortenAddress}
                </div>
                <img
                  src="images/下1_down-one-2-1.svg"
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
                      top: 'calc(100% + 1px)',
                      left: 0,
                      padding: '4px',
                      borderRadius: '4px',
                      right: 0,
                      backgroundColor: '#e6e6e6',
                      zIndex: 10,
                    }}
                  >
                    {wallets.map((wallet, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        style={{
                          padding: '12px 10px',
                          borderRadius: '4px',
                        }}
                        onClick={() => handleSelectWallet(wallet.address)}
                      >
                        <div className="text-block-8" id="account">
                          {wallet.address}
                        </div>
                        <div className="text-block-44" id="accountMb">
                          {shortenAddress}
                        </div>
                      </div>
                    ))}
                  </nav>
                )}
              </div>
            </div>
            <div className="div-block-16">
              <div className="text-block-9">balance</div>
              <div className="text-block-10" id="balance">
                {balance} {balanceSymbol}
              </div>
            </div>
          </div>
          <div className="div-block-17">
            <div>
              <div className="text-block-6">network</div>
              <div data-hover="false" data-delay="0" className="dropdown w-dropdown" onClick={() => setShowNetSelect(!showNetSelect)}>
                <div className="dropdown-toggle w-dropdown-toggle">
                  <div className="div-block-63">
                    <img width="32" height="32" alt="" src={currentChainInfo.logo} loading="lazy" className="image-11" id="chainLogo" />
                    <div className="text-block-46" id="chainName">
                      {currentChainInfo.name}
                    </div>
                  </div>
                  <img loading="lazy" src="images/下1_down-one-2-1.svg" alt="" className="image-10" />
                </div>
                {showNetSelect && (
                  <nav
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 1px)',
                      left: 0,
                      padding: '4px',
                      borderRadius: '4px',
                      right: 0,
                      backgroundColor: '#e6e6e6',
                      zIndex: 10,
                    }}
                  >
                    {Chains.map((chain, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        style={{
                          padding: '12px 10px',
                          borderRadius: '4px',
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
                <>
                  <div className="text-block-11">{currentRpc}</div>
                  <img
                    onClick={() => setShowRpcInput(true)}
                    src="images/set-up.svg"
                    style={{
                      cursor: 'pointer',
                    }}
                    loading="lazy"
                    alt=""
                    className="image-12"
                  />
                </>
              ) : (
                <>
                  <input
                    className="rpc-input"
                    style={{
                      height: '48px',
                      lineHeight: '72px',
                      fontSize: '22px',
                      paddingRight: '36px',
                      border: 'none',
                      borderBottom: '2px solid #d3d4d6',
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
                      position: 'absolute',
                      cursor: 'pointer',
                      right: '0px',
                      bottom: '12px',
                    }}
                    loading="lazy"
                    alt=""
                    className="image-12"
                  />
                </>
              )}
            </div>
          </div>
          <div className="div-block-19">
            <div>
              <div className="text-block-9">
                <strong>mining status</strong>
              </div>
              <img src="images/路径-1.svg" loading="lazy" alt="" className="image-13" />
            </div>
            <div className="div-block-20">
              <div className="text-block-9">
                <strong>mining Guard</strong>
              </div>
              <div className="text-block-10">
                <strong>N/A</strong>
              </div>
            </div>
          </div>
          {isMining ? (
            <div className="div-block-stop" onClick={() => mineStop()}>
              <img src="images/stop-block.svg" loading="lazy" alt="" className="image-20" />
              <div className="text-block-stop">stop</div>
            </div>
          ) : (
            <div className="div-block-22" onClick={() => mineStart()}>
              <img src="images/路径.svg" loading="lazy" alt="" className="image-20" />
              <div className="text-block-12">start</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
