(function() {
    'use strict';

    angular
        .module('data')
        .factory('person', exception);

        /*@ngInject*/
        function exception() {
        var service = {
            getPersonInfo: getPerson
        };
        return service;

        function getPerson() {
            return {
                firstname: 'Bosse',
                lastname: 'Bossesson'
            };
        }
    }
})();