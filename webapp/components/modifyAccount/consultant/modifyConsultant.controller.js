(function() {
    'use strict';
    angular.module('modifyAccount')
        .controller('ModifyConsultantAccountController', subCtrl);

    /*@ngInject*/
    function subCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
            $state.go('^.^');
        }

        $scope.model = $scope.model || {};
        $scope.formSelectfields = [{
            className: 'col-md-12',
            type: 'radio',
            key: 'Beställningen avser',
            templateOptions: {
                label: 'Välj en formulär',
                options: [{
                    name: 'Ändring av konto',
                    value: 'Ändring av konto'
                }, {
                    name: 'Förlängning av konto',
                    value: 'Förlängning av konto'
                }],
                data: {
                    setField: setFormFields
                },
                onChange: function(value, options, scope) {
                    scope.init();
                }
            },
            controller: /*@ngInject*/ function($scope) {
                init();

                $scope.init = init;

                function init() {
                    var value = $scope.model[$scope.options.key];
                    switch (value) {
                        case 'Ändring av konto':
                            $scope.to.data.setField(value, forms.modifyConsultantAccount(getModel()));
                            break;
                        case 'Förlängning av konto':
                            $scope.to.data.setField(value, forms.extendConsultantAccount(getModel()));
                            break;
                        default:
                            break;
                    }
                }
            }
        }];


        function getModel() {
            return $scope.model;
        }

        function setFormFields(option, fields) {
            $scope.formFields = fields;
            $scope.model.nuvarande.konsult.andraKonto = $scope.model.nuvarande.konsult.andraKonto || {};
            $scope.model.nuvarande.konsult.andraKonto['Beställningen avser'] = option;
        }
    }
})();