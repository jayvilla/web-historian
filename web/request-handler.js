var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // Options
  var options = { 'Content-Type': 'text/plain'};
  // URL Halpers
  var url = req.url.slice(1);
  var readUrl = `${archive.paths.siteAssets}/index.html`;
  var targetUrl = `${archive.paths.archivedSites}${req.url}`;

  if (req.method === 'POST' && req.url === '/') {
    res.writeHead(302, options)
    req.on('data', function(urlToAdd) {
      urlToAdd = urlToAdd.toString().slice(4);
      archive.addUrlToList(`${urlToAdd}\n`, function(err) {
        if (err) { throw err }
        else {
          res.end();
        }
      })
    })
  } else if (req.method === 'GET') {
    res.writeHead(200, options);
    if (req.url === '/') {
      fs.readFile(readUrl, function(err, data) {
        if (err) {
          res.writeHead(404);
          res.end();
        } else {
          res.end(data);
        }
      });
    } else {
      archive.isUrlArchived(url, function(err, archived) {
        if (err) {
          throw err;
        } else {
          if (!archived) {
            res.writeHead(404);
            res.end();
          } else {
            fs.readFile(targetUrl, function(err, data) {
              if (err) { throw err }
              else {
                res.end(data);
              }
            })
          }
        }
      })
    }
  }
};
