import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../web3-context';
import { utils } from 'ethers';

export function useBalanceDisplay() {
  const { currentChainInfo, currentWalletInfo, provider, wallet } = useContext(Web3Context);

  const address = currentWalletInfo?.address || '';

  const [balance, setBalance] = useState(0);
  const currency = currentChainInfo?.nativeCurrency || '';

  async function getBalance(acc: string) {
    if (!address) return;

    const balanceData = await provider.getBalance(acc);
    const balance = utils.formatEther(balanceData);
    setBalance(Number(balance));
  }

  useEffect(() => {
    setBalance(0);
  }, [currentChainInfo, address]);

  useEffect(() => {
    getBalance(address);
  }, [address, provider, wallet]);

  return {
    balance,
    balanceSymbol: currency.symbol,
  };
}
