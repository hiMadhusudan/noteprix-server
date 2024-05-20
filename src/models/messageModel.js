// src/models/messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true }
}, {
  timestamps: true // Includes createdAt and updatedAt automatically
});

messageSchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 }); // MongoDB handles automatic deletion

module.exports = mongoose.model('Message', messageSchema);