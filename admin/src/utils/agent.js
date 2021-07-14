import axios from "axios";
const { REACT_APP_API_BASE_URL } = process.env;

const agent = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Device-Type": "web",
    Accept: "application/json",
  },
});

agent.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return config;
  }

  if (process.browser) {
    config = {
      ...config,
      headers: { ...config.headers, "x-access-token": `${token}` },
    };
  }

  return config;
});

agent.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.status === 401) {
      localStorage.removeItem("persist:root");
      window.location.href = "/login";
    }
    return Promise.reject(error.response.data);
  }
);

export { agent };
