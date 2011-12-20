var express = require('express'),
    fs      = require('fs'),
    path    = require('path');

var app = express.createServer();
var baseUrl = 'web';


function serveFile(res, file) {
  res.sendfile(file, function(err) {
    if(err) {
      console.log(err);
    }
  });
}

// Quick and dirty file server
app.get('*', function(req, res) {

  req.url = req.url === '/'? '/index.html' : req.url;
  req.url = baseUrl + req.url;
  
  path.exists(req.url, function(exists) {
    if(exists) {
        console.log('Serving: ', req.url);

        serveFile(res, req.url);
        
    } else {
      console.log('File does not exist: ', req.url);
      
      serveFile(res, baseUrl + '/errors/404.html');
    }
  });
});

app.listen(3000);

// We are up...
console.log('Server running on port 3000');