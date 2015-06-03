(function() {
    'use strict';

    angular.module('subscription')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.andra.abonnemang',
            stateConfig: {
                url: '/abonnemang',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.andra.abonnemang" fields="fields"></form-form>',
                        title: gettext('Abonnemang'),
                        controller: 'SubscriptionChangeController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.abonnemang',
            stateConfig: {
                url: '/abonnemang',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.nuvarande.abonnemang" fields="fields"></form-form>',
                        title: gettext('Abonnemang'),
                        controller: 'SubscriptionChangeController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();