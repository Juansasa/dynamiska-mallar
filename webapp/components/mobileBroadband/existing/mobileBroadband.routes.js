(function() {
    'use strict';

    angular.module('mobileBroadband')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.nuvarande.mobilbredband',
            stateConfig: {
                url: '/mobilbredband',
                modelKey: 'nuvarande.mobilbredband',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.nuvarande.mobilbredband" fields="fields"></formly-form>',
                        title: gettext('New mobile broadband'),
                        controller: 'NewMobileBroadbandController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();