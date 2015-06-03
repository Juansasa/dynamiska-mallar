(function() {
    'use strict';
    angular.module('phoneEquipment')
        .controller('SubscriptionController', subCtrl);

    /*@ngInject*/
    function subCtrl($scope, $state, forms) {
    	if(!$scope.model.steps || !$scope.model.steps.newEmployee){
        	$state.go('^');
        }

        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.newSubscription();
    }
})();