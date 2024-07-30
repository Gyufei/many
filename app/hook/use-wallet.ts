import { useCallback, useEffect, useMemo, useState } from 'react';

export interface IWallet {
  address: string;
  privateKey: string;
}

const WalletsStorageKey = 'UserWallets';
const CurrentWalletStorageKey = 'CurrentWallet';

export function useWallet() {
  const [wallets, setWallets] = useState<IWallet[]>([
    // {
    //   address: '0xb347921E0524d05362D77CbBc247fc9E2Ad5dc95',
    //   privateKey: 'a37e30c516210751449d62e6a8a5c17ce6025bbdc5851192013f30e90ea8d8c8',
    // },
  ]);
  const [currentWallet, setCurrentWallet] = useState<string>();

  const [init, setInit] = useState(false);

  useEffect(() => {
    const walletsStorageValue = localStorage.getItem(WalletsStorageKey);
    if (walletsStorageValue) {
      const was = JSON.parse(walletsStorageValue);
      setWallets(was);

      const currWalletStorageValue = localStorage.getItem(CurrentWalletStorageKey);
      if (currWalletStorageValue) {
        const wa = JSON.parse(currWalletStorageValue);
        if (was.some((w: IWallet) => w.address === wa)) {
          setCurrentWallet(wa);
        }
      } else {
        setCurrentWallet(was[0]?.address);
      }
    }

    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      const serializedValue = JSON.stringify(wallets);
      localStorage.setItem(WalletsStorageKey, serializedValue);
    }
  }, [wallets]);

  useEffect(() => {
    if (init) {
      const serializedValue = JSON.stringify(currentWallet || '');
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

  const deleteWallet = useCallback(
    (walletAddr: string) => {
      setWallets(() => {
        const newW = wallets.filter((w) => w.address !== walletAddr);

        if (currentWallet === walletAddr) {
          setCurrentWallet(newW[0]?.address);
        }

        return newW;
      });
    },
    [wallets]
  );

  return {
    setCurrentWallet,
    currentWalletInfo,
    wallets,
    addWallet,
    deleteWallet,
    walletsMap,
  };
}
