(function() {
    'use strict';
    angular.module('phoneEquipment')
        .controller('PhoneEquipmentController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee && !$scope.model.steps.newEmployee) {
            $state.go('^');
        }

        $state.current.skip = false;
        $scope.model = $scope.model || {};
        $scope.fields = forms.phoneEquipment($scope.model);
    }
})();