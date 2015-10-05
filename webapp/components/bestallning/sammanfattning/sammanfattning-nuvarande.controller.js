(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryExistingEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($rootScope, $scope, $state, $modal, mailService, usSpinnerService) {
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
            $state.go('^');
        }

        init();

        $scope.$parent.isSummary = isSummary;
        $scope.$parent.sendMail = sendMail;
        $scope.$parent.removeForm = removeForm;

        function init() {
            if (!$scope.model.nuvarande) {
                return;
            }

            $scope.summary = {};
            _.each($scope.model.steps.existingEmployee, function(step) {
                if (!(_.keys(step.model).length < 1 || step.name === 'Sök' || step.name === 'Sammanfattning')) {
                    $scope.summary[step.name] = step.model;
                }
            });
        }

        function sendMail() {
            usSpinnerService.spin('sendmail-spinner');
            mailService.sendMail($scope.summary, $scope.model.orderPerson, $scope.model.person)
                .then(mailSent, mailsendingfailed);
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

        function mailsendingfailed(error) {
            usSpinnerService.stop('sendmail-spinner');
            $rootScope.addAlert({
                type: 'danger',
                msg: 'Mailutskick misslyckades'
            });
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
    }
})();