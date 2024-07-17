import { ethers } from 'ethers';
import { hashObject } from './hashObject';
import { pinFileToIPFS, uploadJSONToIPFS } from './ipfs';
import { L2_CRED_CONTRACT } from '../config/config';
import abiCred from './abi/certificate.json';

export async function sendIssueTransaction(reqBody) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []); // Yêu cầu quyền truy cập vào tài khoản của người dùng
  const signer = provider.getSigner(localStorage.getItem('walletAddress'));

  // Create the certificate information object
  const info = {
    name: reqBody.name,
    identityNumber: reqBody.identityNumber,
    institution: reqBody.institution,
    type: reqBody.type,
    score: reqBody.score,
    expireDate: reqBody.expireDate,
    note: reqBody.note,
  };

  // Hash the certificate information
  const hashInfo = hashObject(info);

  // Create transaction data
  const contractAddress = '0x5C8B4dc5A7ce516f67B419B222E647192C51caD1'; // Thay bằng địa chỉ hợp đồng thực tế
  const contractABI = abiCred; // Thay bằng ABI của hợp đồng thực tế
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const encodedData = contract.interface.encodeFunctionData(
    'issueCertificate',
    [reqBody.holder, reqBody.jsonHash, hashInfo, reqBody.note]
  );

  const tx = {
    to: contractAddress,
    data: encodedData,
    value: ethers.utils.parseEther('0'), // Số lượng ETH gửi kèm (nếu cần)
  };

  const txResponse = await signer.sendTransaction(tx);

  const receipt = await txResponse.wait();

  const certHash = receipt.logs
    .map((log) => contract.interface.parseLog(log))
    .find((log) => log.name === 'CertificateIssued')?.args._certificateHash;

  if (!certHash) {
    throw new Error('CertificateIssued event not found in transaction logs');
  }

  console.log('Transaction certHash:', certHash);

  return {
    ...receipt,
    certHash,
  };
}

export async function sendRevokeTransaction(reqBody) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []); // Yêu cầu quyền truy cập vào tài khoản của người dùng
  const signer = provider.getSigner(localStorage.getItem('walletAddress'));

  // Create the certificate information object
  const info = {
    ...reqBody,
  };

  // Hash the certificate information
  const hashInfo = hashObject(info);

  // Create transaction data
  const contractAddress = '0x5C8B4dc5A7ce516f67B419B222E647192C51caD1'; // Thay bằng địa chỉ hợp đồng thực tế
  const contractABI = abiCred; // Thay bằng ABI của hợp đồng thực tế
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const encodedData = contract.interface.encodeFunctionData(
    'revokeCertificate',
    [reqBody.holder, reqBody.certHash, reqBody.reason]
  );

  const tx = {
    to: contractAddress,
    data: encodedData,
    value: ethers.utils.parseEther('0'), // Số lượng ETH gửi kèm (nếu cần)
  };

  const txResponse = await signer.sendTransaction(tx);

  const receipt = await txResponse.wait();

  const logs = receipt.logs.map((log) => contract.interface.parseLog(log));
  let _isRevoked = false;
  for (const log of logs) {
    if (log.name === 'RevokedCertificate') {
      _isRevoked = log.args._isRevoked;
    }
  }

  console.log(_isRevoked);

  console.log('Transaction receipt:', receipt);

  return receipt;
}
