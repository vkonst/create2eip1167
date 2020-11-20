module.exports = (web3) => {
  const { BN, sha3, isAddress, toChecksumAddress } = web3.utils;

  return {
    /**
     * Return the address of a contract being deployed with CREATE2
     * @param deployingAddr {string}
     * @param salt {string|number}
     * @param bytecode {string} init bytecode of the contract
     * @return {string}
     */
    buildCreate2Address,

    /**
     * Return salt as a 32-bytes hex string
     * @param salt {number|string}
     * @returns {string}
     */
    getPaddedSalt,
  };

  function buildCreate2Address(deployingAddr, salt, bytecode) {
    // keccak256(0xff ++ deployingAddr ++ salt ++ keccak256(bytecode))
    const prefix = '0xff' + deployingAddr.replace(/^0x/, '').padStart(40, '0');
    const paddedSalt = getPaddedSalt(salt);
    const bytecodeHash = sha3(`${bytecode.startsWith('0x') ? '' : '0x'}${bytecode}`).replace(/^0x/, '');
    return toChecksumAddress(
      '0x' + sha3(`${prefix}${paddedSalt}${bytecodeHash}`.toLowerCase()).slice(-40),
    );
  }

  function  getPaddedSalt(salt) {
    return (new BN(salt)).toString(16).replace(/^0x/, '').padStart(64, '0');
  }
};

