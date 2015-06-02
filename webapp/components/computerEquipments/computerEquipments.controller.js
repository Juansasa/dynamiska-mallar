(function() {
    'use strict';
    angular.module('computerEquipments')
        .controller('ComputerEquipmentsController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.computerAccessories();
    }
})();