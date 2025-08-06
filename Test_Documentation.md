
# ✅ Test Documentation – Simplified Real-Time Chat System

This document outlines the manual and functional testing approach taken for the real-time chat system built using Node.js, Express, and WebSocket.

---

## 🧪 Testing Strategy

### ✔️ 1. Manual Testing
Used **Postman** and **WebSocket clients** to test all key functionalities:

- WebSocket connection and message delivery
- REST API responses
- Typing indicators
- Edge case handling

---

## 🔁 Test Cases

### ✅ WebSocket Messaging
| Test Case | Input | Expected Output |
|-----------|-------|------------------|
| Connect user | `{ "type": "connect", "user_id": "user1" }` | User is registered and ready to receive/send |
| Send message to online user | `{ "from_user_id": "user1", "to_user_id": "user2", "message": "Hi" }` | Message is delivered to `user2` immediately |
| Send message to offline user | Same as above but `user2` is not connected | No error; message stored in memory |

---

### ✅ REST API Tests
| Endpoint | Test | Expected |
|----------|------|----------|
| `/messages/user1/user2` | Retrieve chat history | Returns all messages in correct order |
| `/messages/conversations/user1` | Get all conversations | Returns recent chats with last message and timestamp |

---

### ❗ Edge Case Handling
| Case | Input | Expected Result |
|------|-------|------------------|
| Invalid JSON | `{ from_user_id: "user1", message: "oops" }` | `error: Invalid JSON format` |
| Missing field | `{ "from_user_id": "user1", "message": "hi" }` | `error: Invalid message structure` |
| Send to self | `{ "from_user_id": "user1", "to_user_id": "user1", "message": "hi" }` | `error: Cannot send message to self` |

---

### ✍️ Typing Indicator
| Test Case | Input | Expected Output |
|-----------|-------|------------------|
| Typing event | `{ "type": "typing", "from_user_id": "user1", "to_user_id": "user2" }` | `user2` receives typing notification |

---

## 🧼 Notes

- All tests passed in a controlled Postman/WebSocket environment.
- Data resets on server restart due to in-memory storage.

