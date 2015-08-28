(function() {
    'use strict';
    angular.module('changeEmploymentStatus')
        .controller('ChangeEmploymentStatusController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
    	if(!$scope.model.steps || !$scope.model.steps.existingEmployee){
            $state.go('^');
        }
        // Make sure to only use one model for all states
        $state.current.skip = false;
        $scope.model = $scope.model || {};
        $scope.fields = forms.changeEmploymentStatus();
    }
})();