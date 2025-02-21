const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const BookTransaction = require('../models/bookTransaction.model');

// Protect all librarian routes
router.use(auth, checkRole(['LIBRARIAN']));

// Book management
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Member management
router.get('/members', async (req, res) => {
  try {
    const members = await User.find({ role: 'MEMBER' });
    res.json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/members/deleted', async (req, res) => {
  try {
    const deletedMembers = await User.find({ role: 'MEMBER', isActive: false });
    res.json(deletedMembers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/members/:id', async (req, res) => {
  try {
    const member = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/members/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Member deactivated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Transaction history
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await BookTransaction.find()
      .populate('book')
      .populate('user');
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;