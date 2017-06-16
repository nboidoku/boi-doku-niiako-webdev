var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get('/api/InDent/user/:userId', findUserById);
app.get('/api/InDent/user', findUser);
app.post('/api/InDent/user', createUser);
app.put('/api/InDent/user/:userId', updateUser);
app.delete('/api/InDent/user/:userId', deleteUser);


function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function updateUser(req, res) {
    var user = req.body;
    console.log(user);
    var userId = req.params['userId'];
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user)
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        });

}

function findUser(req, res) {
    if (req.query['username'] && req.query['password']) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user !== null) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    else if (req.query['username']){
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user)
            })
    }
    else {
        res.sendStatus(404);
    }

}



