'use strict';

(function() {
    angular
        .module('data')
        .factory('adService', adService);

    /*@ngInject*/
    function adService($http) {
        var loggedUser = null;
        var service = {
            getManager: getManager,
            isAuthorized: isAuthorized,
            loggedUser: loggedUser
        };

        return service;

        function isAuthorized() {
            return service.loggedUser !== null && service.loggedUser.isManager;
        }

        function getManager() {
            return $http.get('/api/users/current');
        }
    }
})();