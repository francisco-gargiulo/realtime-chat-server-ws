// Import the necessary libraries
const WebSocket = require("ws");
const Redis = require("ioredis");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "s3cr3t";

// Connect to Redis
const redisClient = new Redis();

// Create a WebSocket server
const server = new WebSocket.Server({ port: 3003 });

// Handle new connections
server.on("connection", (socket, req) => {
  // Send all messages from Redis to the new connection
  redisClient.lrange("messages", 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
      return;
    }

    messages.forEach((message) => {
      socket.send(message);
    });
  });

  // Listen for new messages from the connection
  socket.on("message", (data) => {
    try {
      const accessToken = /access_token=([\w.-]+)/.exec(req.url)[1];

      const user = jwt.verify(accessToken, JWT_SECRET);

      const message = JSON.stringify({
        type: "user",
        sub: user.sub,
        nickname: user.nickname,
        message: data.toString(),
        timestamp: Date.now(),
      });

      // Add the message to Redis
      redisClient.rpush("messages", message);

      // Broadcast the message to all connected clients
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  // Handle socket close
  socket.on("close", () => {
    console.log("Connection closed");
  });
});
