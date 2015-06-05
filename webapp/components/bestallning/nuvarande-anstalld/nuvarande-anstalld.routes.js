(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning.nuvarande',
            stateConfig: {
                url: '/nuvarande',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/nuvarande-anstalld/nuvarande.html',
                        controller: 'NuvarandeAnstalldController'
                    }
                }
            }
        }];

        routeHelper.registerStates(states);
    }
})();