(function() {
    'use strict';
    angular.module('bestallning')
        .controller('BestallningController', ctrl);

    /*@ngInject*/
    function ctrl($scope) {
        $scope.currentStep = -1;
        $scope.fields = {};
        $scope.model = $scope.model || {
            person: null, // Personinformation
            chef: null, // Chef information
            forms: null,
            steps: [{
                name: 'Start',
                route: 'bestallning.nuvarande.personinfo'
            }]
        };
    }
})();