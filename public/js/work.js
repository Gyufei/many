importScripts('https://cdn.ethers.io/lib/ethers-5.2.umd.min.js');
importScripts('https://cdn.jsdelivr.net/npm/bignumber.js@9.1.2/bignumber.min.js');

self.addEventListener('message', (event) => {
  console.log(event, 'in worker');
  const { data } = event;
  const dataReal = JSON.parse(data);
  console.log(ethers, BigNumber)

  if (dataReal.type === 'start') {
    const { address, currentHash, difficultyHash } = dataReal.payload;
    const randomBytes = new Uint8Array(32);
    self.crypto.getRandomValues(randomBytes);
    const randomHex = Array.from(randomBytes)
      .map((byte) => ('0' + byte.toString(16)).slice(-2))
      .join('');
    const account_address_prefix = address.toLowerCase().replace(/^0x/, '').padStart(40, '0');
    const hashPrefix = currentHash + account_address_prefix;

    let computed_hash;
    let salt = new BigNumber('0x' + randomHex);
    while (true) {
      const packed = hashPrefix + salt.toString(16).padStart(64, '0');
      computed_hash = ethers.utils.keccak256(packed);
      if (computed_hash < difficultyHash) {
        break;
      }
      salt = salt.plus(1);
      self.postMessage(JSON.stringify({
        type: 'salt',
        payload: { salt },
      }));
    }

    const saltHex = '0x' + salt.toString(16).padStart(64, '0');

    self.postMessage(JSON.stringify({
      type: 'hash',
      payload: {
        computed_hash,
        salt,
      },
    }));
  }
});