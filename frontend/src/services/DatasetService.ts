import axios from 'axios';

const BASE_URL = '/api/v1';

export const uploadFile = async (files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await axios.post(`${BASE_URL}/upload-dataset`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};