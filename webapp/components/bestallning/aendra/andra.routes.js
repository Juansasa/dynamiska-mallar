(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning.andra',
            stateConfig: {
                url: '/andra',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/aendra/andra.html',
                        controller: 'AendraController'
                    },
                    'person-info@bestallning.andra': {
                        templateUrl: 'components/bestallning/aendra/person-info.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.konsult',
            stateConfig: {
                url: '/konsult',
                abstract: true,
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/aendra/konsult.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.anstalld',
            stateConfig: {
                url: '/anstalld',
                abstract: true,
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/aendra/previa.html'
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.personinfo',
            stateConfig: {
                views: {
                    'personinfo@bestallning.andra': {
                        templateUrl: 'components/bestallning/aendra/person-info.html',
                        controller: 'PersonInfoAndraController'
                    }
                }
            }
        }];

        //routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();