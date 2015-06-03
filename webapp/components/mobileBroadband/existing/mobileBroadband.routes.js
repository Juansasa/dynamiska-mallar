(function() {
    'use strict';

    angular.module('mobileBroadband')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.andra.mobilbredband',
            stateConfig: {
                url: '/mobilbredband',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.andra.mobilbredband" fields="fields"></formly-form>',
                        title: gettext('Ändring/Uppsägning av mobilt bredband'),
                        controller: 'ModifyMobileBroadbandController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();