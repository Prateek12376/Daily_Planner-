import React from 'react';
import './TodoList.css';
import { useTheme } from '../../context/ThemeContext';

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  const { darkMode } = useTheme();

  if (todos.length === 0) {
    return (
      <div className={`empty-state ${darkMode ? 'dark' : ''}`}>
        <p>No todos for this date. Click "Add Todo" to create one!</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e53e3e';
      case 'medium':
        return '#ed8936';
      case 'low':
        return '#38a169';
      default:
        return '#718096';
    }
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`todo-item ${todo.completed ? 'completed' : ''} ${darkMode ? 'dark' : ''}`}
        >
          <div className="todo-content">
            <div className="todo-checkbox-wrapper">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo)}
                className="todo-checkbox"
              />
            </div>
            <div className="todo-details">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <div className="todo-meta">
                <span
                  className="todo-priority"
                  style={{ color: getPriorityColor(todo.priority) }}
                >
                  {todo.priority.toUpperCase()}
                </span>
                {todo.category && (
                  <span className="todo-category">{todo.category}</span>
                )}
                <span className="todo-time">
                  {new Date(todo.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="todo-actions">
            <button
              className="todo-action-button edit"
              onClick={() => onEdit(todo)}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="todo-action-button delete"
              onClick={() => onDelete(todo._id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

