// src/models/fileModel.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true } // Size in bytes
}, {
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
