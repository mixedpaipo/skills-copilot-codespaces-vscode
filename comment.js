// Create web server
// Start with node comment.js
// Load the web page in the browser
// http://localhost:8000
// You can see the comment form and comments
// Enter a comment and click the submit button
// The comment will be added to the list of comments
// The comment will be saved in the comments.json file
// You can see the comment in the list of comments
// You can close the server by pressing Ctrl+C

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(path.join(__dirname, 'comment.html')).pipe(res);
  } else if (req.method === 'GET' && req.url === '/comments') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    fs.createReadStream(path.join(__dirname, 'comments.json')).pipe(res);
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      let comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'));
      comments.push(JSON.parse(body));
      fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2));
      res.statusCode = 201;
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});