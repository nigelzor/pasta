const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10kb',
}));

let db = '';

app.get('/', (req, res) => {
  res.render('index', { pasta: db });
});

app.post('/update', (req, res) => {
  db = req.body.pasta;
  res.redirect('/#saved');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
