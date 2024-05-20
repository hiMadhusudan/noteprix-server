// server.js

const http = require('http');
const app = require('./app'); // Import the Express application

const PORT = process.env.PORT || 5000; // Set the port

const server = http.createServer(app); // Create HTTP server with Express app

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
