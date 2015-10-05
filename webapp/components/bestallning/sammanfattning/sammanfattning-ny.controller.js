(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryNewEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($rootScope, $scope, $state, $filter, mailService, usSpinnerService, $modal) {
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
            _.each($scope.model.steps.newEmployee, function(step) {
                if (_.keys(step.model).length > 0 && !(step.name === 'Sök' || step.name === 'Sammanfattning' || $state.get(step.route).skip)) {
                    $scope.summary[step.name] = step.model;
                }
            });

            return $scope.summary;
        }

        function sendMail() {
            usSpinnerService.spin('sendmail-spinner');
            mailService.sendMail($scope.summary, $scope.model.orderPerson, $scope.model.person)
                .then(mailSent, failedSendingMails);
        }

        function mailSent(response) {
            usSpinnerService.stop('sendmail-spinner');
            var confirmModal = $modal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'components/bestallning/sammanfattning/confirmationModal.html',
                resolve: {
                    mails: function() {
                        return response.data.email;
                    }
                },
                controller: 'ConfirmationModalController'
            });

            confirmModal.result.then(modalClosed, modalClosed);
        }

        function failedSendingMails(error) {
            usSpinnerService.stop('sendmail-spinner');
            $rootScope.alerts = [{
                type: 'danger',
                msg: error.message
            }];
        }

        function modalClosed() {
            $scope.summary = {};
            $scope.model.steps = [];
            $state.go('^');
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