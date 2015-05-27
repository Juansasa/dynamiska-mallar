(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NuvarandeAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {  
        init();

        $scope.$parent.steps = [{
            name: 'Start',
            route: 'bestallning.nuvarande'
        }, {
            name: 'Sammanfattning',
            route: 'bestallning.nuvarande.sammanfattning'
        }];

        $scope.sok = function() {
            if($scope.searchboxValue) {
                $scope.model.person = {};
            }
        };

        function init() {
            $scope.fields.person = forms.person();
            
        }
    }
})();