(function() {
    'use strict';
    angular.module('removeAccount')
        .controller('RemoveAccountController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.removeAccount($scope.model);
    }
})();