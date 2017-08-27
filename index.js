'use strict';
const { PORT=3333 } = process.env;
const Http = require('http');
const Fs = require('fs');
const Db = require('./conf');
const statiq = require('./src/static');

Http.createServer((req, res) => {
  const { url, method } = req;

  if (method === 'GET' && url === '/') {
    Fs.readFile('./index.html', (err, data) => {
      res.writeHead(200, {
        'Content-Type'  : 'text/html',
        'Content-Length': Buffer.byteLength(data),
      })
      res.end(data.toString());
    });
  }

  else if (method === 'GET' && (url === '/info'||url === '/location'||url === '/vessels')) {
    let data = JSON.stringify(Db[ url.slice(1) ], 0, 2)
    res.writeHead(200, {
      'Content-Type'  : 'application/json',
      'Content-Length': Buffer.byteLength(data),
    });
    res.end(data);
  }

  else if (method === 'POST' && url === '/vessels') {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      res.writeHead(200, {
        'Content-Type'  : 'application/json',
        'Content-Length': Buffer.byteLength(data),
      });
      res.end(data);
    });
  }

  else {
    statiq(req, res);
  }

}).listen(PORT);