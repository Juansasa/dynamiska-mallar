(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryNewEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, mailService) {
        if (!$scope.model.steps || !$scope.model.steps.newEmployee) {
            $state.go('^');
        }

        init();

        $scope.isOrderDefined = isOrderDefined;        
        $scope.$parent.isSummary = isSummary;
        $scope.$parent.sendMail = sendMail;
        $scope.$parent.removeForm = removeForm;

        function init() {

            if (!$scope.model.ny) {
                return;
            }

            $scope.summary = {};
            _.each($scope.model.steps.newEmployee, function(step){
                if(_.keys(step.model).length > 0 && !(step.name === 'Sök' || step.name === 'Sammanfattning' || $state.get(step.route).skip)) {
                    $scope.summary[step.name] = step.model;
                }
            });

            return $scope.summary;
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