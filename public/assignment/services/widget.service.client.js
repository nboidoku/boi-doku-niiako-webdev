(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);


    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" }
        ];

        return {
            findAllWidgetsByPage:findAllWidgetsByPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };


        function findAllWidgetsByPage(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (website) {
                return widget._id === widgetId;
            });
        }

        function updateWidget(widgetId, widget) {
            for (var u in users) {
                if (widgetId === widgets[u]._id) {
                    widgets[u] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }
    }
})
();
