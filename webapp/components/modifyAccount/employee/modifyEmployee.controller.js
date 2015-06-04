(function() {
    'use strict';
    angular.module('modifyAccount')
        .controller('ModifyEmployeeAccountController', subCtrl);

    /*@ngInject*/
    function subCtrl($scope, $state, forms) {
        // Make sure to only use one model for all states
        if(!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee){
        	$state.go('^.^');
        }

        $scope.model = $scope.model || {};
        $scope.formSelectfields = [{
            className: 'row',
            type: 'select',
            key: 'Vald formulär',
            templateOptions: {
                label: 'Välj en formulär',
                options: [{
                    name: 'Förändring Konto',
                    value: 'Förändring Konto'
                }, {
                    name: 'Förlängning Konto',
                    value: 'Förlängning Konto'
                }],
                data: {
                    setField: setFormFields
                },
                onChange: function(value, options, scope) {
                    scope.init();
                }
            },
            controller: function($scope) {
                init();

                $scope.init = init;
                function init() {
                    var value = $scope.model[$scope.options.key];
                    if (value) {
                        if (value === 'Förändring Konto') {
                            $scope.to.data.setField(value, forms.modifyEmployeeAccount());
                        } else {
                            $scope.to.data.setField(value, forms.extendEmployeeAccount());
                        }
                    }
                }
            }
        }];

        function setFormFields(option, fields) {
            $scope.formFields = fields;
            $scope.model.andra.konto['anställd'] = {
                'Vald formulär': option
            };
        }
    }
})();