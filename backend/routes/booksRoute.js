const express = require('express');
const Book = require('../models/bookModel.js');
const HttpError = require('../models/httpError.js');
const router = express.Router();
const mongoose = require('mongoose');

// Route for Get Books from database
router.get('/', async (req, res, next) => {
  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return res.status(500).json({
      message: 'Fetching books failed, please try again later.',
    });
  }

  res.status(200).json({
    count: books.length,
    book: books.map((book) => book.toObject({ getters: true })),
  });
});

// Route for Get Book byId from database
router.get('/:id', async (req, res, next) => {
  let book;
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message:
          'Invalid book ID format (provided ID is not a valid ObjectId).',
      });
    }

    book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ message: 'Could not find a book for the provided id.' });
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: 'Something went wrong, could not find a book.' });
  }

  res.json({ book: book.toObject({ getters: true }) });
});

// Route for Save a new Book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      const error = new HttpError(
        'Add all required fields: title, author, publishYear',
        400
      );
      return next(error);
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
    });
    const createdBook = await Book.create(newBook);

    res
      .status(201)
      .json({ message: 'New Book created successfully', book: createdBook });
  } catch (err) {
    const error = err.message;
    return next(error);
  }
});

// Route for Update Book byId from database
router.put('/:id', async (req, res, next) => {
  let book;
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message:
          'Invalid book ID format (provided ID is not a valid ObjectId).',
      });
    }

    book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Could not find a book for the provided id.' });
    }

    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'Add all required fields: title, author, publishYear',
      });
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update a book.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: 'Book updated successfully',
    book: book.toObject({ getters: true }),
  });
});

// Route for Delete Book byId from database
router.delete('/:id', async (req, res, next) => {
  let book;
  try {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message:
          'Invalid book ID format (provided ID is not a valid ObjectId).',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message:
          'Invalid book ID format (provided ID is not a valid ObjectId).',
      });
    }

    book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Could not find a book for the provided id.' });
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send({ message: 'Something went wrong, could not delete a book.' });
  }

  res.status(200).json({
    message: 'Book Deleted successfully',
    book: book.toObject({ getters: true }),
  });
});

module.exports = router;
