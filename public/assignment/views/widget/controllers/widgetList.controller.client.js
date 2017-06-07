(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.websiteId = $routeParams['websiteId'];

        model.pageId = $routeParams['pageId'];

        model.trustThisContent = trustThisContent;

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        model.getWidgetUrlForType = getWidgetUrlForType;



        widgetService
            .findAllWidgetsByPage(model.pageId)
            .then(function (widgets) {
                model.widgets = widgets
            });


        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }


    }
})
();