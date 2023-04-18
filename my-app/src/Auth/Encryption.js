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
function Encrypt2(plaintext, key) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });
  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}
function encryptObjectsArray(objectsArray) {
  // Convert the array of objects to a string
  const stringifiedArray = JSON.stringify(objectsArray);

  // Encrypt the string using the encryption key
  const encryptedString = Encrypt2(stringifiedArray, secretKey);

  // Return the encrypted string as an array
  return [encryptedString];
}

export default {
  Encrypt,
  Decrypt,
  Encrypt2,
  encryptObjectsArray,
};
