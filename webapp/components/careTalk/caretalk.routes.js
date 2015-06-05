(function() {
    'use strict';

    angular.module('careTalk')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.digital-diktering',
            stateConfig: {
                url: '/digital-diktering',
                modelKey: 'ny.digitaldiktering',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.ny.digitaldiktering" fields="fields"></formly-form>',
                        title: gettext('Digital diktering'),
                        controller: 'CareTalkController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.digital-diktering',
            stateConfig: {
                url: '/digital-diktering',
                modelKey: 'nuvarande.digitaldiktering',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.nuvarande.digitaldiktering" fields="fields"></formly-form>',
                        title: gettext('Digital diktering'),
                        controller: 'CareTalkController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();