(function() {
    'use strict';

    angular.module('phoneEquipment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'phoneEquipment';
        var stateConfig = {
            url: '/phone-equipment',
            templateUrl: 'components/phoneEquipment/template.html',
            title: gettext('New phone equipment'),
            controller: 'PhoneEquipmentController'
        };

        routeHelper.registerState(stateName, stateConfig);
        routeHelper.setDefaultState(stateConfig.url);
    }
})();