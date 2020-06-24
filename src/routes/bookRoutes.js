/* eslint-disable linebreak-style */
const express = require('express');
const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Histroical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Miserables',
      genre: 'Histroical Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      genre: 'Fiction',
      author: 'J. K. Rowling',
      read: false
    },
    {
      title: 'A Song of Ice and Fire',
      genre: 'Fiction',
      author: 'George R. R. Martin',
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });

  return bookRouter;
}

module.exports = router;
