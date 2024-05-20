const File = require('../models/fileModel');
const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage }).single('file');

// Controller to handle file upload
exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
      const newFile = await File.create({
        filePath: req.file.path,
        expiresAt: new Date(req.body.expiresAt)
      });
      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
