// src/services/messageService.js

const Message = require('../models/messageModel');

// Function to search, sort, and filter messages
exports.searchMessages = async (options) => {
  const { userId, searchUsername, sortParam, sortOrder } = options;
  const query = Message.find({
    $or: [
      { sender: userId },
      { receiver: userId }
    ]
  });

  if (searchUsername) {
    query.where({ username: searchUsername });
  }

  query.sort({ [sortParam]: sortOrder });

  return await query.exec();
};
