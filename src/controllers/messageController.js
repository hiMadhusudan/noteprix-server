// src/controllers/messageController.js

const Message = require('../models/messageModel');

// Function to send a message
exports.sendMessage = async (req, res) => {
  const { receiver, content, expiresAt } = req.body;
  try {
    const newMessage = new Message({
      sender: req.user._id,
      receiver,
      content,
      expiresAt
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully.', messageId: newMessage._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to fetch messages and mark them as read
exports.receiveMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.user._id,
      sender: req.params.receiverId
    }).sort({ createdAt: -1 });

    // Mark messages as read
    const readMessages = messages.map(async (msg) => {
      msg.read = true;
      return await msg.save();
    });

    await Promise.all(readMessages); // Wait for all read updates to complete

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== req.user._id.toString() && message.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this message' });
    }

    await message.remove();
    res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
