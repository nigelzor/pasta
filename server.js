const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10kb',
}));

let db = { pasta: '', date: new Date() };

app.get('/', (req, res) => {
  res.render('index', db);
});

app.post('/update', (req, res) => {
  db = {
    pasta: req.body.pasta,
    date: new Date(),
  };
  res.redirect('/#saved');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
