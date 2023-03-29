# Realtime Chat Microservice

This microservice provides real-time chat functionality using WebSockets and Redis as a message store.

## Features

- WebSocket server for real-time chat communication
- Publish and subscribe to chat messages via Redis
- Store and retrieve chat messages from Redis stream
- Broadcast messages to all connected clients

## Dependencies

- [Node.js](https://nodejs.org/)
- [ws](https://www.npmjs.com/package/ws) - WebSocket library for Node.js
- [ioredis](https://www.npmjs.com/package/ioredis) - A robust, performance-focused, and full-featured Redis client for Node.js

## Installation

1. Install Node.js.
2. Clone or download this repository.
3. Navigate to the project directory.
4. Run `npm install` to install the required dependencies.

## Running the Microservice

To start the chat microservice, run the following command in the project directory:

```bash
node index.js
```

The WebSocket server will start listening on port 3000.

## Usage

To utilize the chat microservice, establish a connection to the WebSocket server at `ws://localhost:3000` using a client. Clients can exchange messages through the WebSocket connection.

Upon connecting, new clients will receive all previously stored messages from the Redis stream. When a client submits a message, it will be broadcasted to all connected clients and stored in the Redis stream.

## Example Client

Below is an example of a simple HTML client that can be used to interact with the chat microservice.

```html
<script>
  const socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    console.log("Connected to server");
  };

  socket.onmessage = (message) => {
    console.log(message);
  };

  socket.onclose = () => {
    console.log("Disconnected from server");
  };

  function sendMessage(message) {
    socket.send(message);
  }
</script>
```

## License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
