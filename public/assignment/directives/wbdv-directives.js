(function () {
    angular
        .module('wbdvDirective', ['ngRoute'])
        .directive('wdSortable', wdSortable);

    function wdSortable($routeParams, widgetService) {

        return {
            link: linkFunction
        };

        function linkFunction(scope, element) {

            $(element).sortable({
                start: function (event, wid) {
                    wid.item.startPosition = wid.item.index();
                },
                update: function (event, ui) {
                    var start = ui.item.startPosition;
                    var end = ui.item.index();
                    widgetService.reorderWidget($routeParams['pageId'], start, end)
                },
                axis: 'y',
                cursor: "move"
            });
        }


    }

})();