(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    
    function profileController($location, $routeParams, userService) {

        var model = this;

        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.updateUser = function(user, firstName, lastName, email) {
            userService.updateUser(user._id, firstName, lastName, email);
            $location.url('/profile/'+userId);
            model.successful = "Successfully updated profile";
        }


    }
})

();