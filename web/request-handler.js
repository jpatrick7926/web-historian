var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // if (fs.exists('/Users/student/hrsf86-web-historian/archives/sites' + req.url)) {


  // }


  if (req.method === 'GET') {
   
    if (req.url === '/') {
      //render html
      http.serveAssets(res, '/Users/student/hrsf86-web-historian/web/public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //console.log(data);
        res.write(data);
        res.end(JSON.stringify(data));
      });
    } else if (req.url !== '/') {
      // if req.url is already in sites folder
       // return the contents
      // console.log('/Users/student/hrsf86-web-historian/archives/sites' + req.url);
      console.log(path.join(__dirname, req.url));
      http.serveAssets(res, '/Users/student/hrsf86-web-historian/test/testdata/sites' + req.url, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log(data);
        res.write(data);
        res.end(JSON.stringify(data));
      });
      
    }

  }
  
  // res.end(archive.paths.list);
};



 // http.serveAssets(res, './public/index.html', function(err, data) {
 //      res.writeHead(200, {'Content-Type': 'text/html'});
 //      res.write(data);
 //      res.end(JSON.stringify(data));
 //    });