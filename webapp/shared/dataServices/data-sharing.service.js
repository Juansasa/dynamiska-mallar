(function() {
    'use strict';

    angular
        .module('data')
        .factory('dataSharing', ds);

    /*@ngInject*/
    function ds() {
        var service = {
            data: {},
            get: get,
            set: set
        };
        return service;


        function set(field, data) {
            if(!field || !data) {
                return;
            }

            service.data[field] = data;
        }

        function get(field) {
            if(!field) {
                return;
            }

            return service.data[field];
        }
    }
})();