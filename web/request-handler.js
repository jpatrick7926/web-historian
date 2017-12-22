var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  let archPath = archive.paths.archivedSites;
  let indexPath = archive.paths.siteAssets;
  //let 

  if (req.method === 'GET') {   
    var fileUrl = archPath + req.url;
    if (req.url === '/') {
      //render html
      http.serveAssets(res, indexPath + '/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //console.log(data);
        res.write(data);
        res.end();
      });
    } else if (req.url !== '/') {
    // if req.url is already in sites folder
     // return the contents
      http.serveAssets(res, archPath + req.url, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end('404 not found');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          console.log(data);
          res.write(data);
          res.end();
        }  
      });
      
    }
  }

  if (req.method === 'POST') {

    if (!archive.isUrlArchived(req.url, (item) => item)) {
      http.serveAssets(res, indexPath + '/loading.html', function(err, data) {
        if (err) {
          console.log(err);
        }
        res.writeHead(302, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    } else {
      http.serveAssets(res, archPath + '/' + req.url, function(err, data) {
        console.log('this request is archived already!');
        if (err) {
          console.log(err);
        }
        res.writeHead(302, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    
    http.getData(req, function(data) {
      console.log('WE ARE HERE', data);
      fs.appendFile('/Users/student/hrsf86-web-historian/web/archives/sites.txt', data + '\n', function (err) {
        if (err) {
          console.log('ERROR', err);
        } else {
          console.log('ADDED!');
          res.writeHead(302, {'Content-Type': 'text/html'});
          // res.end();
        }
      });
    });
  }
  
  // res.end(archive.paths.list);
};



 // http.serveAssets(res, './public/index.html', function(err, data) {
 //      res.writeHead(200, {'Content-Type': 'text/html'});
 //      res.write(data);
 //      res.end(JSON.stringify(data));
 //    });