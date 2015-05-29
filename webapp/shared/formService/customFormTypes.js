(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig, gettext) {
        formlyConfig.setType([{
            name: 'titleRadio',
            extends: 'checkbox',
            templateUrl: 'shared/formService/titleRadio.html'
        }, {
            name: 'personNo',
            extends: 'input',
            defaultOptions: {
                className: 'col-md-12',
                type: 'input',
                key: 'Personnummer',
                templateOptions: {
                    label: gettext('Personnummer'),
                    required: true,
                    placeholder: 'ååmmdd-xxxx',
                    pattern: '[0-9]{6}-[0-9]{4}'
                }
            }
        }, {
            name: 'personName',
            template: '<formly-form model="model[options.key]" fields="options.data.forms"></form-form>',
            defaultOptions: {
                data: {
                    forms: [{
                        className: 'row',
                        fieldGroup: [{
                            className: 'col-md-4',
                            type: 'input',
                            key: 'förnamn',
                            templateOptions: {
                                label: 'Förnamn',
                                required: true
                            }
                        }, {
                            className: 'col-md-4',
                            type: 'input',
                            key: 'mellannamn',
                            templateOptions: {
                                label: 'Mellannamn'
                            }
                        }, {
                            className: 'col-md-4',
                            type: 'input',
                            key: 'Efternamn',
                            templateOptions: {
                                label: 'efternamn',
                                required: true
                            }
                        }]
                    }]
                }
            }
        }, {
            name: 'adress',
            template: '<formly-form model="model[options.key]" fields="options.data.forms"></form-form>',
            defaultOptions: {
                data: {
                    forms: [{
                        className: 'row',
                        fieldGroup: [{
                            className: 'col-md-6',
                            type: 'input',
                            key: 'gata',
                            templateOptions: {
                                label: 'Gata',
                                required: true
                            }
                        }, {
                            className: 'col-md-3',
                            type: 'input',
                            key: 'postnummer',
                            templateOptions: {
                                type: 'number',
                                required: true,
                                label: 'Postnummer',
                                max: 99999,
                                min: 0,
                                pattern: '\\d{5}'
                            }
                        }, {
                            className: 'col-md-3',
                            type: 'input',
                            key: 'ort',
                            templateOptions: {
                                label: 'Ort',
                                required: true
                            }
                        }]
                    }, {
                        className: 'col-md-12',
                        type: 'input',
                        key: 'c/o',
                        templateOptions: {
                            label: 'Ev c/o adress',
                            required: true
                        }
                    }]
                }
            }
        }, {
            name: 'telefon',
            template: '<formly-form model="model[options.key]" fields="options.data.forms"></form-form>',
            defaultOptions: {
                data: {
                    forms: [{
                        className: 'row',
                        fieldGroup: [{
                            className: 'col-md-6',
                            type: 'input',
                            key: 'hem',
                            templateOptions: {
                                label: 'Hem telefon',
                                type: 'tel',
                                placeholder: 'xxxx-xxxxx',
                                pattern: '[0-9]{0,4}-[0-9]{5,8}'
                            }
                        }, {
                            className: 'col-md-6',
                            type: 'input',
                            key: 'mobil',
                            templateOptions: {
                                label: 'Mobil',
                                type: 'tel',
                                placeholder: 'xxxx-xxxxx',
                                pattern: '[0-9]{0,4}-[0-9]{5,8}'
                            }
                        }]
                    }]
                }
            }
        }, {
            name: 'tjanstestalleSelect',
            templateUrl: 'shared/formService/tjanstestalle.html',
            wrapper: ['bootstrapLabel'],
            defaultOptions: {
                templateOptions: {
                    onChange: function(v, m, scope) {
                        scope.to.selectedValueIndex = _.findIndex(scope.to.options, function(option) {
                            return option.value === m.value();
                        });
                    }
                }
            }
        }, {
            name: 'roleSelect',
            templateUrl: 'shared/formService/roleSelect.html',
            wrapper: ['bootstrapLabel'],
            defaultOptions: {
                templateOptions: {
                    onChange: function(v, m, scope) {
                        scope.to.selectedValueIndex = _.findIndex(scope.to.options, function(option) {
                            return option.value === m.value();
                        });
                    }
                }
            }
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

                    if (to.pre) {
                        checked = [to.pre].concat(checked);
                    }

                    if (to.post) {
                        checked = checked.concat(to.post);
                    }
                    $scope.model[opts.key] = checked;
                }
            }
        }, {
            name: 'autoCompleteAdd',
            extends: 'tjanstestalleSelect',
            templateUrl: 'shared/formService/secondary-tjanstestalle.html',
            defaultOptions: {
                templateOptions: {
                    addCallback: function(value, model) {
                        console.log(model);
                    },
                    removeCallback: function(value, model) {
                        console.log(value);
                    }
                }
            }

        }]);
    }
})();