(function() {
    'use strict';

    angular
        .module('data')
        .factory('manager', exception);

        /*@ngInject*/
        function exception($http) {
        var service = {
            get: getManager
        };
        return service;

        function getManager() {
            return $http.get('/api/ad/current');
        }
    }
})();