(function() {
    'use strict';
    angular.module('bestallning')
        .controller('PersonInfoAndraController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete) {
        if(!$scope.model.person || !$scope.model.person['Anställningstyp']){
            $state.go('^');
        }
        $scope.employees = autocomplete.getAllEmployee();
    }
})();