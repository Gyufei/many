import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../web3-context';
import { formatEther } from 'ethers';

export function useBalanceDisplay() {
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

  const [balance, setBalance] = useState(0);
  const currency = currentChainInfo?.nativeCurrency || '';

  async function getBalance(acc: string) {
    if (!address) return;

    const provider = getProvider();
    const wallet = getWallet();
    const balanceData = await provider.getBalance(acc);
    const balance = formatEther(balanceData);
    setBalance(Number(balance));
  }

  useEffect(() => {
    setBalance(0);
  }, [currentChainInfo, address]);

  useEffect(() => {
    getBalance(address);
  }, [address, getProvider, getWallet]);

  return {
    balance,
    balanceSymbol: currency.symbol,
  };
}
