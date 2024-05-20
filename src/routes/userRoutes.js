const express = require('express');
const {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
} = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route to get user profile
router.get('/:userId', getUserProfile);  

// Route to update user profile
router.put('/:userId', updateUserProfile);

// Route to delete user profile
router.delete('/:userId', deleteUserProfile);

module.exports = router;
