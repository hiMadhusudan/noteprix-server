// src/controllers/fileController.js

const File = require('../models/fileModel');

// Send a file
exports.sendFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const { receiver } = req.body;
    const newFile = await File.create({
      sender: req.user.id,
      receiver,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size
    });
    res.status(201).json({ message: 'File sent successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Receive files
exports.receiveFiles = async (req, res) => {
  try {
    const files = await File.find({ receiver: req.user.id, sender: req.params.receiverId });
    if (!files) {
      return res.status(404).json({ message: 'No files found' });
    }
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
