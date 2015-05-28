(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig) {
        formlyConfig.setType([{
            name: 'titleRadio',
            extends: 'checkbox',
            templateUrl: 'shared/formService/titleRadio.html'
        }, {
            name: 'plainInput',
            template: '<input class="form-control" ng-model="model[options.key]">',
            wrapper: ['bootstrapHasError']
        }, {
            name: 'equipmentTable',
            templateUrl: 'shared/formService/equipmentTable.html'
        }, {
            name: 'plainRadio',
            extends: 'radio',
            wrapper: ['bootstrapHasError']
        }, {
            name: 'formSelection',
            extends: 'multiCheckbox',
            wrapper: ['bootstrapHasError'],
            controller: function($scope) {
                const to = $scope.to;
                const opts = $scope.options;
                $scope.multiCheckbox = {
                    checked: [],
                    change: setModel
                };

                // initialize the checkboxes check property
                const modelValue = $scope.model[opts.key];
                if (angular.isArray(modelValue)) {
                    const valueProp = to.valueProp || 'value';
                    angular.forEach(to.options, function(v, index) {
                        $scope.multiCheckbox.checked[index] = modelValue.indexOf(v[valueProp]) !== -1;
                    });
                }

                function setModel() {
                    var checked = [];
                    angular.forEach($scope.multiCheckbox.checked, function(checkbox, index) {
                        if (checkbox) {
                            checked.push(to.options[index][to.valueProp || 'value']);
                        }
                    });

                    if(to.pre){
                        checked = [to.pre].concat(checked);
                    }

                    if(to.post) {
                        checked = checked.concat(to.post);
                    }
                    $scope.model[opts.key] = checked;
                }
            }
        }]);
    }
})();