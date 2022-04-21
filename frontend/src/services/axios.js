import axios from 'axios';

// TODO: take this params from env variables
const WEB_SERVER_PORT = 5000;
const WEB_SERVER_BASE_URL = `http://localhost:${WEB_SERVER_PORT}`;

let instance = null;
export default (function () {
  if (instance) return instance;
  instance = axios.create({ baseURL: WEB_SERVER_BASE_URL });
  return instance;
})();
