# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher) installed
- MongoDB running locally or MongoDB Atlas account

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# Add the following content:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Start the server
npm run dev
```

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# (Optional) Create .env file for custom API URL
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React app
npm start
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/todolist`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in server/.env file

## Troubleshooting

### Port Already in Use
- Change PORT in server/.env file
- Update REACT_APP_API_URL in client/.env if needed

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env file
- Verify network/firewall settings

### CORS Errors
- Ensure backend is running on port 5000
- Check API URL in client configuration

## Default Features

✅ User Registration & Login
✅ JWT Authentication
✅ Calendar-based Todo Management
✅ Dark Mode Toggle
✅ Responsive Design
✅ Priority Levels
✅ Category Support

