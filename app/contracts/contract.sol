// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => string) private _tokenNames;

    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory name) public onlyOwner {
        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);
        _tokenNames[tokenId] = name;
        _nextTokenId++;
        emit Transfer(address(0), to, tokenId);
    }

    function listMintedTokens() public view returns (uint256[] memory, string[] memory) {
        uint256[] memory tokenIds = new uint256[](_nextTokenId);
        string[] memory tokenNames = new string[](_nextTokenId);

        for (uint256 i = 0; i < _nextTokenId; i++) {
            tokenIds[i] = i;
            tokenNames[i] = _tokenNames[i];
        }

        return (tokenIds, tokenNames);
    }
}