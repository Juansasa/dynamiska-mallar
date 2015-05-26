(function() {
    'use strict';

    angular.module('wizard')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var state = {
            stateName: 'wizard',
            stateConfig: {
                url: '/wizard',
                views: {
                    'wizard': {
                        templateUrl: 'components/wizard/template.html',
                        controller: 'WizardController'
                    }
                }
            }
        };

        routeHelper.registerState(state.stateName, state.stateConfig);
    }
})();