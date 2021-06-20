// "SPDX-License-Identifier: MIT"
pragma solidity ^0.8.2;


/**
 * @title Create2ProxyEip1167Factory
 * @notice Factory for deploying EIP-1167 Proxy contracts with CREATE2
 * Refer to https://eips.ethereum.org/EIPS/eip-1167 for EIP-1167
 */
contract Create2ProxyEip1167Factory {
    event NewEip1167Proxy(address proxy, address logic, bytes32 salt);

    /**
     * @dev Deploy with `CRATE2` a new EIP-1167 proxy instance.
     * @param logic Contract address the proxy calls (via DELEGATECALL) to
     * @param salt As defined by EIP-1167
     * @return newProxy Address of the newly deployed proxy instance
     */
    function _create2Eip1167Proxy(address logic, bytes32 salt)
        internal
        returns (address newProxy)
    {
        bytes memory bytecode = _getEip1167ProxyInitBytecode(logic);
        assembly {
            newProxy := create2(
                0, // 0 wei
                add(bytecode, 0x20),
                mload(bytecode),
                salt
            )
        }
        emit NewEip1167Proxy(newProxy, logic, salt);
    }

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
    ) internal returns (address newProxy) {
        newProxy = _create2Eip1167Proxy(logic, salt);

        if (data.length > 0) {
            (bool success, ) = newProxy.call(data);
            require(
                success,
                "Create2ProxyEip1167Factory: failed to call the proxy"
            );
        }
    }

    /**
     * @dev Get the address a new EIP-1167 proxy instance (w/o deploying it)
     * @param deployer Account that deploys (via CREATE2) the EIP-1167 proxy instance
     * @param logic Contract address the proxy calls (via DELEGATECALL) to
     * @param salt As defined by EIP-1167
     * Note, `bytes32` has right zero-padding (unlike left padding for `uint256`);
     * i.e. `encodePacked` 0xC0FE is 0xC0FE000000000000000000000000000000000000000000000000000000000000;
     * @return EIP-1167 proxy instance address
     */
    function _getEip1167ProxyAddress(
        address deployer,
        address logic,
        bytes32 salt
    ) internal pure returns (address) {
        bytes32 initCodeHash = keccak256(_getEip1167ProxyInitBytecode(logic));
        return
            address(
                bytes20(
                    keccak256(
                        abi.encodePacked(hex"ff", deployer, salt, initCodeHash)
                    )
                )
            );
    }

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
        returns (bytes memory initBytecode)
    {
        require(logic != address(0), "ProxyFactory: ZERO_LOGIC_ADDRESS");

        bytes20 targetAddress = bytes20(logic);

        initBytecode = abi.encodePacked(
            // 0x3d602d80600a3d3981f3 is the static constructor that returns the EIP-1167 bytecode being:
            // 0x363d3d373d3d3d363d73<target address (20 bytes)>5af43d82803e903d91602b57fd5bf3
            // source: EIP-1167 reference implementation (https://github.com/optionality/clone-factory)
            hex"3d602d80600a3d3981f3363d3d373d3d3d363d73",
            targetAddress,
            hex"5af43d82803e903d91602b57fd5bf3"
        );
    }
}
