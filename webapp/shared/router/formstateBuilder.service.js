(function() {
    'use strict';
    angular.module('router')
        .factory('formstateBuilder', builder);

    /*@ngInject*/
    function builder($rootScope, gettext) {
        var service = {

            consultantNewAccount: getConsultantNewAccountState(),
            consultantModifyAccount: getConsultantModifyAccountState(),
            consultantExtendAccount: getConsultantExtendAccountState(),

            employeeNewAccount: getEmployeeNewAccountState(),
            employeeModifyAccount: getEmployeeModifyAccountState(),
            employeeExtendAccount: getEmployeeExtendAccountState(),

            careTalk: getCaretalkState(),
            computerAccessories: getComputerAccessoriesState(),
            terminateAccount: getTerminateAccountState(),
            subscription: getSubscriptionState(),
            mobileBroadband: getMobileBroadbandState(),
            phoneEquipment: getPhoneEquipmentState()
        };

        return service;


        function getConsultantNewAccountState() {
            return {
                stateName: 'newAccount',
                stateConfig: {
                    url: '/new-account',
                    templateUrl: 'components/consultantNewAccount/template.html',
                    title: gettext('New Account'),
                    controller: 'NewConsultantAccount',
                    controllerAs: 'vm'
                }
            };
        }

        function getConsultantModifyAccountState() {
            return {

            };
        }

        function getConsultantExtendAccountState() {
            return {

            };
        }

        function getEmployeeNewAccountState() {
            return {

            };
        }

        function getEmployeeModifyAccountState() {
            return {

            };
        }

        function getEmployeeExtendAccountState() {
            return {

            };
        }

        function getCaretalkState() {
            return {

            };
        }

        function getComputerAccessoriesState() {
            return {

            };
        }

        function getTerminateAccountState() {
            return {

            };
        }

        function getSubscriptionState() {
            return {

            };
        }

        function getMobileBroadbandState() {
            return {

            };
        }

        function getPhoneEquipmentState() {
            return {

            };
        }
    }
})();