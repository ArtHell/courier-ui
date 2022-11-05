import axios from "axios";

export const testApi = async () => {
  const result = await axios.get('https://courier-api-gray.vercel.app/');
  return result;
}