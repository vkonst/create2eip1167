'use strict';

module.exports = {
  networks: {

    local: {
      host: 'localhost',
      port: 8545,
      gas: 6999999,
      gasPrice: 1000000000,
      network_id: '*'
    },
  },

  compilers: {
    solc: {
      version: "0.6.12",
      docker: false,
      settings: {
        evmVersion: 'istanbul',
        optimizer: {
          enabled: !isCoverage,
          runs: 200
        },
      },
    }
  }
};
