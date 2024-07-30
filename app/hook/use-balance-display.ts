import { useCallback, useContext, useEffect, useState } from 'react';
import { Web3Context } from '../web3-context';
import { Contract, utils } from 'ethers';

export function useBalanceDisplay() {
  const { currentChainInfo, currentWalletInfo, provider, wallet } = useContext(Web3Context);

  const address = currentWalletInfo?.address || '';

  const [balance, setBalance] = useState(0);
  const currency = currentChainInfo?.nativeCurrency || '';

  const [rewardBalance, setRewardBalance] = useState(0);

  async function getRewardBalance(addr: string) {
    if (!address) return;

    const rewardAddress = currentChainInfo?.address.rewardToken;
    const tokenAbi = [
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      'function balanceOf(address account) view returns (uint256)',
    ];
    const rewardContract = new Contract(rewardAddress, tokenAbi, wallet!);
    const balanceData = await rewardContract.balanceOf(addr);
    const decimals = await rewardContract.decimals();
    const balance = utils.formatUnits(balanceData, decimals);
    setRewardBalance(Number(balance));
  }

  async function getBalance(acc: string) {
    if (!acc) return;

    const balanceData = await provider.getBalance(acc);
    const balance = utils.formatEther(balanceData);
    setBalance(Number(balance));
  }

  useEffect(() => {
    setBalance(0);
    setRewardBalance(0);
  }, [currentChainInfo, address]);

  useEffect(() => {
    getBalance(address);
    getRewardBalance(address);
  }, [address, provider, wallet]);

  const updateBalance = useCallback(() => {
    getBalance(address);
    getRewardBalance(address);
  }, [address, provider, wallet]);

  return {
    balance,
    balanceSymbol: currency.symbol,
    rewardBalance,
    updateBalance,
  };
}
