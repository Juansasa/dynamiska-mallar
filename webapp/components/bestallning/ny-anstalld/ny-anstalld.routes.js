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
                        controller: 'NyAnstalldController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.ny.konsult',
            stateConfig: {
                url: '/konsult',
                abstract: true
            }
        }, {
            stateName: 'bestallning.ny.anstalld',
            stateConfig: {
                url: '/anstalld',
                abstract: true
            }
        }];

        routeHelper.registerStates(states);
    }
})();