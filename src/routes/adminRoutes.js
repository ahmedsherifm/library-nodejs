const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    genre: 'Histroical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Histroical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    genre: 'Fiction',
    author: 'J. K. Rowling',
    bookId: 5,
    read: false
  },
  {
    title: 'A Song of Ice and Fire',
    genre: 'Fiction',
    author: 'George R. R. Martin',
    bookId: 13496,
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 2493,
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get(async (req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);

          res.json(response);
        } catch (error) {
          debug(error);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
