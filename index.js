const { text, send } = require('micro');
const pug = require('pug');
const qs = require('querystring');
const url = require('url');
const crypto = require('crypto');

const isProd = process.env.NODE_ENV === 'production';

let db = { pasta: '', date: new Date() };

function view(name) {
  return pug.compileFile(`views/${name}.pug`, { cache: isProd, compileDebug: !isProd });
}

module.exports = async (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader('Content-Security-Policy', `object-src 'none'; script-src 'nonce-${nonce}' 'unsafe-inline'; base-uri 'none';`);

  const { pathname } = url.parse(req.url);
  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    send(res, 200, view('index')({ ...db, nonce }));
  } else if (req.method === 'POST' && pathname === '/update') {
    const body = qs.parse(await text(req, { limit: '10kb' })).pasta;
    db = { pasta: body, date: new Date() };
    res.setHeader('Location', '/#saved');
    send(res, 302);
  } else {
    send(res, 404);
  }
};
