(function() {
    'use strict';
    angular.module('bestallning')
        .controller('BestallningController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, manager) {
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

            manager.get().then(function(resp) {
                $scope.model.orderPerson = resp.data;
            }); // Chef information
        }
    }
})();