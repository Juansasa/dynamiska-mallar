(function() {
    'use strict';
    angular.module('bestallning')
        .controller('PersonInfoAndraController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete) {
        if(!$scope.model.person || !$scope.model.person.anstallningstyp){
            $state.go('^');
        }

        // Ersätt med search call
        $scope.employees = autocomplete.getAllEmployee();
    }
})();