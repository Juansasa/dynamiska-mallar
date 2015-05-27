(function() {
    'use strict';
    angular.module('bestallning')
        .controller('BestallningController', ctrl);

    /*@ngInject*/
    function ctrl($scope) {
        $scope.currentStep = -1;   
        $scope.steps = [];
        $scope.fields = {};
        $scope.model = $scope.model || {
            person: null,  // Personinformation
            chef: null,    // Chef information
            konsult: null, // Konsult formulärer
            anstalld: null,// Previa anställda formulär
            generell: null // Generella formulärer
        };
    }
})();