const http = require('http');
const fs = require('fs');
http.createServer(function(request, response){
  console.log('request come', request.url);

  const html = fs.readFileSync('test.html', 'utf8');
  response.writeHead(200,{
    'Content-type': 'text/html',
    'cache-control': 'max-age=100000',
    'Etag': '777',
    'Last-Modified': '123'
  })
  
  response.end(html);
}).listen(8080);
console.log('server listending 8080');