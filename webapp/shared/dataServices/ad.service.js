'use strict';

(function() {
    angular
        .module('data')
        .factory('adService', adService);

        /*@ngInject*/
        function adService($http) {
        var service = {
            getManager: getManager
        };
        return service;

        function getManager() {
            return $http.get('/api/ad/getUser');
        }
    }
})();