const express = require('express');

const app = express();
const port = 3000;
const host = 'localhost';

app.get('/', (req, res) => {
  res.send('Hello from my library app');
});

app.listen(port, ()=>{
  console.log(`listening on ${host}:${port}`);
})