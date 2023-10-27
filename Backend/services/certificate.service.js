const { Web3 } = require("web3");
const config = require("../config/config");
const certificatesABI = require("../utils/abi/Certificates.json");

const web3 = new Web3(config.web3Provider);

const issue = async (body) => {
	try {
		const certificateContract = new web3.eth.Contract(certificatesABI, config.certificateContractAddress);

		const result = await certificateContract.methods.issueCertificate(
			body.holder,
			body.data,
			body.issueDate,
			body.expirationDate
		).send({
			from: body.issuer,
			gas: 1000000,
		});

		return result;

	} catch (error) {
		console.error(error);
	}
};

// const revokeCertificate = async (issuerAddress, certificateBody) => {
// 	try {
// 		const gas = await certificateContract.methods
// 			.revokeCertificate(certificateBody)
// 			.estimateGas();
// 		const receipt = await certificateContract.methods
// 			.revokeCertificate(certificateBody)
// 			.send({
// 				from: issuerAddress,
// 				gas: gas,
// 			});
// 		console.log(
// 			"Giao dịch revokeCertificate đã được gửi. Hash giao dịch:",
// 			receipt.transactionHash
// 		);
// 		return receipt.transactionHash;
// 	} catch (error) {
// 		console.error("Lỗi khi gọi hàm revokeCertificate:", error);
// 	}
// };

// const verifyCertificate = async (holderAddress, certificateHash) => {
// 	try {
// 		const result = await certificateContract.methods
// 			.verifyCertificate(holderAddress, certificateHash)
// 			.call();
// 		console.log("Kết quả xác thực chứng chỉ:", result);
// 		return result;
// 	} catch (error) {
// 		console.error("Lỗi khi gọi hàm verifyCertificate:", error);
// 	}
// };

module.exports = {
	issue,
	// revokeCertificate,
	// verifyCertificate,
};
