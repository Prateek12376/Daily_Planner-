import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useTheme } from '../../context/ThemeContext';
import api from '../../utils/api';
import './Dashboard.css';

const Dashboard = ({ setIsAuthenticated }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchTodos();
  }, [selectedDate]); // clean & error-free

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const localMidnight = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0, 0, 0, 0
      ).getTime();

      const response = await api.get(`/todos/date/${localMidnight}`);
      setTodos(response.data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleAddTodo = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleSaveTodo = async (todoData) => {
    try {
      if (editingTodo) {
        await api.put(`/todos/${editingTodo._id}`, todoData);
      } else {
        const payload = {
          ...todoData,
          date: todoData?.date ? new Date(todoData.date) : new Date(selectedDate)
        };
        await api.post('/todos', payload);
      }

      fetchTodos();
      setShowForm(false);
      setEditingTodo(null);

    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Failed to save todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await api.delete(`/todos/${id}`);
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Daily Planner</h1>

          <div className="header-actions">
            <span className="username">Welcome, {user?.username || 'User'}</span>

            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">

        {/* Calendar Section */}
        <aside className="calendar-section">
          <div className="calendar-wrapper glass-card">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className={darkMode ? 'dark-calendar' : ''}
            />

            <button className="add-todo-cta" onClick={handleAddTodo}>
              + Add Todo
            </button>
          </div>
        </aside>

        {/* Todos Section */}
        <main className="todos-section glass-card">

          <div className="todos-top">
            <h2 className="section-title">
              Todos for {selectedDate.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>

            <button className="btn-small" onClick={() => setSelectedDate(new Date())}>
              Today
            </button>
          </div>

          {showForm && (
            <TodoForm
              todo={editingTodo}
              selectedDate={selectedDate}
              onSave={handleSaveTodo}
              onCancel={() => {
                setShowForm(false);
                setEditingTodo(null);
              }}
            />
          )}

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : (
            <TodoList
              todos={todos}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
