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
        }, {
            stateName: 'bestallning.nuvarande.konsult',
            stateConfig: {
                url: '/konsult',
                abstract: true
            }
        }, {
            stateName: 'bestallning.nuvarande.anstalld',
            stateConfig: {
                url: '/anstalld',
                abstract: true
            }
        }];

        routeHelper.registerStates(states);
    }
})();