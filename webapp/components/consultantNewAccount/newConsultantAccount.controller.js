(function() {
    'use strict';
    angular.module('newConsultantAccount')
        .controller('NewConsultantAccountController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.newConsultantAccount();
    }
})();