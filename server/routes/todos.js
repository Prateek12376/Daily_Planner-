const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all todos for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ date: 1, createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get todos for a specific date
router.get('/date/:date', auth, async (req, res) => {
  try {
    const raw = req.params.date;
    const requestedDate = /^\d+$/.test(raw) ? new Date(Number(raw)) : new Date(raw);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date parameter' });
    }

    // Compute start/end of local day without mutating the same Date instance
    const startOfDay = new Date(
      requestedDate.getFullYear(),
      requestedDate.getMonth(),
      requestedDate.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      requestedDate.getFullYear(),
      requestedDate.getMonth(),
      requestedDate.getDate(),
      23,
      59,
      59,
      999
    );

    const todos = await Todo.find({
      user: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    console.error('GET /api/todos/date error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, priority, category } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date value' });
    }

    const todo = new Todo({
      user: req.user._id,
      title,
      description: description || '',
      date: parsedDate,
      priority: priority || 'medium',
      category: category || 'general'
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error('POST /api/todos error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, date, completed, priority, category } = req.body;

    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (date) todo.date = new Date(date);
    if (completed !== undefined) todo.completed = completed;
    if (priority) todo.priority = priority;
    if (category) todo.category = category;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

