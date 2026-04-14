const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const artesDir = path.join(__dirname);

const server = http.createServer((req, res) => {
  let filePath = path.join(artesDir, req.url === '/' ? 'carrossel1.html' : req.url.slice(1));
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Carrossel 1: http://localhost:${PORT}/carrossel1.html`);
  console.log(`Carrossel 2: http://localhost:${PORT}/carrossel2.html`);
});
