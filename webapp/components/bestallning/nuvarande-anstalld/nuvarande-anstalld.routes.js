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
                    },
                    'person-info@bestallning.nuvarande': {
                        templateUrl: 'components/bestallning/nuvarande-anstalld/person-info.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.konsult',
            stateConfig: {
                url: '/konsult',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/nuvarande-anstalld/konsult.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.previa',
            stateConfig: {
                url: '/previa',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/nuvarande-anstalld/previa.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html'
                    }
                }
            }
        }];

        //routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();