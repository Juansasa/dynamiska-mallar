(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, adService) {
        $scope.user = adService.loggedUser;
    }
})();