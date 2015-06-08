(function() {
    'use strict';

    angular
        .module('data')
        .factory('manager', exception);

        /*@ngInject*/
        function exception() {
        var service = {
            get: getManager
        };
        return service;

        function getManager() {
            return {
                    namn: 'Bosse King',
                    email: 'Bosee.king@fortet.se',
                    'resulat-enhet': 'Chef RE',
                    tel: '0370-44433'
                };
        }
    }
})();