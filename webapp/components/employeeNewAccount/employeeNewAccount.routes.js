(function() {
    'use strict';

    angular.module('employeeNewAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var states = [{
            stateName: 'bestallning.ny.anstalld.nytt-konto',
            stateConfig: {
                url: '/nytt-konto',
                modelKey: 'ny.anstalld.nyttKonto',
                views: {
                    'wizardContent@bestallning': {
                        url: '/new-caccount',
                        template: '<formly-form model="model.ny.anstalld.nyttKonto" fields="fields"></formly-form>',
                        title: gettext('New consultant account'),
                        controller: 'NewEmployeeAccountController'
                    }
                }
            }
        }];

        routeHelper.registerStates(states);
    }
})();