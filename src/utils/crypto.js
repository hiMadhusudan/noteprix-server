// src/utils/crypto.js

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // Symmetric cipher
const secretKey = process.env.CRYPTO_SECRET; // Ensure this is 32 bytes for aes-256-cbc
const iv = crypto.randomBytes(16);

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};

exports.decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(hash.iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(hash.content, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};