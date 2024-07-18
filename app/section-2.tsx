'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';
import { formatEther, JsonRpcProvider } from 'ethers';
import { Chains, TypeChain } from './lib/const';

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
    currentRpc,
    isCustomRpc,
    setCustomRpc,
  } = useContext(Web3Context);
  const address = currentWalletInfo?.address || '';
  const currency = currentChainInfo?.nativeCurrency || '';

  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [showNetSelect, setShowNetSelect] = useState(false);

  const [showRpcInput, setShowRpcInput] = useState(false);
  const [customRpcValue, setCustomRpcValue] = useState(isCustomRpc ? currentRpc : '');

  const [balance, setBalance] = useState(0);

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

  async function getBalance(acc: string) {
    const provider = getProvider();
    const wallet = getWallet();
    const balanceData = await provider.getBalance(acc);
    const balance = formatEther(balanceData);
    setBalance(Number(balance));
  }

  useEffect(() => {
    getBalance(address);
  }, [address]);

  function handleInputKeyDown(event: any) {
    if (event.key === 'Enter') {
      handleSaveRpc();
    }
  }

  function handleOnBlur() {
    if (!customRpcValue) setShowRpcInput(false);
  }

  async function handleSaveRpc() {
    if (!customRpcValue) return null;
    const rpcTestResult = await testRpc();
    if (rpcTestResult) {
      setCustomRpc(customRpcValue);
      setShowRpcInput(false);
    }
  }

  async function testRpc() {
    try {
      const provider = new JsonRpcProvider(customRpcValue);
      const net = await provider.getNetwork();
      const chainId = Number(net.chainId);

      return chainId === currentChainInfo.id;
    } catch (e) {
      return false;
    }
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
                {balance} {currency.symbol}
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
          <div className="div-block-22">
            <img src="images/路径.svg" loading="lazy" alt="" className="image-20" />
            <div className="text-block-12">start</div>
          </div>
        </div>
      </div>
    </section>
  );
}
