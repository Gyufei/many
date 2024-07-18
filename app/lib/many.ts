const ChainMap = {
  MANTLE: {
    name: 'MANTLE',
    rpcUrl: 'https://rpc.sepolia.mantle.xyz/',
    logo: 'images/圆形-4.svg',
    symbol: 'MNT',
  },
  ETH: {
    name: 'ETH',
    rpcUrl: 'https://dev-evm.aggregation.top/',
    logo: 'images/eth.svg',
    symbol: 'ETH',
  },
};

let currentChain = 'MANTLE';

async function getNonce() {
  const provider = getProvider();
  const nonce = await provider.getTransactionCount(accountAddress);
  return nonce;
}

async function register() {
  const contractObj = getContract();

  const nonce = await getNonce();
  console.log('nonce:', nonce);

  if (Number(nonce) !== 0) {
    throw new Error('nonce error');
  }

  try {
    const gasLimit = await contractObj.estimateGas['register']();
    await contractObj.register({
      gasLimit: gasLimit.toString(),
    });
  } catch (e) {
    console.error(e);
    console.log('register failed');
    throw new Error('register failed');
  }
  console.log('register complete');
}

async function getMinedHash() {
  const contractObj = getContract();

  const user_info = await contractObj.userInfoMap(accountAddress);
  const current_hash = user_info.currentHash;
  const lastMinedAt = user_info.lastMinedAt;

  if (current_hash == '0x0000000000000000000000000000000000000000000000000000000000000000') {
    await register();
  }

  const treasuryInfo = await contractObj.treasuryInfo();
  const difficultyHash = treasuryInfo.difficultyHash;
  const minBlockTimes = treasuryInfo.minBlockTimes.toString();

  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  const randomHex = Array.from(randomBytes)
    .map((byte) => ('0' + byte.toString(16)).slice(-2))
    .join('');

  let salt = new BigNumber('0x' + randomHex);
  const account_address_prefix = accountAddress.toLowerCase().replace(/^0x/, '').padStart(40, '0');
  const hash_prefix = current_hash + account_address_prefix;

  let computed_hash;
  while (true) {
    const packed = hash_prefix + salt.toString(16).padStart(64, '0');
    computed_hash = ethers.utils.keccak256(packed);
    if (computed_hash < difficultyHash) {
      break;
    }
    salt = salt.plus(1);
  }

  const saltHex = '0x' + salt.toString(16).padStart(64, '0');
  const now_at = new Date().getTime();

  if (now_at < Number(lastMinedAt) + minBlockTimes) {
    await sleep(Number(lastMinedAt) + minBlockTimes - now_at);
  }

  return {
    computed_hash,
    saltHex,
  };
}

async function mineAction(mined) {
  const contractObj = getContract();
  const gasLimit = await contractObj.estimateGas['mine'](mined.computed_hash, mined.saltHex);

  await contractObj.mine(mined.computed_hash, mined.saltHex, {
    gasLimit: gasLimit.toString(),
  });
}

async function mineStart() {
  while (true) {
    try {
      const mined = await getMinedHash();
      console.log(mined);
      await mineAction(mined);
    } catch (e) {
      console.log(e);
      console.log('mine failed');
    }
  }
}

$(document).ready(function () {
  setAccount(accountAddress);
  getBalance(accountAddress);
  setCurrentChain('MANTLE');

  $('#chainMantle').click(function () {
    setCurrentChain('MANTLE');
  });

  $('#chainEth').click(function () {
    setCurrentChain('ETH');
  });

  $('.div-block-22').click(function () {
    mineStart();
  });

  $('#mineBtn').click(function () {
    $('#mineBtn').addClass('high-btn');
    $('#globalBtn').removeClass('high-btn');
  });

  $('#globalBtn').click(function () {
    $('#globalBtn').addClass('high-btn');
    $('#mineBtn').removeClass('high-btn');
  });
});
