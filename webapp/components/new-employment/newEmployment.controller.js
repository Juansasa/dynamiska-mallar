(function() {
    'use strict';
    angular.module('newEmployment')
        .controller('NewEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, usSpinnerService) {
        var vm = this;

        vm.model = {
            firstname: 'Obi wan',
            options: null
        };

        vm.fields = [{
            type: 'input',
            key: 'firstname',
            templateOptions: {
                label: 'First name'
            }
        }, {
            type: 'select',
            key: 'options',
            templateOptions: {
                label: 'Select something',
                valueProp: 'name',
                options: [{
                    name: 'Car'
                }, {
                    name: 'Helicopter'
                }, {
                    name: 'Sport Utility Vehicle'
                }, {
                    name: 'Bicycle',
                    group: 'low emissions'
                }, {
                    name: 'Skateboard',
                    group: 'low emissions'
                }, {
                    name: 'Walk',
                    group: 'low emissions'
                }, {
                    name: 'Bus',
                    group: 'low emissions'
                }, {
                    name: 'Scooter',
                    group: 'low emissions'
                }, {
                    name: 'Train',
                    group: 'low emissions'
                }, {
                    name: 'Hot Air Baloon',
                    group: 'low emissions'
                }]
            }
        }];

        vm.onSubmit = function() {
            console.log(vm.model);
        };
    }
})();