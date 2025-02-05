import { useCallback, useEffect, useMemo, useState } from 'react';

export interface IWallet {
  address: string;
  privateKey: string;
}

const WalletsStorageKey = 'UserWallets';
const CurrentWalletStorageKey = 'CurrentWallet';

export function useWallet() {
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<string>();

  useEffect(() => {
    // 在组件挂载时，从 localStorage 恢复值
    const walletsStorageValue = localStorage.getItem(WalletsStorageKey);
    if (walletsStorageValue) {
      const was = JSON.parse(walletsStorageValue);
      setWallets(was);
    }

    const currWalletStorageValue = localStorage.getItem(CurrentWalletStorageKey);
    if (currWalletStorageValue) {
      const wa = JSON.parse(currWalletStorageValue);
      setCurrentWallet(wa);
    }
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      const serializedValue = JSON.stringify(wallets);
      localStorage.setItem(WalletsStorageKey, serializedValue);
    }

    if (currentWallet) {
      const serializedValue = JSON.stringify(currentWallet);
      localStorage.setItem(CurrentWalletStorageKey, serializedValue);
    }
  }, [wallets]);

  useEffect(() => {
    if (currentWallet) {
      const serializedValue = JSON.stringify(currentWallet);
      localStorage.setItem(CurrentWalletStorageKey, serializedValue);
    }
  }, [currentWallet]);

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
      setWallets([wallet, ...wallets]);
      if (!currentWallet) {
        setCurrentWallet(wallet.address);
      }
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
