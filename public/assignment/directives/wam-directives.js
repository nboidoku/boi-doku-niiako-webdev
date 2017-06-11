(function() {
    angular
        .module("WebAppMaker")
        .directive('wdSortable', wdSortable);

    function wdSortable(widgetService) {
        function linkFunction(scope, element) {
            (element).sortable();
        }

        return {
            link: linkFunction
        }
    }
})();