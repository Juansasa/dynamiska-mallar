(function() {
    'use strict';
    angular.module('existingEmployment')
        .controller('ExistingEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};

        $scope.onSubmit = function() {
            console.log($scope);
        };
    }
})();