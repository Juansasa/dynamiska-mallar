(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope) {

        $scope.testFields = [{
            key: 'test',
            type: 'employeeSearch',
            templateOptions: {
                label: 'Personalsökning',
                placeholder: 'Fyll i namn på personen du leta efter'
            }
        }, {
            key: 'test',
            type: 'managerSearch',
            templateOptions: {
                label: 'Chefsökning',
                placeholder: 'Fyll i namn på personen du leta efter'
            }
        }, {
            key: 'date',
            type: 'datepicker',
            templateOptions: {
                label: 'Date',
                type: 'text',
                datepickerPopup: 'dd/MMMM/yyyy',
                minDate: new Date(),
                showWeeks: false,
                startingDay: 2
            }
        }];
    }
})();