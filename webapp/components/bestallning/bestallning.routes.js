(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning',
            stateConfig: {
                url: '/bestallning',
                abstract: true,
                templateUrl: 'components/bestallning/bestallning.html',
                controller: 'BestallningController'
            }
        }];

        routeHelper.registerStates(states);
    }
})();