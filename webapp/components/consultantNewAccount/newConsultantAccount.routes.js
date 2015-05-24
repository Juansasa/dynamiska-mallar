(function() {
    'use strict';

    angular.module('newConsultantAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = 'newConsultantAccount';
        var stateConfig = {
            url: '/new-caccount',
            templateUrl: 'components/consultantNewAccount/template.html',
            title: gettext('New consultant account'),
            controller: 'NewConsultantAccountController'
        };

        routeHelper.registerState(stateName, stateConfig);
        //routeHelper.setDefaultState(stateConfig.url);
    }
})();