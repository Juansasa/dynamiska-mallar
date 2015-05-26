(function() {
    'use strict';
    angular.module('existingEmployment')
        .controller('ExistingEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {
            employmentType: 'konsult'
        };
        $scope.form = $scope.form || {};
        $scope.fields = forms.person();
        $scope.currentStep = 0;
        $scope.steps = $scope.steps || {
            fields: [{
                className: 'wizardStep-selector',
                type: 'multiCheckbox',
                key: 'wizard',
                templateOptions: {
                    label: 'Välj blanket eller blanketter som ska utföras',
                    options: [{
                        name: 'Nytt konto',
                        value: {
                            name: 'Nytt konto',
                            route: '.newConsultantAccount'
                        }
                    }, {
                        name: 'Mobil bredband',
                        value: {
                            name: 'Mobil bredband',
                            route: '.mobileBroadband'
                        }
                    }]
                }
            }]
        };
    }
})();