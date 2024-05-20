const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true
});

// Index to delete the file entry after the expiry time
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('File', fileSchema);
