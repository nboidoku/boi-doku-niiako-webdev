(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
        }
        init();

        // implementation
        function createWebsite(name, description) {

            model.emptyWebsiteName = "";

            if (!name) {
                model.emptyWebsiteName = "Please enter a name";
            }
            else {
                var website = {
                    name: name,
                    description: description
                };

                websiteService
                    .createWebsite(model.userId, website)
                    .then (function () {
                        $location.url('/user/'+model.userId+'/website');
                    });
            }


        }
    }
})();