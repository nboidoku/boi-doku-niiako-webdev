(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    
    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        var userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.user = currentUser;
        model.logout = logout;


        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })
        }

    }
})

();