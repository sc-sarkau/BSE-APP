# BSE MEAN Stack Application

This is a full-stack application built using **MongoDB**, **Express.js**, **Angular**, and **Node.js**. The app includes user authentication via JWT, a structured Angular frontend, and a secure backend with real-time features and MongoDB persistence.

---

## Features

- JWT-based authentication (register, login, auto logout)
- Angular frontend with routing and services
- Node + Express backend with protected API routes
- MongoDB integration via Mongoose
- Real-time support (e.g., Socket.IO integration)
- Unit testing with Jasmine (Angular) and Jest (Node)

---

## Tech Stack

- **Frontend**: Angular 17+
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (local)
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jasmine/Karma (Angular), Jest (Node)
- **Realtime**: Socket.IO (optional)

---

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (running locally or MongoDB Atlas URL)

---

## Environment Setup

### 1. **Backend Setup**

#### 📁 `backend/.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sensexdb
JWT_SECRET=<secret-key>
```
