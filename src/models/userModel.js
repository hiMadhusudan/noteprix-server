// src/models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure secure password handling
  // WebAuthn credentials as an example, adjust based on actual use
  webAuthnCredentials: [{
    credentialID: Buffer,
    credentialPublicKey: Buffer,
    counter: { type: Number, required: true }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('User', userSchema);
