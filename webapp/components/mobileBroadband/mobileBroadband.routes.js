(function() {
    'use strict';

    angular.module('mobileBroadband')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.mobilbredband',
            stateConfig: {
                url: '/mobilbredband',
                modelKey: 'ny.mobilbredband',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.ny.mobilbredband" fields="fields"></formly-form>',
                        title: gettext('New mobile broadband'),
                        controller: 'NewMobileBroadbandController'
                    }
                }
            }
        }, {
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