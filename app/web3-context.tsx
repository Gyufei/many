'use client';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { ChainMap, IChainInfo, TypeChain } from './lib/const';
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import { useRpc } from './hook/use-rpc';
import { IWallet, useWallet } from './hook/use-wallet';
import { ABI } from './lib/abi';

interface IWeb3Context {
  currentChain: TypeChain | null;
  setCurrentChain: (chain: TypeChain) => void;
  currentChainInfo: IChainInfo;

  currentRpc: string;
  setCustomRpc: (rpc: string) => void;
  isCustomRpc: boolean;

  setCurrentWallet: (wallet: string) => void;
  currentWalletInfo: IWallet;
  wallets: IWallet[];
  addWallet: (wallet: IWallet) => void;

  getProvider: () => JsonRpcProvider;
  getWallet: () => Wallet | null;
  getContract: () => Contract;
}

export const Web3Context = createContext<IWeb3Context>({} as any);

// 创建上下文提供者
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [currentChain, setCurrentChain] = useState<TypeChain>('Mantle');
  const currentChainInfo = ChainMap[currentChain];

  const { currentRpc, isCustomRpc, setCustomRpc } = useRpc(currentChain);
  const { setCurrentWallet, currentWalletInfo, wallets, addWallet, walletsMap } = useWallet();

  const getProvider = useCallback(() => {
    const provider = new JsonRpcProvider(currentRpc);
    return provider;
  }, [currentRpc]);

  const getWallet = useCallback(() => {
    if (!currentWalletInfo) return null;

    const provider = getProvider();
    const wallet = new Wallet(currentWalletInfo.privateKey, provider);
    return wallet;
  }, [currentWalletInfo, getProvider]);

  const getContract = useCallback(() => {
    const wallet = getWallet();
    const contract = new Contract(currentChainInfo.contractAddress, ABI, wallet);

    return contract;
  }, [currentChainInfo, getWallet]);

  return (
    // 使用上下文提供者包装子组件
    <Web3Context.Provider
      value={
        {
          currentChain,
          setCurrentChain,
          currentChainInfo,
          currentRpc,
          setCustomRpc,
          isCustomRpc,

          setCurrentWallet,
          currentWalletInfo,
          wallets,
          addWallet,
          walletsMap,

          getProvider,
          getWallet,
          getContract,
        } as IWeb3Context
      }
    >
      {children}
    </Web3Context.Provider>
  );
};
