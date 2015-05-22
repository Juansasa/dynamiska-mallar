(function() {
    'use strict';

    angular.module('home')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = gettext('home');
        var stateConfig = {
            url: '/home',
            templateUrl: 'components/home/home.html',
            title: gettext('Home'),
            controller: 'HomeController',
            controllerAs: 'vm'
        };

        routeHelper.registerState(stateName, stateConfig);
        //routeHelper.setDefaultState(stateConfig.url);
    }
    setUpRoutes.$inject = ['routeHelper', 'gettext'];
})();