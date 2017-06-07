var app = require('../../express');

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsByPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},

    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},

    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},

    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" }
];


function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date().getTime()) + "";
    widget.pageId = req.params['pageId'];
    widgets.push(widget);
    res.send(widget);
}

function findAllWidgetsByPage(req, res) {
    var resultSet = [];
    for(var w in widgets) {
        if(widgets[w].pageId === req.params.pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function updateWidget(req, res) {
    var widget = req.body;
    widget.updated = new Date();
    var widgetId = req.params['widgetId'];
    for(var u in widgets) {
        if(widgetId === widgets[u]._id) {
            widgets[u] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widgetId === widget._id;
    });
    res.send(widget);
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}

