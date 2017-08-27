'use strict';

const PORT = 3000;
const Http = require('http');
const Fs = require('fs');
const Db = require('./conf');
const statiq = require('./src/static');

Http.createServer((req, res) => {
  const { url, method } = req;

  if (method != 'GET') {
    res.statusCode = 404;
    return res.end('Not Found');
  }

  if (url === '/') {
    Fs.readFile('./index.html', (err, data) => {
      res.writeHead(200, {
        'Content-Type'  : 'text/html',
        'Content-Length': Buffer.byteLength(data),
      })
      res.end(data.toString());
    });
  }

  else if (url === '/info') {
    res.writeHead(200, {
      'Content-Type'  : 'application/json',
      'Content-Length': Buffer.byteLength(Db.info),
    });
    res.end(Db.info);
  }

  else if (url === '/location') {
    res.writeHead(200, {
      'Content-Type'  : 'application/json',
      'Content-Length': Buffer.byteLength(Db.location),
    });
    res.end(Db.location);
  }

  else if (url === '/vessels') {
    res.writeHead(200, {
      'Content-Type'  : 'application/json',
      'Content-Length': Buffer.byteLength(Db.vessels),
    });
    res.end(Db.vessels);
  }

  else {
    statiq(req, res);
  }

}).listen(PORT);