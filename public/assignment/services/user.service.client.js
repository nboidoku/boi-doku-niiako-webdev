(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService ($http) {

        return {
            findUserById: findUserById,
            findUserByCredentials:findUserByCredentials,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})
();
