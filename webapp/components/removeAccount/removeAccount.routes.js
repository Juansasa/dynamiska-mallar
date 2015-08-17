(function() {
    'use strict';

    angular.module('removeAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.nuvarande.avsluta',
            stateConfig: {
                url: '/avsluta-konto',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/removeAccount/template.html',
                        title: gettext('Avsluta konto'),
                        controller: 'RemoveAccountController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();