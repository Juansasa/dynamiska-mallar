(function() {
    'use strict';
    angular.module('mobileBroadband')
        .controller('ModifyMobileBroadbandController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        if (!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee) {
            $state.go('^');
        }

        $scope.model = $scope.model || {};
        $scope.fields = forms.modifyMobileBroadband($scope.model);
    }
})();