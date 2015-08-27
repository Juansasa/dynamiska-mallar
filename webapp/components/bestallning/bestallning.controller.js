(function() {
    'use strict';
    angular.module('bestallning')
        .controller('BestallningController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, adService) {
        modelReset();

        $scope.goToState = function(nextState) {
            if ($scope.form.$valid) {
                $state.go(nextState.route);
            }
        };

        $scope.isCurrent = function(state) {
            return state && $state.current.name === state.route;
        };

        function modelReset() {
            $scope.currentStep = -1;
            $scope.fields = {};
            $scope.model = $scope.model || {
                person: null, // Personinformation
                steps: {
                    newEmployee: null,
                    modifyExistingEmployee: null
                }
            };

            $scope.model.orderPerson = adService.loggedUser;
        }
    }
})();