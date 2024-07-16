import axios from 'axios';

const baseUrl = 'http://localhost:3000/v1/request';

export const issueRequest = async (data, file) => {
  try {
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify(data));
    formData.append('pdfFile', file);
    const response = await axios.post(`${baseUrl}/issue`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revokeRequest = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/revoke`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
