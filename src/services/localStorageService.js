//สร้าง service แยก token เพราะมีการใช้หลายที่เหมือน ENV.
const tokenName = "token";
const setToken = (token) => localStorage.setItem(tokenName, token);
const getToken = () => localStorage.getItem(tokenName || "") || {}; //have token =true
const clearToken = () => localStorage.removeItem(tokenName);

export default {
  setToken,
  getToken,
  clearToken,
};
