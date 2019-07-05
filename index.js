const { text, send } = require('micro');
const pug = require('pug');
const qs = require('querystring');
const url = require('url');

let db = { pasta: '', date: new Date() };

function view(name) {
  return pug.compileFile(`views/${name}.pug`, { cache: true, compileDebug: false });
}

module.exports = async (req, res) => {
  const { pathname } = url.parse(req.url);
  if (pathname === '/') {
    send(res, 200, view('index')(db));
  } else if (req.method === 'POST' && pathname === '/update') {
    const body = qs.parse(await text(req, { limit: '10kb' })).pasta;
    db = { pasta: body, date: new Date() };
    res.setHeader('Location', '/#saved');
    send(res, 302);
  } else {
    send(res, 404);
  }
};
