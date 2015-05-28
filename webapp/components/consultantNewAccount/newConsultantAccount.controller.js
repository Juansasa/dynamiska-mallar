(function() {
    'use strict';
    angular.module('newConsultantAccount')
        .controller('NewConsultantAccountController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, $state, forms) {
        // Rerouting when refreshing page from url
        if ($scope.model.steps && $scope.model.steps.length < 1) {
            $state.go('bestallning');
        }
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.newConsultantAccount();
    }
})();