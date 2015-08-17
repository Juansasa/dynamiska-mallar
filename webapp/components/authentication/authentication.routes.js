(function() {
    'use strict';

    angular.module('authentication')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'authentication';
        var stateConfig = {
            url: '/auth',
            templateUrl: 'components/authentication/authentication.html',
            title: gettext('Authentication'),
            controller: 'AuthenticationController',
            controllerAs: 'vm'
        };

        routeHelper.registerState(stateName, stateConfig);
        routeHelper.setDefaultState(stateConfig.url);
    }
    setUpRoutes.$inject = ['routeHelper', 'gettext'];
})();