'use strict';

module.exports = {
  compilers: {
    solc: {
      version: "0.6.12",
      docker: false,
      settings: {
        evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 200
        },
      },
    }
  }
};
