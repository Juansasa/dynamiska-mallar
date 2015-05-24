(function() {
    'use strict';

    angular.module('existingEmployment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var states = [{
            stateName: 'existingEmployment',
            stateConfig: {
                url: '/existing',
                templateUrl: 'components/existing-employment/existingEmployment.html',
                title: gettext('Existing employment'),
                controller: 'ExistingEmploymentController'
            }
        }, {
            stateName: 'existingEmployment.start',
            stateConfig: {
                url: '/start',
                templateUrl: 'components/existing-employment/start.html',
                title: gettext('Existing employment'),
                controller: 'ExistingEmploymentController'
            }
        }, {
            stateName: 'existingEmployment.newConsultantAccount',
            stateConfig: {
                url: '/new-caccount',
                templateUrl: 'components/consultantNewAccount/template.html',
                title: gettext('New consultant account'),
                controller: 'NewConsultantAccountController'
            }
        }];

        routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();