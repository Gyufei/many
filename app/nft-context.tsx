'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChainMap, ChainName } from './lib/const';
import { Web3Context } from './web3-context';
import { Contract } from 'ethers';
import { MarketPlaceABI } from './lib/market-place-abi';

interface INFTContext {
  currentNFTInfo: Record<string, any> | null;
  mineNFTIds: number[];
  marketPlaceContract: Contract;
  queryNFTNums: () => void;
}

export const NFTContext = createContext<INFTContext>({} as any);

export const NFTProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentChainInfo, currentWalletInfo, contract, wallet, provider } = useContext(Web3Context);
  const mineNFTIds = currentChainInfo?.address.MineNFTIds;

  const [NFTInfos, setNFTInfos] = useState(
    mineNFTIds.reduce((acc, nftId) => {
      acc[nftId] = null;
      return acc;
    }, {} as any)
  );

  const currentNFTInfo = useMemo(() => {
    for (const nftId of mineNFTIds) {
      if (NFTInfos[nftId] && NFTInfos[nftId].balance > 0) {
        return NFTInfos[nftId];
      }
    }

    return null;
  }, [NFTInfos, mineNFTIds]);

  useEffect(() => {
    if (!mineNFTIds.length || !contract || !wallet || !provider || !currentWalletInfo) {
      return;
    }

    queryNFTNums();
  }, [mineNFTIds, contract, wallet, provider, currentWalletInfo]);

  const queryNFTNum = useCallback(
    async (NFTId: number) => {
      try {
        const nftMiningInfo = await contract.nftMiningInfoMap(NFTId);
        const nftAddress = nftMiningInfo.nftToken;
        const NFTAbi = [
          {
            type: 'function',
            name: 'balanceOf',
            inputs: [
              {
                name: 'owner',
                type: 'address',
                internalType: 'address',
              },
            ],
            outputs: [
              {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
            stateMutability: 'view',
          },
        ];

        const NFTContract = new Contract(nftAddress, NFTAbi, wallet!);
        const currentAddress = currentWalletInfo?.address;
        const balance = await NFTContract.balanceOf(currentAddress);
        return {
          id: NFTId,
          address: nftAddress,
          balance: Number(balance.toString()),
        };
      } catch (e) {
        console.error('query nft num error', e);
        return {
          id: NFTId,
          address: null,
          balance: 0,
        };
      }
    },
    [contract, wallet]
  );

  const queryNFTNums = useCallback(async () => {
    const nftInfos = mineNFTIds?.map((nftId) => {
      const res = queryNFTNum(nftId);
      return res;
    });

    try {
      const res = await Promise.all(nftInfos);

      for (const item of res) {
        setNFTInfos((prev: any) => ({ ...prev, [item.id]: item }));
      }
    } catch (e) {
      console.log('query all nft num error', e);
    }
  }, [mineNFTIds, contract, wallet, queryNFTNum]);

  const marketPlaceContract = useMemo(() => {
    const mkContract = new Contract(currentChainInfo.address.marketPlace, MarketPlaceABI, wallet!);

    return mkContract;
  }, [currentChainInfo, wallet]);

  return (
    <NFTContext.Provider
      value={{
        currentNFTInfo,
        mineNFTIds,
        marketPlaceContract,
        queryNFTNums,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
