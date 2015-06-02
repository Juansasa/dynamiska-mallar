(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig, gettext) {
        formlyConfig.setType([{
            name: 'infoList',
            wrapper: ['bootstrapLabel'],
            templateUrl: 'shared/formService/infoList.html'
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
                key: 'befattning',
                templateOptions: {
                    showPrevileges: true
                },
                expressionProperties: {
                    'generateIndex': function(v, m, scope) {
                        scope.to.selectedValueIndex = _.findIndex(scope.to.options, function(option) {
                            return option.value === m;
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
                    onChange: function(v, options, scope) {
                        var model = scope.model;
                        model[options.key] = model[options.key] || [];

                        var index = _.findIndex(scope.model[options.key], function(item) {
                            return item.beteckning === scope.to.selectedValue.name;
                        });

                        if (index > -1) {
                            return;
                        }

                        model[options.key].push(options.templateOptions.selectedValue.name);
                        options.templateOptions.selectedValue = null;
                    },
                    removeCallback: function(elem, key, model) {
                        _.remove(model[key], function(v) {
                            return v === elem;
                        });

                        // Perhaps its better to pass in the templateOptions instance instead
                        this.selectedValue = null;
                    }
                }
            }

        }, {
            name: 'autocomplete-select',
            templateUrl: 'shared/formService/autocompleteSelect.html',
            wrapper: ['bootstrapLabel', 'bootstrapHasError']
        }, {
            name: 'signature',
            templateUrl: 'shared/formService/signature.html',
            defaultOptions: {
                templateOptions: {
                    formfields: [{
                        className: 'row',
                        fieldGroup: [{
                            className: 'col-md-12',
                            type: 'textarea',
                            key: 'Övrig information',
                            templateOptions: {
                                label: 'Övrig information',
                                placeholder: 'Övriga information'
                            }
                        }, {
                            className: 'col-md-6',
                            type: 'input',
                            key: 'Dagens datum',
                            templateOptions: {
                                label: 'Dagens datum',
                                type: 'date',
                                disabled: true
                            },
                            expressionProperties: {
                                'init': function(v, m, scope) {
                                    scope.model['Dagens datum'] = new Date();
                                }
                            }
                        }, {
                            className: 'col-md-6',
                            type: 'input',
                            key: 'Rapporterar till (chef)',
                            templateOptions: {
                                label: 'Rapporterar till (chef)',
                                required: true
                            }
                        }, {
                            className: 'col-md-6',
                            type: 'input',
                            key: 'Namn på behörig beställare',
                            templateOptions: {
                                label: 'Namn på behörig beställare',
                                required: true
                            }
                        }, {
                            className: 'col-md-6',
                            type: 'input',
                            key: 'E-postadress på behörig beställare',
                            templateOptions: {
                                label: 'E-postadress på behörig beställare',
                                required: true
                            }
                        }]
                    }]
                }
            }
        }, {
            name: 'today-date',
            extends: 'input',
            defaultOptions: {
                templateOptions: {
                    type: 'date',
                },
                controller: function($scope) {
                    $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || new Date();
                }
            }
        }, {
            name: 'equipment-select',
            extends: 'autoCompleteAdd',
            templateUrl: 'shared/formService/equipment-select.html',
            defaultOptions: {
                controller: function($scope) {
                    $scope.to.ammountField = [{
                        type: 'input',
                        key: 'Antal',
                        templateOptions: {
                            label: 'Antal',
                            type: 'number',
                            min: 0
                        }
                    }];
                },
                templateOptions: {
                    onChange: function(v, options, scope) {
                        var model = scope.model;
                        model[options.key] = model[options.key] || [];

                        var index = _.findIndex(scope.model[options.key], function(item) {
                            return item.beteckning === scope.to.selectedValue.name;
                        });

                        if (index > -1) {
                            return;
                        }

                        model[options.key].push({
                            'beteckning': options.templateOptions.selectedValue.name
                        });
                    },
                }
            }
        }]);
    }
})();