(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning',
            abstract: true,
            stateConfig: {
                url: '/bestallning',
                templateUrl: 'components/bestallning/bestallning.html'
            }
        }, {
            stateName: 'bestallning.ny',
            stateConfig: {
                url: '/ny',
                controller: function(){
                    // populate wizard data with service
                    // display personal form
                },
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/ny-anstalld/ny.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.ny.konsult',
            stateConfig: {
                url: '/konsult',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/ny-anstalld/konsult.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.ny.previa',
            stateConfig: {
                url: '/previa',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/ny-anstalld/previa.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande',
            stateConfig: {
                url: '/nuvarande',
                controller: function(){
                    // display search
                    // 
                },
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/nuvarande-anstalld/nuvarande.html'
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
        }];

        //routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();