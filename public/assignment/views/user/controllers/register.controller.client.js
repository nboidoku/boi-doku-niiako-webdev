(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function (found) {
                    if (found) {
                        model.error = "Username is not available"
                    }
                    else {
                        var user = {
                            username:username,
                            password:password
                        };
                        userService
                            .createUser(user)
                            .then(function (user) {
                                $location.url('/profile/' + user._id);
                            })
                    }
                });
        }
    }
})();