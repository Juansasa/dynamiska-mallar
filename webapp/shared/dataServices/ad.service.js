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
            searchUser: searchUser,
            isAuthorized: isAuthorized,
            loggedUser: loggedUser
        };

        return service;

        function isAuthorized() {
            return service.loggedUser !== null && service.loggedUser.isManager;
        }

        function getManager() {
            return $http.get('/api/ad/current');
        }

        function searchUser(queryString) {
            return $http({
                url: '/api/ad/search/' + queryString,
                method: 'GET',
                transformResponse: appendTransform($http.defaults.transformResponse, transformUsersListResponse)
            });
        }

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        function transformUsersListResponse(response) {
            return response;
        }
    }
})();


