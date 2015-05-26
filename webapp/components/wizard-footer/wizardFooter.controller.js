(function() {
    'use strict';
    angular.module('wizard-footer')
        .controller('WizardFooterController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};

        $scope.previous = function() {
            var index = findStateIndex($state.current);
            if(index < 0) {
                if($state.current.name.endsWith('.summary')) {
                    $state.go('existingEmployment' + $scope.model.wizard[$scope.model.wizard.length - 1].route);
                }
            } else {
                if(index === 0) {
                    $state.go('existingEmployment.start');
                } else {
                    $state.go('existingEmployment' + $scope.model.wizard[index - 1].route);
                }
            }
        };

        $scope.next = function() {
            var index = findStateIndex($state.current);
            if(index < 0) {
                if($state.current.name.endsWith('.personInfo')) {
                    $state.go('existingEmployment' + $scope.model.wizard[0].route);
                }
            } else {
                if(index === ($scope.model.wizard.length - 1)) {
                    $state.go('existingEmployment.summary');
                } else {
                    $state.go('existingEmployment' + $scope.model.wizard[index + 1].route);
                }
            }
        };

        $scope.checkGoBack = function() {
            return $state.current.name.endsWith('.personInfo') || $state.current.name.endsWith('.start');
        };

        $scope.checkGoForward = function() {
            return !$scope.model.wizard || !$scope.model.wizard.length || $state.current.name.endsWith('.summary');
        };


        function findStateIndex(state) {
            return _.findIndex($scope.model.wizard, function(step) {
                return state.name.endsWith(step.route);
            });
        }
    }
})();