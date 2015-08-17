(function() {
    'use strict';

    angular.module('modifyAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.nuvarande.anstalld.forandring-konto',
            stateConfig: {
                url: '/forandring-konto',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/modifyAccount/employee/template.html',
                        title: gettext('Förändring konto'),
                        controller: 'ModifyEmployeeAccountController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();