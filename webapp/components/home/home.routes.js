(function() {
    'use strict';

    angular.module('home')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'home';
        var stateConfig = {
            url: '/hem',
            templateUrl: 'components/home/home.html',
            title: gettext('Hem'),
            controller: 'HomeController',
            controllerAs: 'vm'
        };

        routeHelper.registerState(stateName, stateConfig);
        //routeHelper.setDefaultState(stateConfig.url);
    }
    
    setUpRoutes.$inject = ['routeHelper', 'gettext'];
})();