(function() {
    'use strict';
    angular.module('phoneEquipment')
        .controller('PhoneEquipmentController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.phoneEquipment();
    }
})();