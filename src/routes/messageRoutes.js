// src/routes/messageRoutes.js

const express = require('express');
const { sendMessage, receiveMessages, searchMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/receive/:receiverId', protect, receiveMessages);
router.get('/search', protect, async (req, res) => {
  const { search, sort, order } = req.query;
  try {
    const messages = await searchMessages({
      userId: req.user._id,
      searchUsername: search,
      sortParam: sort,
      sortOrder: order
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
