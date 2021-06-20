/* global describe, beforeEach, it, xit, web3 */

const { buildCreate2Address } = require('../scripts/create2utils.js')(web3)

describe('Lib create2utils.js', () => {
  beforeEach(async () => { });

  describe('function buildCreate2Address', () => {
    context('For pre-defined input', () => {
      it('should compute address #1 (zero creator, salt and bytecode)', async () => {
        expect(buildCreate2Address('0x0000000000000000000000000000000000000000', '0', '0x00'))
            .to.equal('0x4D1A2e2bB4F88F0250f26Ffff098B0b30B26BF38')
      })

      it('should compute address #2 (zero creator, salt and bytecode)', async () => {
        expect(buildCreate2Address('0x0000000000000000000000000000000000000000', 0, '0x00'))
            .to.equal('0x4D1A2e2bB4F88F0250f26Ffff098B0b30B26BF38')
      })

      it('should compute address #3 (zero creator, salt and bytecode)', async () => {
        expect(buildCreate2Address('0x0000000000000000000000000000000000000000', '0x00', '0x00'))
            .to.equal('0x4D1A2e2bB4F88F0250f26Ffff098B0b30B26BF38')
      })

      it('should compute address #4 (non-zero creator)', async () => {
        expect(buildCreate2Address(
            '0xdeadbeef00000000000000000000000000000000',
            0,
            '0x00'
        )).to.equal('0xB928f69Bb1D91Cd65274e3c79d8986362984fDA3')
      })

      it('should compute address #5 (non-zero creator and salt)', async () => {
        expect(buildCreate2Address(
            '0xdeadbeef00000000000000000000000000000000',
            '0x000000000000000000000000feed000000000000000000000000000000000000',
            '0x00'
        )).to.equal('0xD04116cDd17beBE565EB2422F2497E06cC1C9833')
      })

      it('should compute address #6 (non-zero bytecode)', async () => {
        expect(buildCreate2Address(
            '0xdeadbeef',
            0xcafebabe,
            '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
        )).to.equal('0x1d8bfDC5D46DC4f61D6b6115972536eBE6A8854C')
      })

      it('should compute address #7 (padded salt)', async () => {
        expect(buildCreate2Address(
            '0xdeadbeef',
            '0x00000000000000000000000000000000000000000000000000000000cafebabe',
            '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
        )).to.equal('0x1d8bfDC5D46DC4f61D6b6115972536eBE6A8854C')
      })

      it('should compute address #8 (padded salt)', async () => {
        expect(buildCreate2Address(
            '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
            '0x0000000000000000000000000000000000000000000000000000000000abcdef',
            '0x3d602d80600a3d3981f3363d3d373d3d3d363d735fbdb2315678afecb367f032d93f642f64180aa35af43d82803e903d91602b57fd5bf3'
        )).to.equal('0x8684d8eB064D3492999e9a881A921eC3a3C7a730')
      })

      it('should compute address #9 (not-padded salt)', async () => {
        expect(buildCreate2Address(
            '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
            0xabcdef,
            '0x3d602d80600a3d3981f3363d3d373d3d3d363d735fbdb2315678afecb367f032d93f642f64180aa35af43d82803e903d91602b57fd5bf3'
        )).to.equal('0x8684d8eB064D3492999e9a881A921eC3a3C7a730')
      })

      it('should compute address #10', async () => {
        expect(buildCreate2Address(
            '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
            '0x0b00000000000000000000000000000000000000000000000000000000000000',
            '0x3d602d80600a3d3981f3363d3d373d3d3d363d735fbdb2315678afecb367f032d93f642f64180aa35af43d82803e903d91602b57fd5bf3'
        )).to.equal('0xb6aaeA3fF1A82DfC182fB68dB526179A2A025618')
      })
    })
  })
});
