export interface IChainInfo {
  id: number;
  name: 'Mantle' | 'Eth';
  logo: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: {
    http: string;
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
      apiUrl: string;
    };
  };
  testnet: boolean;
  address: {
    many: string;
    manyDeployBlock: number;
    marketPlace: string;
    MineNFTIds: Array<number>;
  };
}

export type ChainName = IChainInfo['name'];

// Eth Testnet
const EthChain: IChainInfo = {
  id: 1337,
  name: 'Eth',
  logo: 'images/eth.svg',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    http: 'https://devnet-rpc.aggregation.top/',
  },
  blockExplorers: {
    default: {
      name: 'Testnet Explorer',
      url: 'https://devnet-explorer.aggregation.top/',
      apiUrl: 'https://devnet-explorer.aggregation.top/api',
    },
  },
  testnet: true,
  address: {
    many: '0x880F0d29dd9b3D6AD720E413dAcFB3E1A0703e27',
    manyDeployBlock: 20706,
    marketPlace: '0x4C05f6EFBA9fc9371f95b32Fea56e67E0E4Bd6CE',
    MineNFTIds: [1, 2, 3],
  },
};

// Mantle Sepolia
const MantleChain: IChainInfo = {
  id: 5003,
  name: 'Mantle',
  logo: 'images/mantle-sepolia.svg',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    http: 'https://rpc.sepolia.mantle.xyz',
  },
  blockExplorers: {
    default: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.sepolia.mantle.xyz/',
      apiUrl: 'https://explorer.sepolia.mantle.xyz/api',
    },
  },
  testnet: true,
  address: {
    many: '0x59e9632078187D336d8EA0F529720A88f398Ca3c',
    manyDeployBlock: 10041935,
    marketPlace: '0x8a9AB1363BA18042CC1972af5eA2149A4a70a688',
    MineNFTIds: [1, 2, 3],
  },
};

export const Chains = [MantleChain, EthChain];

export const ChainMap: Record<string, IChainInfo> = Chains.reduce((acc, chain) => {
  acc[chain.name] = chain;
  return acc;
}, {} as any);
