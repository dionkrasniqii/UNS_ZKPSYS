import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;
function Encrypt(data) {
  const encryptedObj = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedObj;
}
function Decrypt(data) {
  const decryptedObj = CryptoJS.AES.decrypt(data, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedObj;
}
export default {
  Encrypt,
  Decrypt,
};
