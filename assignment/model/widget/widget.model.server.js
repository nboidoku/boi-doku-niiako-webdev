var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function createWidget(widget) {
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel.addToWidgets(widget._page, widget._id);
            return widget
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name,
            text: widget.text,
            placeholder: widget.placeholder,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            class: widget.class,
            icon: widget.icon,
            deletable: widget.deletable,
            formatted: widget.formatted
        }
    })
}

function deleteWidget(widgetId) {
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            pageId = widget._page
        })
        .then(function () {
            pageModel.removeFromWebsites(widgetId)

        });
    return pageModel.remove({_id: widgetId})
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            console.log(page);
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            page.widgets = widgets;
            console.log(page);
            return pageModel
                .updatePage(pageId, page)
        })
}

