const { Web3 } = require('web3');
const { ethers } = require('ethers');
const httpStatus = require('http-status');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { certificateService } = require('../services');

const createCertificate = catchAsync(async (req, res) => {
    try {
        let result = await certificateService.issue(req.body);

        // Assuming the certificateService returns a transaction hash or relevant data
        res.status(httpStatus.OK).send(result);
    } catch (error) {
        // Handle the error and send an appropriate response to the client
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error, 'Error creating certificate');
    }
});


const revokeCertificate = catchAsync(async (req, res) => {
    try {
        const web3 = new Web3(window.ethereum);
        const address = web3.eth.getAccounts()[0];

        const revoke = await certificateService.revokeCertificate(address, req.body);

        res.status(httpStatus.CREATED).send(revoke);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error, 'Error revoking certificate');
    }
});

// const verifyCertificate = catchAsync(async (req, res) => {
//     try {
//         const certificate = await certificateService.verifyCertificate(req.body.holderAddress, req.body.certificateHash);

//         res.status(httpStatus.OK).send(certificate);
//     } catch (error) {
//         console.error('Lỗi khi gọi hàm verifyCertificate:', error);
//     }

// });

// const getCertificate = catchAsync(async (req, res) => {
//     try {
//         const certificate = await certificateService.getCertificate(req.body.holderAddress, req.body.certificateHash);
//         return certificate;
//     } catch (error) {
//         console.error('Lỗi khi gọi hàm getCertificate:', error);
//     }
// });

module.exports = {
    createCertificate,
    revokeCertificate,
    // verifyCertificate,
    // getCertificate,
}