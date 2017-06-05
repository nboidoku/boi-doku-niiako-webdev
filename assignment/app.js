var app = require('../express');

require('./services/user.service.server');
require('./services/website.server.server');
require('./services/page.server.service');

app.get('/hello', sayHello);

function sayHello() {
    console.log('hello')
}
