import { ethers } from 'ethers';

export const concatJSONStrings = (jsonData) => {
  let concatenatedString = '';

  const concatValues = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        concatValues(obj[key]); // Đệ quy nếu giá trị là đối tượng
      } else {
        concatenatedString += obj[key]; // Ghép giá trị nếu là chuỗi
      }
    }
  };

  concatValues(jsonData);
  return concatenatedString;
};

export const hashObject = (jsonData) => {
  const jsonString = concatJSONStrings(jsonData);
  const hash = ethers.utils.id(jsonString);
  return hash;
};
