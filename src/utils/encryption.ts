import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = '5183666c72eec9e4';

export const encryptText = (text) => {
  const cipher = createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

export const decryptText = (hash) => {
  const decrypt = createDecipheriv(algorithm, secretKey, iv);
  let text = decrypt.update(hash, 'hex', 'utf8');
  text += decrypt.final('utf8');

  return text;
};
