import React, { useState, useEffect } from 'react';
import './TodoForm.css';
import { useTheme } from '../../context/ThemeContext';

const TodoForm = ({ todo, selectedDate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    date: selectedDate,
  });
  const { darkMode } = useTheme();

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        category: todo.category || 'general',
        date: todo.date ? new Date(todo.date) : selectedDate,
      });
    }
  }, [todo, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: new Date(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    onSave(formData);
  };

  return (
    <div className={`todo-form-overlay ${darkMode ? 'dark' : ''}`}>
      <div className={`todo-form ${darkMode ? 'dark' : ''}`}>
        <h2 className="form-title">{todo ? 'Edit Todo' : 'New Todo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter todo title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter todo description (optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={new Date(formData.date).toISOString().slice(0, 16)}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., work, personal, shopping"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              {todo ? 'Update' : 'Create'} Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

