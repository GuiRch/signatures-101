pragma solidity >=0.6.0;

import "./IExerciceSolution.sol";
import "./NFT_td9.sol";

contract ExerciceSolution {
    mapping(address => bool) public whitelisted;
    NFT_td9 nft;

    constructor(NFT_td9 _nft) public {
        nft = _nft;
        whitelisted[msg.sender] = true;
	}

	function ERC721Address() public returns(address) {
        return address(nft);
    }

	function mintATokenForMe() public returns(uint256) {
        uint256 newItemId = nft.awardItem(msg.sender);
        return newItemId;
    }

    function whitelist(address _signer) public returns (bool) {
        return whitelisted[_signer];
    }

    function signerIsWhitelisted(bytes32 _hash, bytes memory _signature) public returns (bool) {
        return whitelisted[getAddressFromSignature(_hash, _signature)];
    }

    function getAddressFromSignature(bytes32 _hash, bytes memory _signature) public returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        // Check the signature length
        if (_signature.length != 65) {
            return address(0);
        }
        // Divide the signature in r, s and v variables
        // ecrecover takes the signature parameters, and the only way to get them
        // currently is to use assembly.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return address(0);
        } else {
            // solium-disable-next-line arg-overflow
            return ecrecover(keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
                ), v, r, s);
        }
    }

}