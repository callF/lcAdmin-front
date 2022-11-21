import CryptoJS from 'crypto-js';

export const CryptoByBase64 = (str: string) => {
  const utf8 = CryptoJS.enc.Utf8.parse(str);
  return CryptoJS.enc.Base64.stringify(utf8);
};
