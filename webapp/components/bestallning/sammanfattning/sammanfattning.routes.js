(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning.ny.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/ny-sammanfattning.html',
                        controller: 'SummaryNewEmployeeController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/ny-sammanfattning.html',
                        controller: 'SummaryExistingEmployeeController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/ny-sammanfattning.html',
                        controller: 'SummaryAndraEmployeeController'
                    }
                }
            }
        }];

        routeHelper.registerStates(states);
    }
})();