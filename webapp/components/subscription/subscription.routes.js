(function() {
    'use strict';

    angular.module('subscription')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.abonnemang',
            stateConfig: {
                url: '/abonnemang',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/subscription/template.html',
                        title: gettext('Abonnemang'),
                        controller: 'SubscriptionController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();