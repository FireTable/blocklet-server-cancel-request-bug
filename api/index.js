const express = require('express');

const app = express();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let count = 0;

app.get('/', async (req, res) => {
  const key = `hello world ${count}`;
  console.log(key + ' start');
  console.time(key);
  req.on('close', () => {
    console.timeEnd(key);
    console.log('close');
  });
  await sleep(5000);
  count++;
  res.send('Hello World!');
});

const port = parseInt(process.env.BLOCKLET_PORT || 3000, 10);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

exports.app = app;
