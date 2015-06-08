(function() {
    'use strict';

    angular.module('modifyAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.andra.konsult.forandring-konto',
            stateConfig: {
                url: '/forandring-konto',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/modifyAccount/consultant/template.html',
                        title: gettext('Förändring konto'),
                        controller: 'ModifyConsultantAccountController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();