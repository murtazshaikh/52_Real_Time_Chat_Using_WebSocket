
# 📬 Simplified Real-Time Chat System

This is a basic real-time chat server built using **Node.js**, **Express**, and **WebSocket** (`ws`). It allows real-time messaging between users along with RESTful access to chat history and conversation lists — all stored in-memory.

---

## 🚀 Features Implemented

### ✅ Core Features
- Real-time messaging using WebSockets
- REST API to retrieve message history between two users
- In-memory message storage (no database required)

### ✅ Edge Case Handling
- Invalid JSON format
- Missing required fields
- Self-messaging prevention
- Graceful handling of disconnected users

### ✅ Bonus Features
- **Typing indicator**: WebSocket-based "user is typing..." notification
- **Conversation list**: `GET /messages/conversations/:user_id` returns recent chats

---

## 📁 Folder Structure

```
real-time-chat/
├── server.js
├── routes/
│   └── messages.js
├── storage/
│   └── messages.js
└── package.json
```

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/murtazshaikh/52_Real_Time_Chat_Using_WebSocket.git
cd 52_Real_Time_Chat_Using_WebSocket
npm install
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 📡 WebSocket Usage

### 🔌 Connect WebSocket:
```
ws://localhost:3000
```

### ✅ Register User
```json
{ "type": "connect", "user_id": "user1" }
```

### 💬 Send Message
```json
{
  "from_user_id": "user1",
  "to_user_id": "user2",
  "message": "Hello!"
}
```

### ✍️ Typing Notification
```json
{
  "type": "typing",
  "from_user_id": "user1",
  "to_user_id": "user2"
}
```

---

## 🌐 REST API Endpoints

### 1. Get Chat History
```
GET /messages/:user1_id/:user2_id
```

### 2. Get All Conversations for User
```
GET /messages/conversations/:user_id
```

---

## 🧪 Manual Testing Performed

- Tested WebSocket and REST using Postman
- Verified real-time delivery
- Checked invalid payloads, self-messaging block, and offline recipient handling
- Validated typing notifications and conversation history

---

## 🧼 Notes

- Messages are stored in-memory — restarting the server clears history
- No authentication is implemented (as per test instructions)
- This code is intended for demo/testing purposes only

---

Made with love ❤️
