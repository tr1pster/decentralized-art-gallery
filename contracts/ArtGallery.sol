// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentralizedArtGallery is ERC721URIStorage, ERC721Royalty, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _artTokenIds;

    event ArtworkMinted(uint256 tokenId, address indexed creator, string metadataURI, uint256 royaltyPercentage);

    constructor() ERC721("DecentralizedArtNFT", "DANFT") {}

    function mintArtwork(string memory metadataURI, uint256 royaltyFeeInBasisPoints) external {
        _validateMintInputs(metadataURI, royaltyFeeInBasisPoints);

        _artTokenIds.increment();
        uint256 newArtTokenId = _artTokenIds.current();
        
        _mintArtwork(newArtTokenId, metadataURI, royaltyFeeInBasisPoints);
    }

    function _validateMintInputs(string memory metadataURI, uint256 royaltyFeeInBasisPoints) internal pure {
        require(bytes(metadataURI).length > 0, "DecentralizedArtGallery: URI empty.");
        require(royaltyFeeInBasisPoints <= 10000, "DecentralizedArtGallery: Royalty too high.");
    }

    function _mintArtwork(uint256 tokenId, string memory metadataURI, uint256 royaltyFeeInBasisPoints) internal {
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);
        _setTokenRoyalty(tokenId, msg.sender, royaltyFeeInBasisPoints);
        
        emit ArtworkMinted(tokenId, msg.sender, metadataURI, royaltyFeeInBasisPoints);
    }

    function updateRoyaltyInformation(uint256 tokenId, address royaltyRecipient, uint256 royaltyFeeInBasisPoints) external {
        require(_exists(tokenId), "DecentralizedArtGallery: Invalid token.");
        require(ownerOf(tokenId) == msg.sender, "DecentralizedArtGallery: Not owner.");
        require(royaltyRecipient != address(0), "DecentralizedArtGallery: Invalid recipient.");
        require(royaltyFeeInBasisPoints <= 10000, "DecentralizedArtGallery: Royalty too high.");

        _setTokenRoyalty(tokenId, royaltyRecipient, royaltyFeeInBasisPoints);
    }

    function fetchArtworkCreator(uint256 tokenId) external view returns (address) {
        require(_exists(tokenId), "DecentralizedArtGallery: Invalid token.");

        address creator = royaltyInfo(tokenId, 0).receiver;
        return creator;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}