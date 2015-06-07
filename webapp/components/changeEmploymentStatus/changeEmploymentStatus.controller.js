(function() {
    'use strict';
    angular.module('changeEmploymentStatus')
        .controller('ChangeEmploymentStatusController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.changeEmploymentStatus();
    }
})();