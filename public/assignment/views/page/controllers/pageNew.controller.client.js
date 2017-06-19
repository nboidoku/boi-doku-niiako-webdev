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

        function createPage(name, description) {

            model.emptyPageName = "";

            if (!name) {
                model.emptyPageName = "Please enter Page name"
            }
            else {
                var websiteId = model.websiteId;
                var page = {
                    name: name,
                    description: description
                };
                pageService
                    .createPage(websiteId, page)
                    .then(function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page')
                    });
            }

        }
    }
})
();