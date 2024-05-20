// src/routes/fileRoutes.js

const express = require('express');
const multer = require('multer');
const { sendFile, receiveFiles } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/send', protect, upload.single('file'), sendFile);
router.get('/receive/:receiverId', protect, receiveFiles);

module.exports = router;
