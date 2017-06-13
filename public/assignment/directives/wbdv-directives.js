(function () {
    angular
        .module('wbdvDirective', ['ngRoute'])
        .directive('wdSortable', wdSortable);

    function wdSortable() {

        return {
            link: linkFunction
        };

        function linkFunction(scope, element) {
            $(element).sortable({
                start: function (event, ui) {
                    ui.item.startPosition = ui.item.index();
                },
                update: function (event, ui) {
                    var start = ui.item.startPosition;
                    var end = ui.item.index();
                    reorderWidget(start, end);
                    widgetService.reorderWidget($routeParams[pageId], start, end)
                },
                axis: 'y',
                cursor: "move"
            });
        }


    }

})();