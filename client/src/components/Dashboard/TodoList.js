import React from 'react';
import './TodoList.css';

/**
 * Props:
 *  - todos: array
 *  - onEdit(todo)
 *  - onDelete(id)
 *  - onToggleComplete(todo)
 */
const TodoList = ({ todos = [], onEdit, onDelete, onToggleComplete }) => {
  if (!todos || todos.length === 0) {
    return <div className="todo-empty">No todos for this date. Click "Add Todo" to create one!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((t) => (
        <article key={t._id} className={`todo-card ${t.completed ? 'completed' : ''}`}>
          <div className="todo-main">
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={!!t.completed}
              onChange={() => onToggleComplete(t)}
              aria-label={`Mark ${t.title} complete`}
            />
            <div className="todo-content">
              <h3 className="todo-title">{t.title}</h3>
              {t.description && <p className="todo-desc">{t.description}</p>}
              <div className="todo-meta">
                <span className="chip priority">{t.priority || 'medium'}</span>
                <span className="chip category">{t.category || 'general'}</span>
                <time className="todo-time">{new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              </div>
            </div>
          </div>

          <div className="todo-actions">
            <button className="icon-btn edit" onClick={() => onEdit(t)} aria-label="Edit todo">✏️</button>
            <button className="icon-btn delete" onClick={() => onDelete(t._id)} aria-label="Delete todo">🗑️</button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TodoList;
