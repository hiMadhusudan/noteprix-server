// src/config/webAuthnConfig.js

const baseOptions = {
    rpName: "Noteprix",
    rpID: "localhost", // Change this to your domain in production
    origin: `http://localhost:3000`, // Change this to your domain in production
    challengeSize: 64,
    attestation: 'direct',
    authenticatorSelection: {
      userVerification: "preferred"
    },
  };
  
  module.exports = {
    baseOptions
  };
  