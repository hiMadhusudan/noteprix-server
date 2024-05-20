// src/routes/userRoutes.js

const express = require('express');
const { register, login, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', protect, updateUserProfile); // Protect the route
router.delete('/profile', protect, deleteUserProfile); // Protect the route

module.exports = router;
