(function() {
    'use strict';

    angular.module('newConsultantAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.ny.datorutrustning',
            stateConfig: {
                url: '/datorutrustning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/computerEquipments/template.html',
                        title: gettext('Datorutrustning'),
                        controller: 'ComputerEquipmentsController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();