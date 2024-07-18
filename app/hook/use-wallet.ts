import { useCallback, useMemo, useState } from 'react';

export interface IWallet {
  address: string;
  privateKey: string;
}

export function useWallet() {
  const [currentWallet, setCurrentWallet] = useState<string>();
  const [wallets, setWallets] = useState<IWallet[]>([]);

  const walletsMap = useMemo(() => {
    return wallets.reduce((map: Record<string, IWallet>, wallet: IWallet) => {
      map[wallet.address] = wallet;
      return map;
    }, {} as Record<string, IWallet>);
  }, [wallets]);

  const currentWalletInfo = useMemo(() => {
    return currentWallet ? walletsMap[currentWallet] : undefined;
  }, [currentWallet, wallets]);

  const addWallet = useCallback(
    (wallet: IWallet) => {
      setWallets([...wallets, wallet]);
    },
    [wallets]
  );

  return {
    setCurrentWallet,
    currentWalletInfo,
    wallets,
    addWallet,
    walletsMap,
  };
}
