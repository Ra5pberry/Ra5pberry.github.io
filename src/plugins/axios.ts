import axios from "axios";

const API_KEY = "XFL3yNTPMS93qg2XO4zkHdTAEjCJnD4YDkDpnC2T";

const axios_instance = axios.create();
axios_instance.interceptors.request.use((config) => {
  config.headers = {
    "X-API-KEY": API_KEY,
  };
  return config;
});

export default axios_instance;
