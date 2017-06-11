(function () {
   angular
       .module('WebAppMaker')
       .controller('widgetNewController', widgetNewController);


    function widgetNewController($routeParams, $location, widgetService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.websiteId = $routeParams['websiteId'];

        model.pageId = $routeParams['pageId'];

        model.createWidget = createWidget;


        function createWidget(type) {
            var widget = {
                type: type
            };
            widgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+response._id)
                })
        }
    }
})
();