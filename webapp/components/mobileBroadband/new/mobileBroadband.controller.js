(function() {
    'use strict';
    angular.module('mobileBroadband')
        .controller('NewMobileBroadbandController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, $state, forms) {
    	if(!$scope.model.steps || !$scope.model.steps.newEmployee){
        	$state.go('^');
        }

        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.newMobileBroadband();
    }
})();