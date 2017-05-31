( function() {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;

        model.websiteId = $routeParams['websiteId'];

        model.userId = $routeParams['userId'];

        model.pageId = $routeParams['pageId'];


        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        // implementation

        function updatePage(pageId, name, description) {
            pageService.updatePage(pageId, name, description);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }


})
();