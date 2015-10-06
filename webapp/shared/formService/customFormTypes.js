(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig, $filter, gettext, adService) {
        function getDatepickerNgattrs() {
            var attributes = [
                'show-weeks',
                'starting-day',
                'min-mode',
                'max-mode',
                'format-day',
                'format-month',
                'format-year',
                'format-day-header',
                'format-day-title',
                'format-month-title',
                'year-range',
                'shortcut-propagation',
                'datepicker-popup',
                'show-button-bar',
                'current-text',
                'clear-text',
                'close-text',
                'close-on-date-selection',
                'datepicker-append-to-body'
            ];

            var bindings = [
                'datepicker-mode',
                'min-date',
                'max-date'
            ];

            var statement = [
                'date-disabled',
                'custom-class'
            ];

            var ngModelAttrs = {};

            angular.forEach(attributes, function(attr) {
                ngModelAttrs[_.camelCase(attr)] = {
                    attribute: attr
                };
            });

            angular.forEach(bindings, function(binding) {
                ngModelAttrs[_.camelCase(binding)] = {
                    bound: binding
                };
            });

            angular.forEach(statement, function(binding) {
                ngModelAttrs[_.camelCase(binding)] = {
                    statement: binding
                };
            });

            return ngModelAttrs;
        }

        formlyConfig.setType([{
                name: 'employeeSearch',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                templateUrl: 'shared/formService/employeeSearch.html',
                defaultOptions: {
                    className: 'has-feedback has-feedback-right',
                    templateOptions: {
                        placeholder: 'Fyll i namn på personen du leta efter'
                    }
                },
                controller: /*@ngInject*/ function($scope) {
                    $scope.getPersons = getPersons;

                    function getPersons(queryString) {
                        return adService.searchUser(queryString).then(success, error);
                    }

                    function success(response) {
                        return _.take(response.data, 15);
                    }

                    function error(err) {
                        $scope.isLoading = false;
                        return err.message;
                    }
                }
            }, {
                name: 'managerSearch',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                templateUrl: 'shared/formService/managerSearch.html',
                defaultOptions: {
                    className: 'has-feedback has-feedback-right',
                    templateOptions: {
                        placeholder: 'Fyll i namn på personen du leta efter'
                    },
                    validation: {
                        show: true
                    }
                },
                controller: /*@ngInject*/ function($scope) {
                    init();

                    $scope.byFullName = byFullName;

                    function byFullName(value) {
                        var input = $scope.model[$scope.options.key];
                        var name = value.name.firstname + ' ' + value.name.lastname;

                        return name.toLowerCase().indexOf(input.toLowerCase()) > -1;
                    }

                    function init(queryString) {
                        return adService.getAllManagers(queryString).then(success, error);
                    }

                    function success(response) {
                        $scope.managers = response.data;
                    }

                    function error(err) {
                        $scope.isLoading = false;
                        return err.message;
                    }
                }
            }, {
                name: 'datepicker',
                templateUrl: 'shared/formService/datepickerTpl.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    ngModelAttrs: getDatepickerNgattrs(),
                    templateOptions: {
                        datepickerPopup: 'dd/MMMM/yyyy'
                    },
                    validation: {
                        show: true
                    }
                },
                controller: /*@ngInject*/ function($scope) {
                    $scope.model[$scope.options.key] = new Date();
                    $scope.datepicker = {
                        opened: false
                    };

                    $scope.datepicker.open = function() {
                        $scope.datepicker.opened = true;
                    };
                }
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
                    },
                    validation: {
                        show: true
                    }
                }
            },









            {
                name: 'infoList',
                wrapper: ['bootstrapLabel'],
                templateUrl: 'shared/formService/infoList.html',
                controller: /*@ngInject*/ function($scope) {
                    $scope.model['Standardbehörighet för samtliga roller och befattningar'] = $scope.to.options;
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
                                },
                                validation: {
                                    show: true
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
                                key: 'efternamn',
                                templateOptions: {
                                    label: 'Efternamn',
                                    required: true
                                },
                                validation: {
                                    show: true
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
                                    label: 'Hemadress',
                                    required: true
                                },
                                validation: {
                                    show: true
                                }
                            }, {
                                className: 'col-md-3',
                                type: 'input',
                                key: 'postnummer',
                                templateOptions: {
                                    type: 'number',
                                    required: true,
                                    label: 'Postnummer',
                                    pattern: '\\d{5}'
                                },
                                validation: {
                                    show: true
                                }
                            }, {
                                className: 'col-md-3',
                                type: 'input',
                                key: 'ort',
                                templateOptions: {
                                    label: 'Ort',
                                    required: true
                                },
                                validation: {
                                    show: true
                                }
                            }]
                        }, {
                            className: 'col-md-12',
                            type: 'input',
                            key: 'c/o',
                            templateOptions: {
                                label: 'Ev c/o adress'
                            },
                            validation: {
                                show: true
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
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        placeholder: 'Välj i listan',
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
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    key: 'befattning',
                    templateOptions: {
                        showPrevileges: true,
                        placeholder: 'Välj i listan'
                    },
                    expressionProperties: {
                        'generateIndex': function(v, m, scope) {
                            if (!m) {
                                return;
                            }

                            scope.to.selectedValueIndex = _.findIndex(scope.to.options, function(option) {
                                return option.value === m.name;
                            });
                        }
                    }
                }
            }, {
                name: 'plainInput',
                template: '<input class="form-control" ng-model="model[options.key]">',
                wrapper: ['bootstrapHasError']
            }, {
                name: 'plainRadio',
                extends: 'radio',
                wrapper: ['bootstrapHasError']
            }, {
                name: 'formSelection',
                extends: 'multiCheckbox',
                wrapper: ['bootstrapHasError'],
                controller: /*@ngInject*/ function($scope) {
                    var to = $scope.to;
                    var opts = $scope.options;
                    $scope.multiCheckbox = {
                        checked: [],
                        change: setModel
                    };

                    // initialize the checkboxes check property
                    var modelValue = $scope.model[opts.key];
                    if (angular.isArray(modelValue)) {
                        var valueProp = to.valueProp || 'value';
                        angular.forEach(to.options, function(v, index) {
                            var stepindex = _.findIndex(modelValue, function(step) {
                                return step.route === v[valueProp].route;
                            });
                            $scope.multiCheckbox.checked[index] = stepindex > -1;
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
                templateUrl: 'shared/formService/select-add.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        placeholder: 'Välj i listan',
                        onChange: function(v, options, scope) {
                            var model = scope.model;
                            model[options.key] = model[options.key] || [];

                            var index = _.findIndex(scope.model[options.key], function(item) {
                                return item === scope.to.selectedValue.name;
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
                                className: 'col-md-6',
                                type: 'managerSearch',
                                key: 'Rapportera till chef',
                                templateOptions: {
                                    label: 'Rapportera till chef',
                                    required: true,
                                    managerSelected: function(item, model) {
                                        _.forEach(model, function(val, key) {
                                            if (key.toLowerCase() !== 'name') {
                                                delete model[key];
                                            }
                                        });
                                    }
                                }
                            }, {
                                className: 'col-md-6',
                                type: 'input',
                                key: 'Fakturareferens',
                                templateOptions: {
                                    label: 'Fakturareferens',
                                    required: true
                                },
                                validation: {
                                    show: true
                                }
                            }, {
                                className: 'col-md-12',
                                type: 'textarea',
                                key: 'Övrig information',
                                templateOptions: {
                                    label: 'Övrig information',
                                    placeholder: 'Övriga information'
                                }
                            }]
                        }]
                    }
                }
            }, {
                name: 'equipment-select',
                extends: 'autoCompleteAdd',
                templateUrl: 'shared/formService/equipment-select.html',
                defaultOptions: {
                    templateOptions: {
                        ammountField: [{
                            type: 'input',
                            key: 'Antal',
                            defaultValue: 1,
                            templateOptions: {
                                label: 'Antal',
                                type: 'number',
                                required: true,
                                min: 1
                            },
                            validation: {
                                show: true
                            }
                        }],
                        onChange: function(v, options, scope) {
                            if (scope.to.enableModelInput) {
                                scope.to.modelField = [{
                                    type: 'input',
                                    key: 'Telefonmodell',
                                    templateOptions: {
                                        label: 'Telefonmodell',
                                        required: true
                                    },
                                    validation: {
                                        show: true
                                    }
                                }];
                            }

                            var selected = scope.$select.selected;
                            scope.$select.selected = null;

                            if (!selected) {
                                return;
                            }

                            var model = scope.model;
                            model[options.key] = model[options.key] || [];

                            var index = _.findIndex(scope.model[options.key], function(item) {
                                return item.beteckning === selected.name;
                            });

                            if (index > -1) {
                                return;
                            }

                            var modelVal = {
                                'beteckning': selected.name
                            };

                            if (selected.price) {
                                modelVal.pris = selected.price;
                            }

                            model[options.key].push(modelVal);


                            if (model[options.key] && model[options.key].length) {
                                scope.to.placeholder = 'välj och lägga till fler';
                            } else {
                                scope.to.placeholder = 'välj i listan';
                            }
                        },
                    }
                }
            }
        ]);
    }
})();