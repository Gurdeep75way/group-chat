# Messaging API

## Overview
This is a RESTful API for a messaging system where users can send messages to individuals or groups.

## Features
- User Authentication
- Send Direct Messages
- Send Group Messages
- Fetch Message History
- User Management

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gurdeep75way/Group-Chat-Task.git
   cd messaging-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server**
   ```bash
   npm start
   ```

---

## API Endpoints

### **User Endpoints**

#### **Create User**
```http
POST /api/user
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "active": true,
  "role": "USER"
}
```

#### **Update User**
```http
PUT /api/user/:id
```
**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

---

### **Messaging Endpoints**

#### **Send a Message**
```http
POST /api/message
```
**Request Body:**
```json
{
  "sender": "65c9b6c9d5e4b27a5f111111",
  "recipient": "65c9b6c9d5e4b27a5f222222",
  "group": "65c9b6c9d5e4b27a5f333333",
  "content": "Hello! How are you?"
}
```

#### **Fetch Messages**
```http
GET /api/message/:conversationId
```

---

## Running in Docker

1. **Build the Docker Image**
   ```bash
   docker build -t messaging-api .
   ```
2. **Run the Container**
   ```bash
   docker run -p 5000:5000 messaging-api
   ```

---

## License
This project is licensed under the MIT License.

