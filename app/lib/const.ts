export interface IChainInfo {
  id: number;
  name: 'Mantle' | 'testEth';
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
    };
  };
  testnet: boolean;
  address: {
    many: string;
    manyDeployBlock: number;
    marketPlace: string;
    MineNFTIds: Array<number>;
    rewardToken: string;
  };
}

export type ChainName = IChainInfo['name'];

// Eth Testnet
const EthChain: IChainInfo = {
  id: 1337,
  name: 'testEth',
  logo: 'images/eth.svg',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    http: 'https://test-rpc.many.gold/ ',
  },
  blockExplorers: {
    default: {
      name: 'Testnet Explorer',
      url: 'https://test-scan.many.gold/',
    },
  },
  testnet: true,
  address: {
    many: '0x880F0d29dd9b3D6AD720E413dAcFB3E1A0703e27',
    manyDeployBlock: 20706,
    marketPlace: '0x4C05f6EFBA9fc9371f95b32Fea56e67E0E4Bd6CE',
    MineNFTIds: [1, 2, 3],
    rewardToken: '0x427375043641C1333bD444484AbC1174b08C8Cec',
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
    },
  },
  testnet: true,
  address: {
    many: '0x59e9632078187D336d8EA0F529720A88f398Ca3c',
    manyDeployBlock: 10041935,
    marketPlace: '0x8a9AB1363BA18042CC1972af5eA2149A4a70a688',
    MineNFTIds: [1, 2, 3],
    rewardToken: '0x1a700ad6fE47DDBeDC788E7FfD31415645274EEf',
  },
};

export const Chains = [EthChain];

export const ChainMap: Record<string, IChainInfo> = Chains.reduce((acc, chain) => {
  acc[chain.name] = chain;
  return acc;
}, {} as any);

export const chainNameMap: Record<ChainName, string> = {
  Mantle: 'mantle_sepolia',
  testEth: 'devnet',
};
