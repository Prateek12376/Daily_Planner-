# Daily Planner - Calendar-Based Todo App

A beautiful, full-stack calendar-based daily planner application built with the MERN stack (MongoDB, Express, React, Node.js). Features user authentication, calendar integration, and dark mode support.

## Features

- 🔐 User Authentication (Login & Registration)
- 📅 Calendar-based Todo Management
- ✅ Create, Read, Update, Delete Todos
- 🎨 Beautiful, Modern UI with Dark Mode
- 📱 Responsive Design
- 🏷️ Priority Levels (Low, Medium, High)
- 📂 Category Support
- ⏰ Date & Time Selection

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router
- React Calendar
- Axios
- Context API for Theme Management

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **View Calendar**: Select a date on the calendar to view todos for that day
4. **Add Todo**: Click "Add Todo" button to create a new todo item
5. **Edit Todo**: Click the edit icon on any todo to modify it
6. **Complete Todo**: Check the checkbox to mark a todo as completed
7. **Delete Todo**: Click the delete icon to remove a todo
8. **Dark Mode**: Toggle dark mode using the moon/sun icon in the header

## Project Structure

```
ToDoListProj/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   └── Dashboard/
│   │   │       ├── Dashboard.js
│   │   │       ├── TodoList.js
│   │   │       ├── TodoForm.js
│   │   │       ├── Dashboard.css
│   │   │       ├── TodoList.css
│   │   │       └── TodoForm.css
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `GET /api/todos/date/:date` - Get todos for a specific date
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

