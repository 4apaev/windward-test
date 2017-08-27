'use strict';
const Fs = require('fs');
const Path = require('path');
const Mim = {
  js  : 'application/javascript',
  json: 'application/json',
  gif : 'image/gif',
  jpg : 'image/jpeg',
  png : 'image/png',
  svg : 'image/svg+xml',
  ico : 'image/x-icon',
  css : 'text/css',
  html: 'text/html',
  txt : 'text/plain',
}

module.exports = (req, res) => {

  const path = Path.join(process.cwd(), req.url);

  Fs.stat(path, (err, stats) => {

    if (err || !stats.isFile()) {
      res.writeHead(404, {
        'Content-Type': Mim.html
      })
      res.end('<h1>404 Not Found....</h1>');
    }
    else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type'  : Mim[ path.split('.').pop() ]
      });
      Fs.createReadStream(path).pipe(res);
    }
  })

}


