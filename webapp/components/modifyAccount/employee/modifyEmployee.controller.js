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
            className: 'col-md-12',
            type: 'radio',
            key: 'Vald formulär',
            templateOptions: {
                label: 'Välj en formulär',
                options: [{
                    name: 'Ändra Konto',
                    value: 'Ändra Konto'
                }, {
                    name: 'Förläng Konto',
                    value: 'Förläng Konto'
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
                        case 'Ändra Konto': 
                            $scope.to.data.setField(value, forms.modifyEmployeeAccount(getModel()));
                            break;
                        case 'Förläng Konto':
                            $scope.to.data.setField(value, forms.extendEmployeeAccount(getModel()));
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
            $scope.model.andra.konto['anställd'] = $scope.model.andra.konto['anställd'] || {};
            if($scope.model.andra.konto['anställd']) {
                $scope.model.andra.konto['anställd']['Vald formulär'] = option;
            }
        }
    }
})();