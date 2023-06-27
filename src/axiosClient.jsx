import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
});

axiosClient.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("TOKEN"));
  config.headers.Authorization = token?.authTokens?.accessToken || "";
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem("TOKEN");
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default axiosClient;
