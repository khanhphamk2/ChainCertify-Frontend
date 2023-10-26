const { Web3 } = require("web3");
const config = require("../config/config");
const httpStatus = require("http-status");

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));

const certificatesABI = require("../utils/abi/certificates.json");

const certificateContractAddress = config.certificateAddress;

const certificateContract = new web3.eth.Contract(
	certificatesABI,
	certificateContractAddress
);

const issue = async (_issuer, _holder, body) => {
	try {
		const issuer = _issuer.toString();
		const holder = _holder.toString();
		const gas = await certificateContract.methods
			.issueCertificate(
				issuer,
				holder,
				body.information,
				body.issueDate,
				body.expiratonDate
			)
			.estimateGas({
				gas: 50000000,
			});
		if (gas > 50000000) {
			console.log("Gas lớn hơn 50000000");
			return;
		} else {
			const result = await certificateContract.methods
				.issueCertificate(
					issuer,
					holder,
					body.information,
					body.issueDate,
					body.expiratonDate
				).send({
					from: issuer,
					gas: 20000,
				});
			return result.toString();
		}
	} catch (error) {
		return error;
	}
};

const revokeCertificate = async (issuerAddress, certificateBody) => {
	try {
		const gas = await certificateContract.methods
			.revokeCertificate(certificateBody)
			.estimateGas();
		const receipt = await certificateContract.methods
			.revokeCertificate(certificateBody)
			.send({
				from: issuerAddress,
				gas: gas,
			});
		console.log(
			"Giao dịch revokeCertificate đã được gửi. Hash giao dịch:",
			receipt.transactionHash
		);
		return receipt.transactionHash;
	} catch (error) {
		console.error("Lỗi khi gọi hàm revokeCertificate:", error);
	}
};

const verifyCertificate = async (holderAddress, certificateHash) => {
	try {
		const result = await certificateContract.methods
			.verifyCertificate(holderAddress, certificateHash)
			.call();
		console.log("Kết quả xác thực chứng chỉ:", result);
		return result;
	} catch (error) {
		console.error("Lỗi khi gọi hàm verifyCertificate:", error);
	}
};

module.exports = {
	issue,
	revokeCertificate,
	verifyCertificate,
};
