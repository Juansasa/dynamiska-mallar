(function() {
    'use strict';
    angular.module('modifyAccount')
        .controller('ModifyConsultantAccountController', subCtrl);

    /*@ngInject*/
    function subCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        // if(!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee){
        // 	$state.go('^.^');
        // }

        $scope.model = $scope.model || {};
        $scope.fields = forms.modifyConsultantAccount();
    }
})();