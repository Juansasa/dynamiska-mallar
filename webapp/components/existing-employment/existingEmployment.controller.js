(function() {
    'use strict';
    angular.module('existingEmployment')
        .controller('ExistingEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.steps = [{
            name: 'start',
            route: '.start'
        }, {
            name: 'New account',
            route: '.newConsultantAccount'
        }];

        $scope.onSubmit = function() {
            console.log($scope.model);
        };
    }
})();