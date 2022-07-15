import axios from 'axios';

// TODO: take this params from env variables
const WEB_SERVER_PORT = 5000;
const WEB_SERVER_BASE_URL = `http://localhost:${WEB_SERVER_PORT}`;

function addResponseMiddlewares(axiosInstance) {
  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      error.message = errorMessage; // override error message with server error message if exists
      return Promise.reject(error);
    },
  );
}

let instance = null;
export default (function () {
  if (instance) return instance;
  instance = axios.create({
    baseURL: WEB_SERVER_BASE_URL,
  });

  addResponseMiddlewares(instance);
  return instance;
})();
