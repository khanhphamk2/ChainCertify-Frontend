// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19 <0.9.0;

import "./Issuer.sol";
import "./Holder.sol";
import "./VerifySignature.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Certificates {
    Issuer private issuer;
    Holder private holder;
    VerifySignature private sig;
    struct Certificate {
        address holder;
        address issuer;
        string data;
        uint issueDate;
        uint expirationDate;
        bool isRevoked;
    }

    mapping(address => mapping(bytes32 => Certificate)) public certificates;
    mapping(address => uint256) public certificateCounts;

    constructor(
        address _issuerContractAddress,
        address _holderContractAddress,
        address _verifySignatureContractAddress
    ) payable {
        issuer = Issuer(_issuerContractAddress);
        holder = Holder(_holderContractAddress);
        sig = VerifySignature(_verifySignatureContractAddress);
    }

    event CertificateIssued(
        address indexed _holder,
        address indexed _issuer,
        string _data,
        uint _issueDate,
        uint _expirationDate
    );

    event RevokedCertificate(
        address indexed _issuer,
        address indexed _holder,
        bytes32 _certificateHash
    );

    modifier onlyAuthorizedIssuer() {
        require(
            issuer.authorizedIssuers(msg.sender),
            "Only authorized issuers can call this function"
        );
        _;
    }

    function issueCertificate(
        address _holder,
        string memory information,
        uint _issue,
        uint _expiration
    ) public onlyAuthorizedIssuer returns (bytes32) {
        bytes32 hash = keccak256(
            abi.encode(_holder, information, _issue, _expiration)
        );
        certificates[_holder][hash] = Certificate(
            _holder,
            msg.sender,
            information,
            _issue,
            _expiration,
            false
        );
        // sig.getCertHash(_holder, information, _issue, _expiration, 0);
        holder.addHolder(_holder);
        certificateCounts[_holder]++;
        emit CertificateIssued(
            _holder,
            msg.sender,
            information,
            _issue,
            _expiration
        );
        return hash;
    }

    // function getCertificate(
    //     address _holder,
    //     bytes32 _certi
    // ) external view returns (address, address, string memory, bool) {
    //     Certificate memory cert = certificates[_holder][_certi];
    //     return (cert.holder, cert.issuer, cert.data, cert.isRevoked);
    // }

    // function getCertificateCount(
    //     address _holder
    // ) public view returns (uint256) {
    //     return certificateCounts[_holder];
    // }

    // function getCertificatesByAddress(
    //     address _holder
    // ) public view returns (Certificate[] memory) {}

    function revokeCertificate(
        address _holder,
        bytes32 _certi
    ) external onlyAuthorizedIssuer returns (bool) {
        require(holder.isHolder(_holder) == false, "Holder is not exist");

        require(
            certificates[_holder][_certi].isRevoked == false,
            "Certificate is not active"
        );

        certificates[_holder][_certi].isRevoked = true;

        emit RevokedCertificate(
            certificates[_holder][_certi].issuer,
            _holder,
            _certi
        );

        return true;
    }

    // function verifyCertificate(
    //     address _holder,
    //     bytes32 _certi
    // ) external view returns (bool) {
    //     return (!certificates[_holder][_certi].isRevoked &&
    //         VerifySignature.verify(
    //             certificates[_holder][_certi].issuer,
    //             certificates[_holder][_certi].data,
    //         ));
    // }
}
