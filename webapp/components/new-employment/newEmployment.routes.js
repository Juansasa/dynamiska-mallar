(function() {
    'use strict';

    angular.module('newEmployment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var states = [{
            stateName: 'newEmployment',
            stateConfig: {
                url: '/new',
                templateUrl: 'components/new-employment/newEmployment.html',
                title: gettext('New employment'),
                controller: 'NewEmploymentController'
            }
        }, {
            stateName: 'newEmployment.start',
            stateConfig: {
                url: '/start',
                templateUrl: 'components/new-employment/start.html',
                title: gettext('New employment'),
                controller: 'NewEmploymentController'
            }
        }, {
            stateName: 'newEmployment.summary',
            stateConfig: {
                url: '/summary',
                templateUrl: 'components/new-employment/summary.html',
                title: gettext('Summary'),
                controller: 'NewEmploymentController'
            }
        }, {
            stateName: 'newEmployment.newConsultantAccount',
            stateConfig: {
                url: '/new-caccount',
                templateUrl: 'components/consultantNewAccount/template.html',
                title: gettext('New consultant account'),
                controller: 'NewConsultantAccountController'
            }
        }];

        routeHelper.redirect('/new', '/new/start');
        routeHelper.registerStates(states);
    }
})();