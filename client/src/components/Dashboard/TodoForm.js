import React, { useState, useEffect } from 'react';
import './TodoForm.css';

/**
 * Props:
 *  - todo (object|null) for editing
 *  - selectedDate (Date)
 *  - onSave(todoData) -> handles create/update
 *  - onCancel()
 */
const TodoForm = ({ todo = null, selectedDate, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    date: selectedDate
      ? new Date(selectedDate).toISOString().slice(0, 16)
      : '',
  });

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        category: todo.category || 'general',
        date: todo.date
          ? new Date(todo.date).toISOString().slice(0, 16)
          : selectedDate
          ? new Date(selectedDate).toISOString().slice(0, 16)
          : '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        priority: 'medium',
        category: 'general',
        date: selectedDate
          ? new Date(selectedDate).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [todo, selectedDate]); // <-- clean, no error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }

    const payload = {
      ...form,
      date: form.date
        ? new Date(form.date).toISOString()
        : new Date(selectedDate).toISOString(),
    };

    onSave(payload);
  };

  return (
    <div className="todoform-wrap">
      <form className="todoform" onSubmit={submit}>
        <div className="todoform-row">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What do you want to do?"
          />
        </div>

        <div className="todoform-row">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Details (optional)"
            rows="3"
          />
        </div>

        <div className="todoform-row split">
          <div>
            <label>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="todoform-row">
          <label>When</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="todoform-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-save">
            {todo ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
