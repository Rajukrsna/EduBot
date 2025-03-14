# **EduBot - AI-Powered Educational Chatbot Platform** 🤖📚

EduBot is an AI-powered educational platform designed to assist students in their learning process. It consists of **three chatbots** to help students with question paper generation, doubt solving, and collaborative group discussions, with AI integrated as a participant.

* * *

## 🚀 **Features**

### **1\. Question Paper Generator Bot**

* *   Users can upload **syllabus** and **sample question papers**.
* *   Uses **Retrieval-Augmented Generation (RAG)** to analyze patterns in the uploaded data.
* *   Generates multiple **question papers** of varying difficulty levels.
* *   Generates **downloadable PDFs**.

### **2\. Doubt Solving Bot**

* *   Users can ask academic questions in different subjects.
* *   AI provides **instant responses**.
* *   Previous chat history can be accessed.

### **3\. Collaborative Group Chat Bot**

* *   Users can create **group discussions**.
* *   Users can **add their friends** to collaborate.
* *   AI is a participant in discussions.
* *   Users can **mention** AI using `@AI`, and it will **analyze** the conversation and provide answers.
* *   Uses **Socket.io** for real-time messaging.

### **4\. Dashboard**

* *   **Tracks user activity** on the platform.
* *   Shows **statistics** on question paper generation, doubt-solving, and chat participation.

* * *

# 📌 API Endpoints Documentation 📡

## Authentication Routes

| **Endpoint**                 | **Method** | **Description**                                 | **Request Body** |
|------------------------------|-----------|-------------------------------------------------|------------------|
| `/authRoute/register`        | **POST**   | Register a new user.                            | `{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }` |
| `/authRoute/login`           | **POST**   | Log in an existing user and receive a JWT token. | `{ "email": "user@example.com", "password": "yourpassword" }` |
| `/authRoute/me`              | **GET**    | Fetch details of the currently logged-in user.  | Requires `Authorization` token in headers. |

---

## **Collaborative Group Chat Bot Routes**

| **Endpoint**                         | **Method** | **Description**                                  | **Request Body** |
|--------------------------------------|-----------|------------------------------------------------|------------------|
| `/collaborative/create`              | **POST**   | Create a new group with participants.         | `{ "name": "Group Name", "participantNames": ["user1", "user2"], "creatorId": "userId" }` |
| `/collaborative/my-groups/:userId`   | **GET**    | Fetch all groups the user is part of.         | Requires `userId` as URL parameter |
| `/collaborative/messages/:groupId`   | **GET**    | Fetch all messages in a specific group chat.  | Requires `groupId` as URL parameter |
| `/collaborative/send`                 | **POST**   | Send a message to the group chat. If `@AI` is mentioned, AI will respond. | `{ "groupId": "groupId", "userId": "userId", "text": "message content" }` |

---

## **Doubt Solver Bot Routes**

| **Endpoint**                  | **Method** | **Description**                                   | **Request Body** |
|--------------------------------|-----------|-------------------------------------------------|------------------|
| `/doubtBot/chat`               | **POST**   | Ask AI a question and receive a response.       | `{ "sessionId": "sessionId", "message": "user question" }` |
| `/doubtBot/history`            | **GET**    | Get previous conversations history.             | No request body required |
| `/doubtBot/chat/:sessionId`    | **GET**    | Get all chat messages of a specific session.   | Requires `sessionId` as a URL parameter |

---

## **Question Paper Generator Routes**

| **Endpoint**                   | **Method** | **Description**                                  | **Request Body** |
|--------------------------------|-----------|------------------------------------------------|------------------|
| `/extractText/extract`         | **POST**   | Extract text and pattern from uploaded PDFs (syllabus & sample QP). | `{ "syllabusText": "syllabus content", "previousQPText": "previous question paper content" }` |
| `/generatePdf/generate`        | **POST**   | Generate a formatted question paper in PDF based on extracted pattern and syllabus. | `{ "difficulty": "easy/medium/hard", "syllabusText": "syllabus content", "previousQPText": "previous question paper content" }` |
| `/generatePdf/download/:fileName` | **GET**    | Download the generated question paper as a PDF. | Requires `fileName` as a URL parameter |

---

## **WebSocket (Socket.IO) Routes for Real-time Messaging**

| **Event Name**      | **Description**                                   | **Payload** |
|---------------------|---------------------------------------------------|-------------|
| `joinGroup`        | User joins a specific group chat room.            | `{ "groupId": "groupId" }` |
| `sendMessage`      | Sends a message to a group chat.                   | `{ "groupId": "groupId", "sender": { "_id": "userId", "name": "User" }, "text": "message content", "time": "timestamp" }` |
| `receiveMessage`   | Listens for incoming messages from other users.    | `{ "groupId": "groupId", "sender": { "_id": "userId", "name": "User" }, "text": "message content", "time": "timestamp" }` |

---

## **Deployment Details** 🚀

- **Frontend**: Deployed on [Vercel](https://vercel.com/)
- **Backend**: Deployed on [Render](https://render.com/)
- **Database**: MongoDB Atlas (Cloud Database)

### **Tech Stack**
- **Frontend**: React.js (Create React App) with **MUI**
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB + Mongoose
- **AI Model**: Gemini (via `@google/generative-ai`)
- **WebSockets**: Socket.io (for real-time group chat)
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Authentication**: JWT-based authentication
- **Question Paper PDF Generation**: PDFKit
- **PDF Text Extraction**: `pdf-parse` library

==========================================

**🛠 Prerequisites**
--------------------

Make sure you have the following installed:

-   **[Node.js](https://nodejs.org/) (LTS version recommended)**
-   **[Git](https://git-scm.com/)**
-   **MongoDB Atlas** (or MongoDB installed locally)

* * * * *

**🔹 Steps to Run the Project Locally**
---------------------------------------

### **1️ Clone the Repository**

`  git clone https://github.com/Rajukrsna/EduBot.git`
  `cd EduBot`
==========================================
* * * * *

### **2️ Backend Setup**

1.  **Navigate to the backend folder:**

    `cd backend`

2.  **Install dependencies**

    `npm install`

3.  **Set Up Environment Variables**\
    Create a `.env` file inside the `backend` folder and add the following:

   ` PORT=5000`
    `MONGO_URI=your_mongodb_connection_string`
    `JWT_SECRET=your_jwt_secret_key`
==========================================
4.  **Run the Backend Server**

    `node index.js`

* * * * *

### **3 Run the Frontend (React)**

1.  **Open another terminal and navigate to the frontend folder:**

    `cd ../edubot`

2.  **Install dependencies:**

    `npm install`

3.  **Set up environment variables**\
    Create a `.env` file inside the `edubot/` folder and add:

    `REACT_APP_BACKEND_URL=http://localhost:5000`

4.  **Start the frontend development server:**

    `npm start`

    
    We are excited to have you contribute to **EduBot**, an AI-powered study assistant for students! 🎓🚀  

