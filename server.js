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

  // Is it an AJAX request?
  if(req.xhr) {
    // Clear out the jQuery params - q&d
    req.url = req.url.split(/\?/)[0];
    path.exists(req.url, function(exists) {
      if(exists) {
        fs.readFile(req.url, 'binary', function(err, data) {
          if(err) {
            console.log('AJAX requested file cannot be read', err);
            return;
          } else {
            res.send(data);
          }
        });
      }
      
    });
  } else {
    path.exists(req.url, function(exists) {
      if(exists) {
          console.log('Serving: ', req.url);

          serveFile(res, req.url);
          
      } else {
        console.log('File does not exist: ', req.url);
        
        serveFile(res, baseUrl + '/errors/404.html');
      }
    });
  }
}).listen(1337);

// We are up...
console.log('Server running on port 1337');