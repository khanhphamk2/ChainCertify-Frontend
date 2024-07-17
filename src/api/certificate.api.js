import axios from 'axios';

const baseUrl = 'http://localhost:3000/v1/credential';

export const issueCertificate = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/address`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeCertificate = async (certHash, data) => {
  try {
    const response = await axios.put(`${baseUrl}/address/${certHash}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFileInfo = async (ipfsUrl) => {
  try {
    const response = await axios.get(ipfsUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (ipfsUrl) => {
  try {
    const response = await axios.get(ipfsUrl, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCertificate = async (certificateHash, holder, issuer) => {
  try {
    const response = await axios.get(`${baseUrl}/address/${certificateHash}`, {
      params: {
        holder,
        issuer,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCertificatesList = async (address) => {
  try {
    const response = await axios.get(`${baseUrl}/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadJson = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/uploadJson`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append('pdfFile', file);
  const response = await axios.post(`${baseUrl}/uploadPdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
