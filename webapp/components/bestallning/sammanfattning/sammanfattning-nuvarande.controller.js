(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryExistingEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, mailService) {
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
            $state.go('^');
        }

        init();

        $scope.isOrderDefined = isOrderDefined;
        $scope.$parent.isSummary = isSummary;
        $scope.$parent.sendMail = sendMail;
        $scope.$parent.removeForm = removeForm;

        function init() {
            if (!$scope.model.nuvarande) {
                return;
            }

            $scope.summary = {};
            _.each($scope.model.steps.existingEmployee, function(step) {
                if (!(step.name === 'Sök' || step.name === 'Sammanfattning')) {
                    $scope.summary[step.name] = step.model;
                }
            });
        }

        function sendMail() {
            mailService.sendMail($scope.summary, $scope.model.orderPerson, $scope.model.person);
        }

        function isSummary() {
            return $state.current.name === 'bestallning.ny.sammanfattning' || $state.current.name === 'bestallning.nuvarande.sammanfattning';
        }

        function removeForm(key) {
            $scope.summary[key] = null;
        }

        function isOrderDefined(order) {
            return order && !_.isEmpty(order);
        }
    }
})();