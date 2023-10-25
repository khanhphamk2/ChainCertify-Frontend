// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Issuer is Ownable {
    mapping(address => bool) public authorizedIssuers;

    event IssuerAdded(address indexed issuer);
    event IssuerRevoked(address indexed issuer);

    constructor(address _issuer) {
        transferOwnership(_issuer);
        authorizedIssuers[_issuer] = true;
    }

    function addIssuer(address issuer) private onlyOwner {
        require(authorizedIssuers[issuer], "Issuer already exists");
        authorizedIssuers[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function revokeIssuer(address issuer) private onlyOwner {
        require(!authorizedIssuers[issuer], "Issuer dosn't authorized");
        authorizedIssuers[issuer] = false;
        emit IssuerRevoked(issuer);
    }
}
