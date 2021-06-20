/* global contract, beforeEach, it, xit */
const Create2ProxyEip1167Factory = artifacts.require("MockCreate2ProxyEip1167Factory")

// TODO: create unit-tests for Create2ProxyEip1167Factory
contract('Create2ProxyEip1167Factory', () => {
  let factory;

  before(async () => {
    factory = await Create2ProxyEip1167Factory.new()
  })

  describe('_getEip1167ProxyInitBytecode', (/* accounts */) => {
    xit('should test _getEip1167ProxyInitBytecode', async () => {
      return Promise.resolve()
    });
  })

  describe('_getEip1167ProxyAddress', () => {
    xit('should test _getEip1167ProxyAddress', async () => {
      return Promise.resolve()
    });
  })

  describe('_create2Eip1167Proxy', () => {
    xit('should test _create2Eip1167Proxy', async () => {
      return Promise.resolve()
    });
  })

  describe('_createAndCall2Eip1167Proxy', () => {
    xit('should test _createAndCall2Eip1167Proxy', async () => {
      return Promise.resolve()
    });
  })
});
