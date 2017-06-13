(function () {
    angular
        .module('wbdvDirective', ['ngRoute'])
        .directive('wdSortable', wdSortable);

    function wdSortable() {

        return {
            link: linkFunction
        };

        function linkFunction(scope, element, widgetService, $routeParams) {
            var model = this;
            model.pageId = $routeParams['pageId'];

            $(element).sortable({
                start: function (event, wid) {
                    wid.item.startPosition = wid.item.index();
                },
                update: function (event, ui) {
                    var start = ui.item.startPosition;
                    var end = ui.item.index();
                    widgetService.reorderWidget(model.pageId, start, end)
                },
                axis: 'y',
                cursor: "move"
            });
        }


    }

})();