(function() {
    'use strict';
    angular.module('previa.order')
    .config(exposeRouteConfig);

    /*@ngInject*/
    function exposeRouteConfig($stateProvider) {
        angular.module('previa.order').stateProvider = $stateProvider;
    }
})();