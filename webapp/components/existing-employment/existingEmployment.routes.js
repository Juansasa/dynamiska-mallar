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
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'components/existing-employment/existingEmployment.html',
                        title: gettext('Existing employment'),
                        controller: 'ExistingEmploymentController',
                    },
                    'wizHeader@existingEmployment': {
                        templateUrl: 'components/wizard/template.html',
                        controller: 'WizardController'
                    },
                    'wizContent@existingEmployment': {
                        templateUrl: 'components/existing-employment/start.html',
                        title: gettext('Existing employment'),
                        controller: 'ExistingEmploymentController'
                    },
                    'wizFooter@existingEmployment': {
                        templateUrl: 'components/wizard-footer/template.html',
                        controller: 'WizardFooterController'
                    }
                }
            }
        }, {
            stateName: 'existingEmployment.start',
            stateConfig: {
                url: '/start',
                views: {
                    'wizContent@existingEmployment': {
                        templateUrl: 'components/existing-employment/start.html',
                        title: gettext('Existing employment'),
                    }
                }
            }
        }, {
            stateName: 'existingEmployment.summary',
            stateConfig: {
                url: '/summary',
                views: {
                    'wizContent@existingEmployment': {
                        templateUrl: 'components/existing-employment/summary.html',
                        title: gettext('Summary'),
                        controller: 'ExistingEmploymentController'
                    }
                }
            }
        }, {
            stateName: 'existingEmployment.newConsultantAccount',
            stateConfig: {
                url: '/account',
                views: {
                    'wizContent@existingEmployment': {
                        templateUrl: function($stateParams) {
                            console.log($stateParams);
                            return 'components/consultantNewAccount/template.html';
                        },
                        title: gettext('New consultant account'),
                        controller: 'NewConsultantAccountController'
                    }
                }
            }
        }, {
            stateName: 'existingEmployment.mobileBroadband',
            stateConfig: {
                url: '/mobile-broadband',
                views: {
                    'wizContent@existingEmployment': {
                        templateUrl: 'components/mobileBroadband/template.html',
                        title: gettext('New mobile broadband'),
                        controller: 'MobileBroadbandController'
                    }
                }
            }
        }, {
            stateName: 'existingEmployment.start.personInfo',
            stateConfig: {
                url: '',
                views: {
                    'personalInfo@existingEmployment.start': {
                        templateUrl: 'components/existing-employment/person-info.html'
                    }
                }
            }
        }];

        routeHelper.redirect('/existing', 'existing/start');
        routeHelper.registerStates(states);
    }
})();