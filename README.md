# create2eip1167
A tiny lib for EIP-1167 proxy deployment with CREATE2
> - [EIP-1167 proxy](https://eips.ethereum.org/EIPS/eip-1167) is a minimal non-upgradable proxy contract, 55 bytes only, that forwards all calls and 100% of gas to the proxied contract (the "implementation")
> - [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) is an EVM opcode that allow to compute the address where a contract will be deployed
>
> Combining those two, let
> - save gas avoiding re-deployment of the "implementation" code for a new instance of the contract
> - know the address of a proxy without deploying it (for example, on user invite)
> - deploy the proxy contract only if and when it is needed, avoid deploying unneeded proxies
> (for example, if an invited user ignores the invitation)

_NB: It takes ~66e+3 gas to deploy the EIP-1167 proxy. The proxy adds 2.7e+3 gas to every call of the implementation (measured for "istanbul" EVM version)._ 

## Install
```
$ npm i @vkonst/create2eip1167
```

## API
```
    /**
     * @dev Deploy with `CRATE2` a new EIP-1167 proxy instance.
     * @param logic Contract address the proxy calls (via DELEGATECALL) to
     * @param salt As defined by EIP-1167
     * @return newProxy Address of the newly deployed proxy instance
     */
    function _create2Eip1167Proxy(address logic, bytes32 salt) internal returns (address newProxy);

    /**
     * @dev Deploy with `CRATE2` a new EIP-1167 proxy instance and make an initialization call.
     * @param logic Contract address the new proxy shall pass calls to (via DELEGATECALL)
     * @param salt As defined by EIP-1167
     * @param data Data to send as msg.data on the initialization call to the proxy contract
     * It should include the signature and the parameters of the function to be called, as described in
     * https://solidity.readthedocs.io/en/v0.4.24/abi-spec.html#function-selector-and-argument-encoding.
     * This parameter is optional, if no data is given the call to the proxy will be skipped.
     * @return newProxy Address of the newly deployed proxy instance
     */
    function _createAndCall2Eip1167Proxy(
        address logic,
        bytes32 salt,
        bytes memory data
    ) internal returns (address newProxy);

    /**
     * @dev Get the address a new EIP-1167 proxy instance (w/o deploying it)
     * @param deployer Account that deploys (via CREATE2) the EIP-1167 proxy instance
     * @param logic Contract address the proxy calls (via DELEGATECALL) to
     * @param salt As defined by EIP-1167
     * @return EIP-1167 proxy instance address
     */
    function _getEip1167ProxyAddress(
        address deployer,
        address logic,
        bytes32 salt
    ) internal pure returns (address);

    /**
     * @dev Generate the init code for a new EIP-1167 proxy instance
     * @param logic Contract address the proxy calls (via DELEGATECALL) to
     * For details on how the "init bytecode" differs from "bytecode", "deployedBytecode", etc...:
     * https://ethereum.stackexchange.com/questions/76334/what-is-the-difference-between-bytecode-init-code-deployed-bytedcode-creation
     * @return initBytecode EIP-1167 proxy init bytecode
     */
    function _getEip1167ProxyInitBytecode(address logic)
        internal
        pure
        returns (bytes memory initBytecode);
```

## Use
```
pragma solidity ^0.6.0;

import "@vkonst/create2eip1167/Create2ProxyEip1167Factory.sol";


contract MyContract is Create2ProxyEip1167Factory {
  // API functions get exposed for the contract.
}
```
## Test
!!! NB: still WIP
```
$ cd node_modules/@vkonst/create2eip1167
$ yarn install
$
$ npx run test
```
