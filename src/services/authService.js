// src/services/authService.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (username, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Hash password and create user document
  const user = await User.create({
    username,
    email,
    password // Ensure password is hashed at the model level or before calling this function
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  registerUser,
  loginUser,
};
