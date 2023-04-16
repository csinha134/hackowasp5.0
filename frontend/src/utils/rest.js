import axios from 'axios';
import { API_BASE_URL, PACKED_NONCE } from '../constants';

export const getAccessToken = async ({
  signature,
  walletPublicKey,
  walletPublicAddress,
}) => {
  try {
    console.log(signature, walletPublicKey, walletPublicAddress);
    const res = await axios.post(
      `${API_BASE_URL}/token`,
      {
        nonce: PACKED_NONCE,
        signature,
        walletPublicKey,
        walletPublicAddress,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return { accessToken: res.data.accessToken, error: null };
  } catch (error) {
    console.log(error);
    return { accessToken: null, error };
  }
};

export const removeAccessToken = async () => {
  const res = await axios.delete(`${API_BASE_URL}/token`, {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export const getContent = async (filename) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/download`,
      {
        // "filename": "rick-roll-rick-ashley.gif"
        filename: filename,
      },
      {
        responseType: 'blob',
        withCredentials: true,
      }
    );
    return { uri: URL.createObjectURL(res.data), error: null };
  } catch (err) {
    return { uri: null, error: err };
  }
};

export const listContents = async () => {
  const res = await axios.post(`${API_BASE_URL}/list`, {
    withCredentials: true,
  });
  return res.data;
};
