(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;

        model.websiteId = $routeParams['websiteId'];

        model.userId = $routeParams['userId'];

        model.createPage = createPage;

        function init () {
            model.pages = pageService.findAllPagesForUser(model.websiteId);
        }

        init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page')
        }
    }
})
();