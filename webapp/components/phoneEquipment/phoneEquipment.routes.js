(function() {
    'use strict';

    angular.module('phoneEquipment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.telefoniutrustning',
            stateConfig: {
                url: '/telefoniutrustning',
                modelKey: 'ny.telefonutrustning',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.ny.telefonutrustning" fields="fields"></form-form>',
                        title: gettext('Telefonutrustning'),
                        controller: 'PhoneEquipmentController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.telefoniutrustning',
            stateConfig: {
                url: '/telefoniutrustning',
                modelKey: 'nuvarande.telefonutrustning',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.nuvarande.telefonutrustning" fields="fields"></form-form>',
                        title: gettext('Telefonutrustning'),
                        controller: 'PhoneEquipmentController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();