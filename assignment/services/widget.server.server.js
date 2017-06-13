var app = require('../../express');

var widgetModel = require('../model/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });


app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsByPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put('/api/page/:pageId/widget', reorderWidget);

app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);



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
    widget._page = req.params['pageId'];
    widgetModel
        .createWidget(widget)
        .then(function (response) {
            console.log('here')
            res.send(response);
        })
}

function findAllWidgetsByPage(req, res) {
    widgetModel
        .findAllWidgetsForPage(req.params['pageId'])
        .then(function (widgets) {
            res.json(widgets)
        })
}

function updateWidget(req, res) {
    var widget = req.body;
    widgetModel
        .updateWidget(req.params['widgetId'], widget)
        .then(function (response) {
            res.send(response);
        })
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget)
        })
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (response) {
            res.send(response)
        })
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log(myFile);

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            var widget = widget;
        })
        .then(function () {
            widget.url = '/assignment/uploads/'+filename;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (response) {
                    res.send(response)
                })
        });


    var callbackUrl   = "/assignment/index.html#!/user/"+req.body.userId+"/website/"+req.body.websiteId
    +"/page/"+req.body.pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function reorderWidget(req, res) {
    var start = parseInt(req.query.initial);
    var end = parseInt(req.query.final);

    widgetModel.reorderWidget(req.params['pageId'], start, end)
        .then(function () {
            res.sendStatus(200);
        });
}
