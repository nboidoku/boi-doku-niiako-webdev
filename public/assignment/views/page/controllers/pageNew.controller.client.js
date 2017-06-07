(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;

        model.websiteId = $routeParams['websiteId'];

        model.userId = $routeParams['userId'];

        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();

        function createPage(page) {
            var websiteId = model.websiteId;
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page')
                });
        }
    }
})
();