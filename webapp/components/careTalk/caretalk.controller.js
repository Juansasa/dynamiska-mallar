(function() {
    'use strict';
    angular.module('careTalk')
        .controller('CareTalkController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.careTalk();
    }
})();