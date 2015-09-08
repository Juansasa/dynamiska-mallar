(function() {
    'use strict';
    angular.module('bestallning')
        .controller('ConfirmationModalController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $modalInstance, mails) {
        $scope.mails = mails;

        $scope.ok = function ok() {
        	$modalInstance.close();
        };
    }
})();