const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const messagesStore = require("./storage/messages");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

const userConnections = {};

// Handle WebSocket connections
wss.on("connection", (ws) => {
  let currentUserId = null;

  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === "typing") {
        const { from_user_id, to_user_id } = parsed;

        if (!from_user_id || !to_user_id) {
          return ws.send(
            JSON.stringify({
              error: "Missing from_user_id or to_user_id in typing message",
            })
          );
        }

        if (userConnections[to_user_id]) {
          userConnections[to_user_id].send(
            JSON.stringify({
              type: "typing",
              from_user_id: from_user_id,
            })
          );
        }

        return;
      }

      // Handle user connect
      if (parsed.type === "connect") {
        const userId = parsed.user_id;
        if (!userId || typeof userId !== "string") {
          return ws.send(
            JSON.stringify({ error: "Missing or invalid user_id" })
          );
        }

        currentUserId = userId;
        userConnections[userId] = ws;
        console.log(`User ${userId} connected.`);
        return;
      }

      // Validate chat message
      const { from_user_id, to_user_id, message } = parsed;

      if (
        !from_user_id ||
        !to_user_id ||
        !message ||
        typeof from_user_id !== "string" ||
        typeof to_user_id !== "string" ||
        typeof message !== "string"
      ) {
        return ws.send(
          JSON.stringify({
            error:
              "Invalid message structure. Expected: {from_user_id, to_user_id, message}",
          })
        );
      }

      if (from_user_id === to_user_id) {
        return ws.send(
          JSON.stringify({ error: "Cannot send message to self." })
        );
      }

      const messageObj = messagesStore.addMessage(
        from_user_id,
        to_user_id,
        message
      );

      // Send to recipient if online
      if (userConnections[to_user_id]) {
        userConnections[to_user_id].send(JSON.stringify(messageObj));
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid JSON format." }));
    }
  });

  ws.on("close", () => {
    if (currentUserId) {
      delete userConnections[currentUserId];
      console.log(`User ${currentUserId} disconnected.`);
    }
  });
});

// REST route
const messagesRoute = require("./routes/messages");
app.use("/messages", messagesRoute);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
