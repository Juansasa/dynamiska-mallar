(function() {
    'use strict';
    angular.module('computerEquipments')
        .controller('ComputerEquipmentsController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
    	if (!$scope.model.steps || !$scope.model.steps.existingEmployee && !$scope.model.steps.newEmployee) {
            $state.go('^');
        }
        
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.computerAccessories($scope.model);
    }
})();