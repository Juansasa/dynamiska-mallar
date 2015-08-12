(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, adService) {
        adService.getManager().then(function(response){
            $scope.user = response;
        })
    }
})();