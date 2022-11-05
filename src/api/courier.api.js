import axios from "axios";

const baseURL = 'https://courier-api-ktx6.vercel.app/';

export const testApi = async () => {
  const result = await axios.get(baseURL);
  return result;
}

export const getOrder = async (id) => {
  let result = {};
  try {
    result = await axios.get(`${baseURL}orders/${id}`);
    console.log(result);
  } catch {
    result = {};
  }
  finally {
    return result.data;
  }
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
  let result = null;
  try {
    result = await axios.put(`${baseURL}orders/${id}`, payload);
    console.log(result);
  } catch {
  }
  finally {
    return result && result.data;
  }
}

export const deliverOrder = async (id) => {
  let result = null;
  try {
    result = await axios.post(`${baseURL}orders/${id}`);
    console.log(result);
  } catch {
  }
  finally {
    return result && result.data;
  }
}