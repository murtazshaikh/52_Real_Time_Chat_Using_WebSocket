const messages = [];

function addMessage(from_user_id, to_user_id, message) {
  const timestamp = new Date().toISOString();
  const msg = { from_user_id, to_user_id, message, timestamp };
  messages.push(msg);
  return msg;
}

function getChatHistory(user1, user2) {
  return messages
    .filter(
      (m) =>
        (m.from_user_id === user1 && m.to_user_id === user2) ||
        (m.from_user_id === user2 && m.to_user_id === user1)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

function getConversations(userId) {
  const conversations = {};

  messages.forEach((msg) => {
    if (msg.from_user_id === userId || msg.to_user_id === userId) {
      const otherUser =
        msg.from_user_id === userId ? msg.to_user_id : msg.from_user_id;

      if (
        !conversations[otherUser] ||
        new Date(msg.timestamp) > new Date(conversations[otherUser].timestamp)
      ) {
        conversations[otherUser] = {
          user_id: otherUser,
          last_message: msg.message,
          timestamp: msg.timestamp,
        };
      }
    }
  });

  return Object.values(conversations).sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}


module.exports = {
  addMessage,
  getChatHistory,
  getConversations,
};
