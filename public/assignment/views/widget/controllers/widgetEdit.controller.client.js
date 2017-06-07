( function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);


    function widgetEditController($routeParams, $location, widgetService) {


        var model = this;

        model.userId = $routeParams['userId'];

        model.websiteId = $routeParams['websiteId'];

        model.pageId = $routeParams['pageId'];

        model.widgetId = $routeParams['widgetId'];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        widgetService
            .findWidgetById(model.widgetId)
            .then (function (widget) {
                model.widget = widget;
            });


        function updateWidget(widget){
            widgetService
                .updateWidget(model.widgetId, widget)
                .then (function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget')
                })
        }

        function deleteWidget(widget) {
            widgetService
                .deleteWidget(widget._id)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget')
                })
        }
    }
})
();