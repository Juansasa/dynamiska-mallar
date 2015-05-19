(function() {
    'use strict';

    angular
        .module('data')
        .factory('manager', exception);

        /*@ngInject*/
        function exception() {
        var service = {
            getManagerInfo: getManager
        };
        return service;

        function getManager() {
            return {
                firstname: 'Per',
                lastname: 'Persson'
            };
        }
    }
})();