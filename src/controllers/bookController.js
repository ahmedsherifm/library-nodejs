const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function getBooks() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const booksCollection = await db.collection('books');
        const books = await booksCollection.find().toArray();
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books
          }
        );
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function getBookById() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const booksCollection = await db.collection('books');
        const book = await booksCollection.findOne({ _id: ObjectID(id) });

        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book
          }
        );
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
