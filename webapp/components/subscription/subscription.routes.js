(function() {
    'use strict';

    angular.module('subscription')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'subscription';
        var stateConfig = {
            url: '/subscription',
            templateUrl: 'components/subscription/template.html',
            title: gettext('New subscription'),
            controller: 'SubscriptionController'
        };

        routeHelper.registerState(stateName, stateConfig);
        routeHelper.setDefaultState(stateConfig.url);
    }
})();