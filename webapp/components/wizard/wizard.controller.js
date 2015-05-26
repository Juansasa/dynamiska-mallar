(function() {
    'use strict';
    angular.module('wizard')
        .controller('WizardController', ctrl);

    /*@ngInject*/
    function ctrl($scope) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
    }
})();