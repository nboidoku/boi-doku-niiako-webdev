(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);


    function widgetService($http) {

        return {
            createWidget: createWidget,
            findAllWidgetsByPage: findAllWidgetsByPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        };

        function createWidget(pageId, widget) {
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data
                })
        }


        function findAllWidgetsByPage(pageId) {
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }


        function findWidgetById(widgetId) {
            var url = '/api/assignment/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/assignment/widget/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data
                })
        }


        function deleteWidget(widgetId) {
            var url = '/api/assignment/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function reorderWidget(pageId, start, end) {
            var url = '/api/page/' + pageId + '/widget?initial=' + start + '&final=' + end;
            return $http.put(url)
                .then(function (response) {
                    console.log('here');
                    return response.data;
                })
        }
    }
})
();
