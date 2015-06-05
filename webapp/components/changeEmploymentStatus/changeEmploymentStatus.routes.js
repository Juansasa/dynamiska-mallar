(function() {
    'use strict';

    angular.module('changeEmploymentStatus')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.andra.anstallningsforhallande',
            stateConfig: {
                url: '/anstallningsforhallande',
                modelKey: 'andra.anstallningsfarhallande.anstalld',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.andra.anstallningsfarhallande.anstalld" fields="fields"></formly-form>',
                        title: gettext('Ändra anställningsförhållande'),
                        controller: 'ChangeEmploymentStatusController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();