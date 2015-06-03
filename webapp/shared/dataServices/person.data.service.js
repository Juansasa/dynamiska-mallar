(function() {
    'use strict';

    angular
        .module('data')
        .factory('personInfo', ps);

    /*@ngInject*/
    function ps() {
        var service = {
            person: null,
            get: getPerson,
            set: setPerson
        };
        return service;


        function setPerson(person) {
            service.person = person;
        }

        function getPerson() {
            return service.person;
        }
    }
})();