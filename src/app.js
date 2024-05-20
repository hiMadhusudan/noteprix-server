// src/app.js

const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const fileRoutes = require('./routes/fileRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Noteprix Server is up and running!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/files', fileRoutes);

// Use the error handler middleware
app.use(errorHandler);

module.exports = app;
