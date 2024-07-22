importScripts('https://cdn.ethers.io/lib/ethers-5.2.umd.min.js');
importScripts('https://cdn.jsdelivr.net/npm/bignumber.js@9.1.2/bignumber.min.js');

self.addEventListener('message', (event) => {
  const { data } = event;
  const dataReal = JSON.parse(data);

  if (dataReal.type === 'start') {
    const { address, currentHash, difficultyHash } = dataReal.payload;
    const randomBytes = new Uint8Array(32);
    self.crypto.getRandomValues(randomBytes);
    const randomHex = Array.from(randomBytes)
      .map((byte) => ('0' + byte.toString(16)).slice(-2))
      .join('');
    const account_address_prefix = address.toLowerCase().replace(/^0x/, '').padStart(40, '0');
    const hashPrefix = currentHash + account_address_prefix;

    let computedHash;
    let salt = new BigNumber('0x' + randomHex);
    let beginSalt = salt;
    const t1 = new Date().getTime();
    while (true) {
      const packed = hashPrefix + salt.toString(16).padStart(64, '0');
      computedHash = ethers.utils.keccak256(packed);
      if (computedHash < difficultyHash) {
        break;
      }
      const t2 = new Date().getTime();

      salt = salt.plus(1);
    }
    const t2 = new Date().getTime();
    const hash_count = salt.minus(beginSalt);
    const hashRate = (Number(hash_count) / (t2 - t1)).toFixed(2);

    self.postMessage(JSON.stringify({
      type: 'rate',
      payload: {
        hashRate
      },
    }));

    const saltHex = '0x' + salt.toString(16).padStart(64, '0');

    const packed1 = hashPrefix + salt.toString(16).padStart(64, '0') + computedHash.slice(2) + "00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    const signature = ethers.utils.keccak256(packed1);

    self.postMessage(JSON.stringify({
      type: 'hash',
      payload: {
        computedHash,
        saltHex,
        signature,
        hashRate
      },
    }));

  }
});