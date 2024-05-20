const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', uploadFile);

module.exports = router;
