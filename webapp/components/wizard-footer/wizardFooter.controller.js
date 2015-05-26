(function() {
    'use strict';
    angular.module('wizard-footer')
        .controller('WizardFooterController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.currentState = $state.current;

        $scope.previous = function() {
            var index = findStateIndex($scope.currentState);
            if (index < 0) {
                $state.go('existingEmployment.start');
            } else {
                $state.go($scope.model.wizard[index < $scope.model.wizard.length ? index + 1 : index].route);
            }
        };

        $scope.next = function() {
        	if(!$scope.model.wizard.length) {
        		return;
        	}

            var index = findStateIndex($scope.currentState);
            index = index === $scope.model.wizard.length ? index : index + 1;
            $state.go($scope.model.wizard[index].route);
        };


        function findStateIndex(state) {
            return _.findIndex($scope.model.wizard, function(step) {
                return state.name.endsWith(step.route);
            });
        }
    }
})();