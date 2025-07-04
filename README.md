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

#### Start Backend Server

```bash
cd backend
npm install
node server.js
```

---

### 2. **Frontend Setup**

#### Start Angular App

```bash
cd frontend
npm install
ng serve
```

---

## Authentication

- JWT is issued on registration/login and stored in `localStorage`
- Token is automatically added to API requests using an Angular **HttpInterceptor**
- Auto logout occurs on token expiration

---

## Testing

### Frontend (Jasmine + Karma)

```bash
cd frontend
ng test
```

### Backend (Jest)

```bash
cd backend
npm test
```

---

## Port Overview

| Service           | Port  |
| ----------------- | ----- |
| Angular Frontend  | 4200  |
| Express Backend   | 3000  |
| MongoDB (default) | 27017 |

---

## Project Structure

```bash
frontend/
  └── src/
      └── app/
          ├── auth/
          ├── services/
          └── components/

backend/
  ├── models/
  ├── routes/
  ├── middleware/
  │   └── auth.js
  ├── controllers/
  └── server.js

.env
```
