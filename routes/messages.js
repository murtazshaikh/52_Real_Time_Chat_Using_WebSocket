const express = require("express");
const router = express.Router();
const messagesStore = require("../storage/messages");

router.get("/conversations/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const conversations = messagesStore.getConversations(userId);

  res.json(conversations);
});

router.get("/:user1/:user2", (req, res) => {
  const { user1, user2 } = req.params;
  const chat = messagesStore.getChatHistory(user1, user2);
  res.json(chat);
});

module.exports = router;
