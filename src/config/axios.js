import axios from "axios";
import localStorageService from "../services/localStorageService";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    if (localStorageService.getToken())
      config.headers.authorization = `Bearer ${localStorageService.getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      localStorageService.clearToken();

      window.location.assign("/");
      //refreshหน้าเวบไปที่pathนั้น
      return; //ไม่สามารถใช้ historyได้เพราะ ในนี้ไม่ใช่ component ไม่ใช่ react
    }
    return Promise.reject(err);
  }
);

export default axios;
