'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use('/', express.static(__dirname + '/client'));

server.listen(3000, function () {
    console.log('server is serving "' + __dirname + '" on 3000!');
});
