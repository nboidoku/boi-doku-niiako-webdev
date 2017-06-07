var app = require('../../express');

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
    var resultSet = [];
    var websiteId = req.params['websiteId'];
    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet)
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function (page) {
        return pageId === page._id;
    });
    res.send(page);
}

function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params['websiteId'];
    page._id = (new Date().getTime()) + "";
    page.created = new Date();
    page.updated = new Date();
    pages.push(page);
    res.send(page);
}

function updatePage(req, res) {
    var page = req.body;
    page.updated = new Date();
    var pageId = req.params['pageId'];
    for(var u in pages) {
        if(pageId === pages[u]._id) {
            pages[u] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}