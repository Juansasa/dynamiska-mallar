(function() {
    'use strict';
    angular.module('newEmployment')
        .controller('NewEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, usSpinnerService, forms, FORMKEYS) {
        var vm = this;
        vm.activeStep = 0;
        vm.model = {};
        vm.steps = [{
            name: 'Anställningsavtal',
            fields: [{
                groupName: 'Person ärende gäller',
                formfields: forms.newPerson()
            }]
        }, {
            name: 'Konto beställning',
            fields: []
        }, {
            name: 'Telefoni',
            fields: []
        }];

        vm.setActive = function(index, step) {
            vm.activeStep = index;
            if (step.name === 'Konto beställning') {
                step.fields = [{
                    groupName: 'Nytt konto',
                    formfields: getNewAccountFields()
                }];
            }
        };

        vm.onSubmit = function() {
            console.log(vm.steps);
        };

        function getNewAccountFields() {
            return vm.model[FORMKEYS.person.employmentType] && vm.model[FORMKEYS.person.employmentType] === 'employee' ?
                forms.newEmployeeAccount() : forms.newConsultantAccount();
        }
    }
})();