'use client';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { ChainMap, IChainInfo, TypeChain } from './lib/const';
import { providers, Wallet, Contract } from 'ethers';
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

  provider: providers.JsonRpcProvider;
  wallet: Wallet | null;
  readContract: Contract;
  contract: Contract;

  hashRate: string;
  setHashRate: (value: string) => void;
}

export const Web3Context = createContext<IWeb3Context>({} as any);

// 创建上下文提供者
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [currentChain, setCurrentChain] = useState<TypeChain>('Mantle');
  const currentChainInfo = ChainMap[currentChain];

  const { currentRpc, isCustomRpc, setCustomRpc } = useRpc(currentChain);
  const { setCurrentWallet, currentWalletInfo, wallets, addWallet, walletsMap } = useWallet();

  const [hashRate, setHashRate] = useState('');

  const provider = useMemo(() => {
    const provider = new providers.JsonRpcProvider(currentRpc);
    return provider;
  }, [currentRpc]);

  const wallet = useMemo(() => {
    if (!currentWalletInfo) return null;

    const wallet = new Wallet(currentWalletInfo.privateKey, provider);
    return wallet;
  }, [currentWalletInfo, provider]);

  const readContract = useMemo(() => {
    const contract = new Contract(currentChainInfo.contractAddress, ABI, provider!);

    return contract;
  }, [currentChainInfo, provider]);

  const contract = useMemo(() => {
    const contract = new Contract(currentChainInfo.contractAddress, ABI, wallet!);

    return contract;
  }, [currentChainInfo, wallet]);

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

          provider,
          wallet,
          readContract,
          contract,

          hashRate,
          setHashRate,
        } as IWeb3Context
      }
    >
      {children}
    </Web3Context.Provider>
  );
};
