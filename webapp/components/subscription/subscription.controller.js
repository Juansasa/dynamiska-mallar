(function() {
    'use strict';
    angular.module('phoneEquipment')
        .controller('SubscriptionController', subCtrl);

    /*@ngInject*/
    function subCtrl($scope, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.subscription();
    }
})();