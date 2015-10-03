var mongo = require('generic-mongo')();
var express = require('express');
var app = express();
var path = require("path");
var API = require("./lib/api")(mongo);
var bodyParser = require('body-parser')

var logger = function(req, res, next) {
    if(req.path.indexOf('/api') === 0){
        console.log(req.method, req.path);
    }
    next();
};

app.use(logger); // Here you add your logger to the stack.
app.use(express.static('assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/api/v1/:type/:id?', function (req, res) {
    API.handle(req, res);
});

app.post('/api/v1/:type/:id?', function (req, res) {
    API.handle(req, res);
});

app.get('/api/*', function (req, res) {
    res.status(404).send("<h1>404</h1>");
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/assets/index.html'));
});

app.listen(1337, function () {
    console.log("started");
});