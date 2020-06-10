const http = require('http');
http.createServer(function(request, response){
  console.log('request come', request.url);

  response.writeHead(200,{
    'Access-Control-Allow-Origin': 'http://192.168.1.6:8080',
  })

  response.end('123');
}).listen(8081);
console.log('server listending 8081');
