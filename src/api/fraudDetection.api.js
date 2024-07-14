import axios from 'axios';

const baseUrl = 'https://khanhpham.pythonanywhere.com/api/detect';

export const detectFraud = async (address) => {
  try {
    const response = await axios.get(`${baseUrl}/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error detecting fraud:', error);
  }
};
