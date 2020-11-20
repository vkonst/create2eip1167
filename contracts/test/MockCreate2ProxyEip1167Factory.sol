// "SPDX-License-Identifier: MIT"
pragma solidity ^0.6.0;

import "../Create2ProxyEip1167Factory.sol";


contract MockCreate2ProxyEip1167Factory is Create2ProxyEip1167Factory {
    function create2Eip1167Proxy(address logic, bytes32 salt)
        external
        returns (address)
    {
        return _create2Eip1167Proxy(logic, salt);
    }

    function createAndCall2Eip1167Proxy(
        address logic,
        bytes32 salt,
        bytes memory data
    ) internal returns (address newProxy) {
        return _createAndCall2Eip1167Proxy(logic, salt, data);
    }

    function getEip1167ProxyAddress(
        address deployer,
        address logic,
        bytes32 salt
    ) external pure returns (address) {
        return _getEip1167ProxyAddress(deployer, logic, salt);
    }

    function getEip1167ProxyInitBytecode(address logic)
        external
        pure
        returns (bytes memory)
    {
        return _getEip1167ProxyInitBytecode(logic);
    }
}
