import axios from "axios";

const baseURL = 'https://courier-api-ktx6.vercel.app/';

export const testApi = async () => {
  const result = await axios.get(baseURL);
  return result;
}

export const getOrder = async (payload) => {
  const result = await axios.post(`${baseURL}orders/`, payload);
  return result || { code: 'randomHash' };
}

export const createOrder = async (payload) => {
  let result = {};
  try {
    result = await axios.post(`${baseURL}orders/`, payload);
    console.log(result);
  } catch {
    result = { data: { token: 'randomHash' } };
  }
  finally {
    return result.data;
  }
}

export const addBuyerInfo = async (id, payload) => {
  const result = await axios.put(`${baseURL}orders/${id}`, payload);
  return result || {};
}