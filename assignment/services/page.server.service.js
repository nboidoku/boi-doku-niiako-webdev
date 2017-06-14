var app = require('../../express');

var pageModel = require('../model/page/page.model.server');

app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.post("/api/assignment/website/:websiteId/page", createPage);
app.put("/api/assignment/page/:pageId", updatePage);
app.delete("/api/assignment/page/:pageId", deletePage);

var pages = [
    {
        "_id": "321",
        "name": "Post 1",
        "websiteId": "456",
        "description": "Lorem"
    },
    {
        "_id": "432",
        "name": "Post 2",
        "websiteId": "456",
        "description": "Lorem"
    },
    {
        "_id": "543",
        "name": "Post 3",
        "websiteId": "456",
        "description": "Lorem"
    }
];


function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    return pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (websites) {
            res.json(websites)
        })
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            console.log(page);
            res.json(page)
        })
}

function createPage(req, res) {
    var page = req.body;
    page._website = req.params['websiteId'];
    pageModel
        .createPage(page)
        .then(function (response) {
            res.send(response)
        })
}

function updatePage(req, res) {
    var page = req.body;
    return pageModel
        .updatePage(req.params['pageId'], page)
        .then(function (response) {
            res.send(response)
        })
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    return pageModel
        .deletePage(pageId)
        .then(function (response) {
            res.send(response)
        })
}