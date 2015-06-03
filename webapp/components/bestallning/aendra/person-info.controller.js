(function() {
    'use strict';
    angular.module('bestallning')
        .controller('PersonInfoAndraController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete) {
        if(!$scope.model.person || !$scope.model.person.anstallningstyp){
            $state.go('^');
        }

        init();

        // Ersätt med search call
        $scope.employees = autocomplete.getAllEmployee();

        function init() {
            $scope.model.steps = $scope.model.steps || [{
                name: 'Start',
                route: 'bestallning.andra.personinfo'
            }, {
                name: 'Sammanfattning',
                route: 'bestallning.andra.sammanfattning'
            }];

            if ($scope.model.person && $scope.model.person.anstallningstyp) {
                $state.go('bestallning.andra.personinfo');
            }
        }
    }
})();