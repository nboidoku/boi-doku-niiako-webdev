var app = require('../../express');

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);


var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function createWebsite(req, res) {
    var website = req.body;
    website.developerId = req.params['userId'];
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    website.updated = new Date();
    websites.push(website);
    res.send(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.send(website);
}

function updateWebsite(req, res) {
    var website = req.body;
    website.updated = new Date();
    var websiteId = req.params['websiteId'];
    for(var u in websites) {
        if(websiteId === websites[u]._id) {
            websites[u] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}