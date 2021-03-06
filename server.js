var fs = require('fs'),
    express = require('express'),
    app = express();
var path = require('path');
var config = require(path.join(__dirname + '/config'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//static content
app.use('/', express.static('static/public/html'));
app.use('/', express.static('static/public/css'));
app.use('/', express.static('static/public/images'));
app.use('/humans.txt', express.static('static/public/humans.txt'));
app.use('/robots.txt', express.static('static/public/robots.txt'));

//routes
app.use('/track', require('./routes/track/track'));
app.use('/games', require('./routes/games/games'));
app.use('/usaco', require('./routes/usaco/usaco'));

//404 - File or directory not found
app.use(function(req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile('static/private/404.html', {root: __dirname});
  } else if (req.accepts('json')) {
    res.send({ error: 'File or directory not found' });
  }else {
    res.type('txt').send('File or directory not found :(');
  }
});

//500 - Internal Server Error
app.use(function(error, req, res, next) {
  res.status(500);
  if (req.accepts('html')) {
    res.sendfile('static/private/500.html', {root: __dirname});
  } else if (req.accepts('json')) {
    res.send({ error: 'Internal server error.' });
  } else {
    res.type('txt').send('Internal server error.');
  }
});

//create server
app.listen(2222);
console.log("Server listening on port 2222");
