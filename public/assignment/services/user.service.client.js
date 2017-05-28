(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService () {


        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        return {
            findUserById: findUserById,
            findUserByCredentials:findUserByCredentials
        };


        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            });
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }
    }
})
();
