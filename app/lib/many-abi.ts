export const ManyABI = [
  { type: 'function', name: 'claim', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_minBlockTimes', type: 'uint256', internalType: 'uint256' },
      { name: '_epochRewards', type: 'uint256', internalType: 'uint256' },
      { name: '_computingPowerFactor', type: 'uint256', internalType: 'uint256' },
      { name: '_difficultyHash', type: 'bytes32', internalType: 'bytes32' },
      { name: '_rewardToken', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'lastSerialId',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lifeCycle',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'marketPlace',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'merkleRoot',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mine',
    inputs: [
      { name: 'serialId', type: 'uint256', internalType: 'uint256' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'nftTokenAddress', type: 'address', internalType: 'address' },
      { name: 'minedHash', type: 'bytes32', internalType: 'bytes32' },
      { name: 'salt', type: 'bytes32', internalType: 'bytes32' },
      { name: '_merkleProof', type: 'bytes32[]', internalType: 'bytes32[]' },
      { name: 'signature', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'nftMiningInfoMap',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'nftMultiplier', type: 'uint256', internalType: 'uint256' },
      { name: 'nftToken', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'function', name: 'register', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'rescue',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'token', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'resetTreasury',
    inputs: [
      { name: '_epochRewards', type: 'uint256', internalType: 'uint256' },
      { name: '_computingPowerFactor', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rewardToken',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setComputingPowerFactor',
    inputs: [{ name: '_computingPowerFactor', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDifficultyHash',
    inputs: [{ name: '_difficultyHash', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMerkleRoot',
    inputs: [{ name: '_merkleRoot', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinBlockTimes',
    inputs: [{ name: '_minBlockTimes', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setNFTMiningInfo',
    inputs: [
      { name: '_serialId', type: 'uint256', internalType: 'uint256' },
      { name: '_nftToken', type: 'address', internalType: 'address' },
      { name: '_nftMultiplier', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPauseStatus',
    inputs: [{ name: 'pauseSatus', type: 'bool', internalType: 'bool' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setRewardToken',
    inputs: [{ name: '_rewardToken', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setValidator',
    inputs: [{ name: '_validator', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'treasuryInfo',
    inputs: [],
    outputs: [
      { name: 'minBlockTimes', type: 'uint256', internalType: 'uint256' },
      { name: 'difficultyHash', type: 'bytes32', internalType: 'bytes32' },
      { name: 'computingPowerFactor', type: 'uint256', internalType: 'uint256' },
      { name: 'epochRewards', type: 'uint256', internalType: 'uint256' },
      { name: 'epochTotalHashs', type: 'uint256', internalType: 'uint256' },
      { name: 'epochClaimedRewards', type: 'uint256', internalType: 'uint256' },
      { name: 'lastResetAt', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'userInfoMap',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      { name: 'currentHash', type: 'bytes32', internalType: 'bytes32' },
      { name: 'claimableRewards', type: 'uint256', internalType: 'uint256' },
      { name: 'totalHashes', type: 'uint256', internalType: 'uint256' },
      { name: 'totalRewards', type: 'uint256', internalType: 'uint256' },
      { name: 'registerAt', type: 'uint256', internalType: 'uint256' },
      { name: 'lastMinedAt', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'validator',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Claim',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'claimRewards', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialize',
    inputs: [
      { name: 'rewardToken', type: 'address', indexed: true, internalType: 'address' },
      { name: 'computingPowerFactor', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'epochRewards', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'minBlockTimes', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'difficultyHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Mine',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'currentHash', type: 'bytes32', indexed: true, internalType: 'bytes32' },
      { name: 'lastMinedAt', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'minedHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
      { name: 'salt', type: 'bytes32', indexed: false, internalType: 'bytes32' },
      { name: 'computingPowerFactor', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'claimableRewards', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'totalHashes', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'totalRewards', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [{ name: 'account', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Register',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'currentHash', type: 'bytes32', indexed: true, internalType: 'bytes32' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Rescue',
    inputs: [
      { name: 'to', type: 'address', indexed: false, internalType: 'address' },
      { name: 'token', type: 'address', indexed: false, internalType: 'address' },
      { name: 'amount', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ResetTreasury',
    inputs: [
      { name: 'epochRewards', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'computingPowerFactor', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetComputingPowerFactor',
    inputs: [{ name: 'computingPowerFactor', type: 'uint256', indexed: false, internalType: 'uint256' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetDifficultyHash',
    inputs: [{ name: 'difficultyHash', type: 'bytes32', indexed: false, internalType: 'bytes32' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetImplementation',
    inputs: [{ name: 'newImplementation', type: 'address', indexed: true, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetMinBlockTimes',
    inputs: [{ name: 'minBlockTimes', type: 'uint256', indexed: false, internalType: 'uint256' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetNFTMiningInfo',
    inputs: [
      { name: 'nftToken', type: 'address', indexed: false, internalType: 'address' },
      { name: 'nftMultiplier', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'serialId', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetPauseStatus',
    inputs: [{ name: 'status', type: 'bool', indexed: false, internalType: 'bool' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetRewardToken',
    inputs: [{ name: 'rewardToken', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [{ name: 'account', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  { type: 'error', name: 'AlreadyMined', inputs: [] },
  { type: 'error', name: 'AlreadyRegister', inputs: [{ name: '', type: 'address', internalType: 'address' }] },
  { type: 'error', name: 'BlockingAccount', inputs: [{ name: '', type: 'address', internalType: 'address' }] },
  { type: 'error', name: 'ECDSAInvalidSignature', inputs: [] },
  {
    type: 'error',
    name: 'ECDSAInvalidSignatureLength',
    inputs: [{ name: 'length', type: 'uint256', internalType: 'uint256' }],
  },
  { type: 'error', name: 'ECDSAInvalidSignatureS', inputs: [{ name: 's', type: 'bytes32', internalType: 'bytes32' }] },
  { type: 'error', name: 'EnforcedPause', inputs: [] },
  { type: 'error', name: 'EpochComputingPowerFactorExceeded', inputs: [] },
  { type: 'error', name: 'ExpectedPause', inputs: [] },
  { type: 'error', name: 'InvaildMerkleProof', inputs: [] },
  { type: 'error', name: 'InvaildSalt', inputs: [] },
  {
    type: 'error',
    name: 'InvaildSigner',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
    ],
  },
  {
    type: 'error',
    name: 'InvalidMinedHash',
    inputs: [
      { name: 'minedHash', type: 'bytes32', internalType: 'bytes32' },
      { name: 'difficultyHash', type: 'bytes32', internalType: 'bytes32' },
    ],
  },
  { type: 'error', name: 'MineNFTNotInit', inputs: [{ name: 'serialId', type: 'uint256', internalType: 'uint256' }] },
  { type: 'error', name: 'NotEnoughTimePassed', inputs: [] },
  { type: 'error', name: 'NothingToClaim', inputs: [] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'TransferFailed', inputs: [] },
];
