(function() {
    'use strict';

    angular.module('mobileBroadband')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.mobilbredband',
            stateConfig: {
                url: '/mobilbredband',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/mobileBroadband/template.html',
                        title: gettext('New mobile broadband'),
                        controller: 'MobileBroadbandController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();