const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const BookTransaction = require('../models/bookTransaction.model');

router.use(auth, checkRole(['MEMBER']));


router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({ status: 'AVAILABLE' });
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/books/:id/borrow', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.status === 'BORROWED') {
      throw new Error('Book not available');
    }

    book.status = 'BORROWED';
    await book.save();

    const transaction = new BookTransaction({
      book: book._id,
      user: req.user._id,
      type: 'BORROW'
    });
    await transaction.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/books/:id/return', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.status === 'AVAILABLE') {
      throw new Error('Invalid return request');
    }

    book.status = 'AVAILABLE';
    await book.save();

    const transaction = new BookTransaction({
      book: book._id,
      user: req.user._id,
      type: 'RETURN'
    });
    await transaction.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await BookTransaction.find({ user: req.user._id })
      .populate('book');
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/account', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;