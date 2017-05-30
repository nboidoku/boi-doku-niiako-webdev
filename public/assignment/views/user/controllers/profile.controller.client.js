(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    
    function profileController($location, $routeParams, userService) {

        var model = this;

        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.updateUser = function(username, firstName, lastName, email) {
            userService.updateUser(username, firstName, lastName, email);
            $location.url('/profile/'+userId);
        }


    }
})

();