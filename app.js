const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

const port = 3000;
const host = 'localhost';

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views','index.html'));
});

app.listen(port, () => {
  debug(`listening on ${chalk.magenta(port)}`);
})