(function() {
    'use strict';
    angular.module('newEmployment')
        .controller('NewEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, usSpinnerService, forms) {
        var vm = this;
        vm.activeStep = 0;
        vm.model = {};
        vm.steps = [{
            name: 'Anställningsavtal',
            fields: [
            {
                groupName: 'Person ärende gäller',
                formfields: forms.newPerson()
            }]
        }, {
            name: 'Konto',
            fields: []

        }, {
            name: 'Telefoni',
            fields: []
        }];

        vm.setActive = function(index) {
            vm.activeStep = index;
        };

        vm.onSubmit = function() {
            console.log(vm.model);
        };
    }
})();