(function() {
    'use strict';
    angular.module('mobileBroadband')
        .controller('MobileBroadbandController', mbCtrl);

    /*@ngInject*/
    function mbCtrl($scope, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.mobileBroadband();
    }
})();