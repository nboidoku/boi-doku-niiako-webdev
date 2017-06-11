var app = require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev');

require('./services/user.service.server');
require('./services/website.server.server');
require('./services/page.server.service');
require('./services/widget.server.server');

app.get('/hello', sayHello);

function sayHello() {
    console.log('hello')
}
