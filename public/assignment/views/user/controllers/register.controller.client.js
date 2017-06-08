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


            userService
                .findUserByUsername(username)
                .then(function (found) {
                    console.log(found);
                    if (found) {
                        handleError('username')
                    }
                    else {
                        registerUser();
                    }
                });

            function registerUser() {

                if (password !== password2) {
                    handleError('password')
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

            }

            function handleError(error) {
                switch(error) {
                    case 'username':
                        model.error = "Username " + username+ " is not" +
                            " available";
                        break;
                    case 'password':
                        model.error = "passwords must match";
                        break;
                    default:
                        model.error = "error, please try again";
                }
            }

        }
    }
})();