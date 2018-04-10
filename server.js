const express = require('express');
const app = express();
app.set('view engine', 'pug');

const db = [];

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
