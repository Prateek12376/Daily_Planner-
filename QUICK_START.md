# Quick Start Guide

## Option 1: Using the PowerShell Script (Easiest)

Simply run:
```powershell
.\start.ps1
```

This will:
- Create the `.env` file automatically
- Start both backend and frontend servers in separate windows

## Option 2: Manual Start

### 1. Create Server Environment File

Create `server/.env` with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 2. Start Backend Server

```powershell
cd server
npm run dev
```

### 3. Start Frontend Client (in a new terminal)

```powershell
cd client
npm start
```

## MongoDB Setup

### Local MongoDB
- Install MongoDB Community Edition
- Start MongoDB service
- Default connection: `mongodb://localhost:27017/todolist`

### MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `server/.env`

## Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## First Steps

1. Register a new account
2. Login with your credentials
3. Select a date on the calendar
4. Click "Add Todo" to create your first todo
5. Toggle dark mode using the moon/sun icon

Enjoy your Daily Planner app! 🎉

