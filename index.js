const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (req.method === 'GET' && parsed.pathname === '/webhook') {
    const token = parsed.query['hub.verify_token'];
    const challenge = parsed.query['hub.challenge'];
    if (token === 'testeok') {
      res.writeHead(200);
      res.end(challenge);
    } else {
      res.writeHead(403);
      res.end('Forbidden');
    }
  } else if (req.method === 'POST' && parsed.pathname === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('=== EVENTO RECEBIDO ===');
      console.log(body);
      res.writeHead(200);
      res.end('OK');
    });
  } else {
    res.writeHead(200);
    res.end('Servidor rodando!');
  }
});

server.listen(process.env.PORT || 3000);
