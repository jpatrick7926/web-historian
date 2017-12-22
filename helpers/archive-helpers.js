var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, {encoding: 'UTF-8'}, function(err, data) {
    if (err) {
      console.log(err);  
    }
    data = data.split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urlList) {
    callback(urlList.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  var listPath = exports.paths.list;
  fs.appendFile(listPath, url + '\n', callback);

};

exports.isUrlArchived = function(url, callback) {
  var archPath = exports.paths.archivedSites + '/';
  fs.access(archPath + url, function(err) {
    callback(err ? false : true);
  });
};

exports.downloadUrls = function(urls) {
    // [www.google.com, www.amazon.com]
  var stringifiedHTML = [];
  
  // http.get(url)
  var archPath = exports.paths.archivedSites + '/';
  for (var i = 0; i < urls.length; i++) {
    
    if (urls[i]) {
      var url = urls[i];
      request('http://' + url).then(fs.writeFile(exports.paths.archivedSites + '/' + url));
    } 
    
    
    //http.get(url, res)
    // GET HTML from urls[i]
    // store HTML in stringifiedHTML[i]
  // fs.writeFile(archPath + urls[i], stringifiedHTML[i]...
    
    fs.writeFile(archPath + urls[i], urls[i], 'utf8', (err) => {
      if (err) { throw err; } 
      console.log('filed added!');
    });
  }
};












