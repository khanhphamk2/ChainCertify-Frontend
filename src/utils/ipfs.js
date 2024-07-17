// import { IPFS_JWT_KEY, IPFS_ACCESS_TOKEN_KEY_1 } from '../config/config';
// import pinataSDK from '@pinata/sdk';

// const pinata = new pinataSDK({ pinataJWTKey: IPFS_JWT_KEY });

// export const getFile = async (CID) => {
//   const url = `https://black-delicate-hamster-859.mypinata.cloud/ipfs/${CID}?pinataGatewayToken=${IPFS_ACCESS_TOKEN_KEY_1}`;
//   return url.toString();
// };
// export const testConnect = async () => {
//   try {
//     const res = await pinata.testAuthentication();
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const pinFileToIPFS = async (filePath, myCustomName) => {
//   try {
//     const options = {
//       pinataMetadata: {
//         name: myCustomName,
//       },
//       pinataOptions: {
//         cidVersion: 0,
//       },
//     };

//     const res = await pinata.pinFileToIPFS(filePath, options);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const pinFromFS = async (sourcePath) => {
//   try {
//     const options = {
//       pinataMetadata: {
//         name: 'My Awesome Website',
//       },
//       pinataOptions: {
//         cidVersion: 0,
//       },
//     };
//     const res = await pinata.pinFromFS(sourcePath, options);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const uploadJSONToIPFS = async (jsonObject, customName) => {
//   try {
//     const options = {
//       pinataMetadata: {
//         name: customName,
//       },
//       pinataOptions: {
//         cidVersion: 0,
//       },
//     };
//     const res = await pinata.pinJSONToIPFS(jsonObject, options);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const userPinnedDataTotal = async () => {
//   try {
//     const res = await pinata.userPinnedDataTotal();
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const unpin = async (cid) => {
//   try {
//     const res = await pinata.unpin(cid);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const hashMetadata = async (ipfsHash, data) => {
//   try {
//     const metadata = {
//       name: 'new custom name',
//       keyvalues: {
//         newKey: 'newValue',
//         existingKey: 'newValue',
//         existingKeyToRemove: null,
//       },
//     };
//     const res = await pinata.hashMetadata(ipfsHash, metadata);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
