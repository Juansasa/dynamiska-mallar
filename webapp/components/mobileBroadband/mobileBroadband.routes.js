(function() {
    'use strict';

    angular.module('mobileBroadband')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'mobileBroadband';
        var stateConfig = {
            url: '/mobile-broadband',
            templateUrl: 'components/mobileBroadband/template.html',
            title: gettext('New mobile broadband'),
            controller: 'MobileBroadbandController'
        };

        routeHelper.registerState(stateName, stateConfig);
        //routeHelper.setDefaultState(stateConfig.url);
    }
})();