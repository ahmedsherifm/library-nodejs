/* eslint-disable linebreak-style */
const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  bookRouter.route('/')
    .get(async (req, res) => {
      const sqlRequest = new sql.Request();
      const { recordset } = await sqlRequest.query('select * from books');
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books: recordset
        }
      );
    });

  bookRouter.route('/:id')
    .get(async (req, res) => {
      const { id } = req.params;

      const sqlRequest = new sql.Request();
      const { recordset } = await sqlRequest
        .input('id', sql.Int, id)
        .query('select * from books where id = @id');
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: recordset[0]
        }
      );
    });

  return bookRouter;
}

module.exports = router;
