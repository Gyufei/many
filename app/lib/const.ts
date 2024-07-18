export interface IChainInfo {
  id: number;
  name: 'Mantle' | 'Eth';
  logo: string;
  contractAddress: string;
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
}

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
  contractAddress: '0x529537BB5EE0A499F2A2A905E1d733d882532A4E',
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
  contractAddress: '0xCc6C4EB28d9fFFDbD18d94BFd385F53c1Df60CB5',
};

export const Chains = [MantleChain, EthChain];

export const ChainMap: Record<string, IChainInfo> = Chains.reduce((acc, chain) => {
  acc[chain.name] = chain;
  return acc;
}, {} as any);

export const ChainIdMap: Record<number, IChainInfo> = Chains.reduce((acc, chain) => {
  acc[chain.id] = chain;
  return acc;
}, {} as any);

export type TypeChain = IChainInfo['name'];
