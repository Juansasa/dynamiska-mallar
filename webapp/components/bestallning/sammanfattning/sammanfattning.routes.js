(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper) {
        var states = [{
            stateName: 'bestallning.ny.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state){
                            if(!$scope.model.steps || !$scope.model.steps.newEmployee){
                                $state.go('^');
                            }
                        }
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state){
                            if(!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee){
                                $state.go('^');
                            }
                        }
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state){
                            console.log($scope.model.steps);
                            if(!$scope.model.steps || !$scope.model.steps.existingEmployee){
                                $state.go('^');
                            }
                        }
                    }
                }
            }
        }];

        routeHelper.registerStates(states);
    }
})();