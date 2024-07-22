export const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'EnforcedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExpectedPause',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimRewards',
        type: 'uint256',
      },
    ],
    name: 'Claim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'rewardToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rewardRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minBlockTimes',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'difficultyHash',
        type: 'bytes32',
      },
    ],
    name: 'Initialize',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'currentHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lastMinedAt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'minedHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimableRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalHashes',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
    ],
    name: 'Mine',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'currentHash',
        type: 'bytes32',
      },
    ],
    name: 'Register',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardRate',
        type: 'uint256',
      },
    ],
    name: 'ResetTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'difficultyHash',
        type: 'bytes32',
      },
    ],
    name: 'SetDifficultyHash',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'SetImplementation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minBlockTimes',
        type: 'uint256',
      },
    ],
    name: 'SetMinBlockTimes',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'nftToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nftMultiplier',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum MinerStorage.NFTMiningLevel',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'SetNFTMiningInfo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'SetPauseStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardRate',
        type: 'uint256',
      },
    ],
    name: 'SetRewardRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'rewardToken',
        type: 'address',
      },
    ],
    name: 'SetRewardToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'NFT_MULTIPLIER_DECALER',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'duration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minBlockTimes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_epochRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rewardRate',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_difficultyHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_rewardToken',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'minedHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'signature',
        type: 'bytes32',
      },
    ],
    name: 'mine',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum MinerStorage.NFTMiningLevel',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'nftMiningInfoMap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nftMultiplier',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftToken',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_epochRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rewardRate',
        type: 'uint256',
      },
    ],
    name: 'resetTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_difficultyHash',
        type: 'bytes32',
      },
    ],
    name: 'setDifficultyHash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minBlockTimes',
        type: 'uint256',
      },
    ],
    name: 'setMinBlockTimes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum MinerStorage.NFTMiningLevel',
        name: '_level',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: '_nftToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_nftMultiplier',
        type: 'uint256',
      },
    ],
    name: 'setNFTMiningInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'pauseSatus',
        type: 'bool',
      },
    ],
    name: 'setPauseStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_rewardRate',
        type: 'uint256',
      },
    ],
    name: 'setRewardRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rewardToken',
        type: 'address',
      },
    ],
    name: 'setRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasuryInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minBlockTimes',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'difficultyHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'rewardRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochTotalHashs',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochClaimedRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastResetAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfoMap',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'currentHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'claimableRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalHashes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'registerAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastMinedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
