var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // URL Halpers
  var readURL = `${archive.paths.siteAssets}/index.html`;
  var targetURL = `${archive.paths.archivedSites}${req.url}`;

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile(readURL, 'utf-8', function(err, data) {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    }); 
  } else if (req.method === 'GET' && req.url && req.url !== '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile(targetURL, 'utf-8', function(err, data) {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
  }
};
