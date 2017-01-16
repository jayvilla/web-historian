var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  var fileToRead = exports.paths.list;
  fs.readFile(fileToRead, 'utf-8', function(err, data) {
    if (err) { throw err }
    else {
      data = data.split('\n');
      callback(null, data);
    }
  });
};

exports.isUrlInList = function(targetUrl, callback) {
  exports.readListOfUrls(function(err, data) {
    if (err) {
      throw err;
    } else {
      var exists = false;
      for (var i = 0; i < data.length; i++) {
        if (data[i] === targetUrl) {
          exists = true;
        }
      }
      callback(null, exists);
    }
  });
};

exports.addUrlToList = function(targetUrl, callback) {
  exports.isUrlInList(targetUrl, function(err, exists) {
    if (err) { throw err }
    else {
      if (!exists) {
        fs.writeFile(exports.paths.list, targetUrl, function(err) {
          if (err) { throw err }
          else {
            callback(null, targetUrl);
          }
        });
      }
    }
  });
};

exports.isUrlArchived = function(targetUrl, callback) {
  var archiveToRead = exports.paths.archivedSites;
  fs.readdir(archiveToRead, function(err, files) {
    if (err) { throw err }
    else {
      var archived = false;
      for (var i = 0; i < files.length; i++) {
        if (files[i] === targetUrl) {
          archived = true;
        }
      }
      callback(null, archived);
    }
  })
};

exports.downloadUrls = function(urlArray, callback) {
  var archiveToWrite = exports.paths.archivedSites;
  for (var i = 0; i < urlArray.length; i++) {
    var urlToAdd = urlArray[i];
    fs.writeFile(archiveToWrite + '/' + urlToAdd, '', 'utf8', function(err) {
      if (err) { throw err }
    })
  }
};
