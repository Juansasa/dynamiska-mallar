(function() {
    'use strict';

    angular.module('subscription')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.abonnemang',
            stateConfig: {
                url: '/abonnemang',
                modelKey: 'ny.abonnemang',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.ny.abonnemang" fields="fields"></form-form>',
                        title: gettext('Abonnemang'),
                        controller: 'SubscriptionController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.abonnemang',
            stateConfig: {
                url: '/abonnemang',
                modelKey: 'nuvarande.abonnemang',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.nuvarande.abonnemang" fields="fields"></form-form>',
                        title: gettext('Abonnemang'),
                        controller: 'SubscriptionController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();