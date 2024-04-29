// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentralizedArtGallery is ERC721URIStorage, ERC721Royalty, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _artTokenIds;

    event ArtworkMinted(uint256 indexed tokenId, address creator, string metadataURI, uint256 royaltyPercentage);

    constructor() ERC721("DecentralizedArtNFT", "DANFT") {}

    function mintArtwork(string memory metadataURI, uint256 royaltyFeeInBasisPoints) external {
        _artTokenIds.increment();
        uint256 newArtTokenId = _artTokenIds.current();
        
        _mint(msg.sender, newArtTokenId);
        _setTokenURI(newArtTokenId, metadataURI);

        _setTokenRoyalty(newArtTokenId, msg.sender, royaltyFeeInBasisPoints);

        emit ArtworkMinted(newArtTokenId, msg.sender, metadataURI, royaltyFeeInBasisPoints);
    }

    function transferArtwork(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
    }

    function updateRoyaltyInformation(uint256 tokenId, address royaltyRecipient, uint256 royaltyFeeInBasisPoints) external {
        require(ownerOf(tokenId) == msg.sender, "DecentralizedArtGallery: Only the artwork owner can update royalty information.");
        _setTokenRoyalty(tokenId, royaltyRecipient, royaltyFeeInBasisPoints);
    }

    function fetchArtworkCreator(uint256 tokenId) external view returns (address) {
        address creator = royaltyInfo(tokenId, 0).receiver;
        require(creator != address(0), "DecentralizedArtGallery: Invalid tokenId or creator does not exist.");
        return creator;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}