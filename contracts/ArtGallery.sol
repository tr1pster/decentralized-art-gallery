pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtNFT is ERC721URIStorage, ERC721Royalty, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event ArtCreated(uint256 indexed tokenId, address creator, string tokenURI, uint256 royalty);

    constructor() ERC721("DigitalArtNFT", "DANFT") {}

    function mintArt(string memory tokenURI, uint256 royaltyPercentage) external {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _setTokenRoyalty(newItemId, msg.sender, royaltyPercentage);

        emit ArtCreated(newItemId, msg.sender, tokenURI, royaltyPercentage);
    }

    function transferArt(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
    }

    function setRoyaltyInfo(uint256 tokenId, address recipient, uint256 percentage) external {
        require(ownerOf(tokenId) == msg.sender, "ArtNFT: Only the owner can set royalty info.");
        _setTokenRoyalty(tokenId, recipient, percentage);
    }

    function getCreator(uint256 tokenId) external view returns (address) {
        address creator = royaltyInfo(tokenId, 0).receiver;
        require(creator != address(0), "ArtNFT: Invalid tokenId or creator does not exist.");
        return creator;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}