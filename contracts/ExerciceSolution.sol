pragma solidity >=0.6.0;

import "./IExerciceSolution.sol";
import "./NFT_td9.sol";

contract ExerciceSolution {
    NFT_td9 nft;

    constructor(NFT_td9 _nft) public {
        nft = _nft;
	}

	function ERC721Address() public {
        return address(nft);
    }

	function mintATokenForMe() public {
        uint256 newItemId = nft.awardItem(msg.sender);
        return newItemId;
    }

}