import axios from 'axios';

const baseUrl = 'http://localhost:3000/v1/credential/address';

export const issueCertificate = async (data, file) => {
  try {
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify(data));
    formData.append('pdfFile', file);
    const response = await axios.post(baseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revokeCertificate = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/revoke`, data);
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
    const response = await axios.get(`${baseUrl}/${certificateHash}`, {
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
