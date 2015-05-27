(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning.ny',
            stateConfig: {
                url: '/ny',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/ny-anstalld/ny.html',
                        controller: function(){
                            // populate wizard data with service
                            // display personal form
                            // modify wizardsteps
                            // add wizard navigation
                        }
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
        }];

        //routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();