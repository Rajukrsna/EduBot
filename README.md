Paste your rich text content here. Yo

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

## 🛠️ **Tech Stack**

* *   **Frontend:** React.js, Material-UI
* *   **Backend:** Express.js, Node.js
* *   **Database:** MongoDB (Mongoose ODM)
* *   **Real-Time Communication:** Socket.io
* *   **AI Model:** Google Gemini API (via RAG for pattern analysis)
* *   **Deployment:** Vercel (Frontend), Render (Backend)
* *   **Authentication:** JSON Web Tokens (JWT)

* * *

## 🔗 **APIs Used**

Endpoint

Method

Description

Request Format

Response Format

`/authRoute/register`

**POST**

Register a new user.

`{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }`

`{ "message": "User registered" }`

`/authRoute/login`

**POST**

Logs in an existing user and returns a JWT token.

`{ "email": "user@example.com", "password": "yourpassword" }`

`{ "token": "your_jwt_token", "userId": "user_id", "name": "User's Name" }`

`/authRoute/me`

**GET**

Fetches the logged-in user's details.

Headers: `{ Authorization: "Bearer <your_jwt_token>" }`

`{ "name": "User's Name", "id": "user_id", "email": "user@example.com" }`

`/collaborative/create`

**POST**

Creates a **new group** with participants.

`{ "name": "group name", "participantNames": ["friend1", "friend2"], "creatorId": "user_id" }`

`{ "group": { "_id": "group_id", "name": "group name", "participants": [...] } }`

`/collaborative/my-groups/:userId`

**GET**

Fetches all **groups** of the logged-in user.

N/A

`{ "groups": [{ "_id": "group_id", "name": "group name", "participants": [...] }] }`

`/collaborative/messages/:groupId`

**GET**

Fetches **chat messages** for a selected group.

N/A

`[ { "_id": "msg_id", "sender": { "_id": "user_id", "name": "User" }, "text": "message", "time": "timestamp" } ]`

`/collaborative/send`

**POST**

Sends a **message** to a group chat. AI will respond if mentioned.

`{ "groupId": "group_id", "userId": "user_id", "text": "message" }`

`{ "aiResponse": "AI generated response", "aiChat": { "_id": "msg_id", "sender": { "_id": "ai_user_id", "name": "AI" }, "text": "response" } }`

`/doubtBot/chat`

**POST**

Sends a doubt and gets AI's answer.

`{ "sessionId": "session_id", "message": "doubt" }`

`{ "answer": "AI response" }`

`/doubtBot/history`

**GET**

Fetches previous **doubt-solving chat history**.

N/A

`[ { sessionId: "session_id", messages: [...] } ]`

`/doubtBot/chat/:sessionId`

**GET**

Fetches **messages from the specific doubt session**.

N/A

`{ "messages": [{ "sender": "user/AI", "text": "message", "time": "timestamp" }] }`

`/extractText/extract`

**POST**

Extracts text from uploaded **syllabus or sample question paper PDF**.

`{ file: uploaded_pdf_file }`

`{ "text": "Extracted syllabus or sample questions" }`

`/generatePdf/generate`

**POST**

**Generates a question paper PDF** using AI from the extracted syllabus and samples.

`{ syllabus: "text", samples: ["sample QP text"], difficulty: "easy/medium/hard" }`

`{ "file": "generated_qp.pdf" }`

`/generatePdf/download/:file`

**GET**

Downloads the **generated question paper PDF**.

N/A

File Download

`/generatePdf/upload`

**POST**

**Uploads syllabus & sample question paper** PDFs for extraction.

`{ file: uploaded_pdf_file }`

`{ "message": "File uploaded", "fileUrl": "file_path" }`

* * *

## ⚙ Backend Deployment (Node.js on Render)

Your backend is a **Node.js Express server** that includes API routes and WebSocket support for real-time communication.

### **Steps to Deploy Backend on Render**

1. 1.  **Push your `backend` folder to GitHub**:
1.     
1.     sh
1.     
1.     CopyEdit
1.     
1.     `cd D:/EduBot/backend git init git add . git commit -m "Initial commit for backend" git branch -M main git remote add origin https://github.com/Rajukrsna/EduBot-Backend.git git push -u origin main`
1.     
1. 2.  **Deploy on Render**:
1.     
1.     * *   Go to [Render](https://render.com/).
1.     * *   Click on **"New"** → **"Web Service"**.
1.     * *   Connect your GitHub and select your `backend` repository (`EduBot`).
1.     * *   Choose **Node.js** as the runtime.
1.     * *   Set the **Build Command**:
1.     *     
1.     *     nginx
1.     *     
1.     *     CopyEdit
1.     *     
1.     *     `npm install`
1.     *     
1.     * *   Set the **Start Command** to:
1.     *     
1.     *     nginx
1.     *     
1.     *     CopyEdit
1.     *     
1.     *     `node server.js`
1.     *     
1.     * *   Under **"Environment Variables"**, add:* *   `JWT_SECRET`: Your JWT secret key.
1.     *     * *   `MONGO_URI`: Your MongoDB connection string.
1.     * *   Click **"Deploy"**.

* * *

## 🛠 Tech Stack

* *   **Frontend**: React.js (Material UI, React Router, ReactMarkdown, Axios)
* *   **Backend**: Express.js, Node.js
* *   **Database**: MongoDB (Mongoose)
* *   **AI Model**: Google Gemini AI
* *   **Real-time Communication**: Socket.io
* *   **Deployment**: Vercel (Frontend) & Render (Backend)
* *   **Cloud Services**: Vultr (for potential hosting)u can paste directly from Word or other rich text sources.
