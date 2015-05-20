(function() {
    'use strict';

    angular
        .module('forms')
        .factory('forms', exception);

    /*@ngInject*/
    function exception(FORMKEYS) {
        var service = {
            manager: getOrderManagerForm,
            person: getOrderPersonForm,
            newPerson: getOrderNewPersonForm,
            newEmployeeAccount: getOrderEmployeeAccountForm,
            modifyEmployeeAccount: getOrderModifyEmployeeAccountForm,
            extendEmployeeAccount: getOrderExtendEmployeeAccountForm,
            terminateAccount: getOrderTerminateAccountForm,
            subscription: getOrderSubscriptionForm,
            careTalk: getOrderCareTalkForm,
            computerAccessories: getOrderComputerAccessoriesForm,
            prodoc: getOrderProdocForm,
            mobileBroadband: getOrderMobileBroadbandForm,
            phoneAccessories: getOrderPhoneAccessoriesForm,
            newConsultantAccount: getOrderConsultantAccountForm,
            modifyConsultantAccount: getOrderModifyConsultantAccountForm,
            extendConsultantAccount: getOrderExtendConsultantAccountForm,
        };

        return service;

        function getOrderNewPersonForm() {
            return [{
                key: FORMKEYS.person.employmentType,
                type: 'radio',
                defaultValue: 'employee',
                templateOptions: {
                    label: 'Tjänstetyp',
                    options: [{
                        name: 'Konsult',
                        value: 'consultant'
                    }, {
                        name: 'Anställd',
                        value: 'employee'
                    }]
                }
            }, {
                template: '<div><strong>Personuppgifter</strong></div><br>'
            }, {
                className: 'col-md-12',
                type: 'input',
                key: FORMKEYS.person.personalNo,
                templateOptions: {
                    label: 'Personnummer',
                    placeholder: 'xxxxxx-xxxx',
                    required: true
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-4',
                    type: 'input',
                    key: FORMKEYS.person.firstname,
                    templateOptions: {
                        label: 'Förnamn',
                        required: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: FORMKEYS.person.middlename,
                    templateOptions: {
                        label: 'Mellannamn'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: FORMKEYS.person.lastname,
                    templateOptions: {
                        label: 'Efternamn',
                        required: true
                    }
                }]
            }, {
                template: '<div class="form-group-label"><strong>Adress</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    key: FORMKEYS.person.street,
                    templateOptions: {
                        'label': 'Gata',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.zip,
                    templateOptions: {
                        type: 'number',
                        required: true,
                        'label': 'Postnummer',
                        'max': 99999,
                        'min': 0,
                        'pattern': '\\d{5}'
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.city,
                    templateOptions: {
                        'label': 'Ort',
                        required: true
                    }
                }]
            }, {
                className: 'col-md-12',
                type: 'input',
                key: FORMKEYS.person.evCoAddress,
                templateOptions: {
                    label: 'Ev c/o adress',
                    required: true
                }
            }, {
                template: '<br><div class="form-group-label"><strong>Telefon</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    key: FORMKEYS.person.homePhone,
                    templateOptions: {
                        label: 'Hem telefon',
                        type: 'tel',
                        pattern: '[0-9]{10}'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: FORMKEYS.person.mobile,
                    templateOptions: {
                        label: 'Mobil',
                        type: 'tel',
                        pattern: '[0-9]{10}'
                    }
                }]
            }, {
                template: '<div><strong>Tjänsteuppgifter</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    type: 'input',
                    className: 'col-md-6',
                    key: FORMKEYS.person.jobTitle,
                    templateOptions: {
                        label: 'Befattning'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-4',
                    key: FORMKEYS.person.resultUnit,
                    templateOptions: {
                        label: 'Resultatenhet'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-2',
                    key: FORMKEYS.person.serviceGrade,
                    templateOptions: {
                        label: 'Tjänstgöringsgrad',
                        placeholder: '%',
                        type: 'number',
                        min: 0,
                        max: 100
                    }
                }]
            }, {
                template: '<div class="form-group-label"><strong>Tjänsteställe</strong></div>'
            }, {
                type: 'input',
                className: 'col-md-12',
                templateOptions: {
                    label: ''
                }
            }, {
                key: FORMKEYS.person.employmentForm,
                type: 'radio',
                templateOptions: {
                    label: 'Anställningsform (se om möjligt till att startdatum inte är en arbetsfri dag)',
                    default: 'longterm',
                    options: [{
                        name: 'Tillsvidareanställning',
                        value: 'longterm'
                    }, {
                        name: 'Provanställning (högst 6 månader)',
                        value: 'tryout'
                    }, {
                        name: 'Vikariat',
                        value: 'substitute'
                    }, {
                        name: 'Visstidanställning',
                        value: 'shortterm'
                    }, {
                        name: 'Anställd med timlön',
                        value: 'employedByHour'
                    }]
                }
            }, {
                className: 'row',

                fieldGroup: [{
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.employedFrom,
                    templateOptions: {
                        label: 'fr o m',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.employedTo,
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model[FORMKEYS.person.employmentForm] === 'longterm';
                        }
                    },
                    templateOptions: {
                        label: 't o m',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.substituteFor,
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model[FORMKEYS.person.employmentForm] !== 'substitute';
                        }
                    },
                    templateOptions: {
                        label: 'vikariat för',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: FORMKEYS.person.substituteReason,
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model[FORMKEYS.person.employmentForm] !== 'substitute';
                        }
                    },
                    templateOptions: {
                        label: 'pga',
                        required: true
                    }
                }]
            }, {
                template: '<div><strong>Lön</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    key: FORMKEYS.person.monthlySalary,
                    templateOptions: {
                        label: 'Månadslön, heltid',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: FORMKEYS.person.hourlySalary,
                    templateOptions: {
                        label: 'Timlön, exkl semesterlön',
                        required: true
                    },
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model[FORMKEYS.person.employmentForm] !== 'employedByHour';
                        }
                    }
                }]
            }, {
                key: FORMKEYS.person.independentSalary,
                type: 'radio',
                templateOptions: {
                    label: 'Om begynnelselönen gäller oberoende av årets lönerevision',
                    default: null,
                    options: [{
                        name: 'Ja',
                        value: true
                    }, {
                        name: 'Nej',
                        value: false
                    }]
                }
            }, {
                template: '<div><strong>Allmänna anställningsvillkor</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-3',
                    type: 'select',
                    key: FORMKEYS.person.hollydays,
                    templateOptions: {
                        label: 'Semesterrätt',
                        options: [{
                            name: '25',
                            value: 25
                        }, {
                            name: '28',
                            value: 28
                        }, {
                            name: '30',
                            value: 30
                        }]
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
                    key: FORMKEYS.person.overtime,
                    templateOptions: {
                        label: 'Rätt till övertids-, restidsersättning',
                        options: [{
                            name: 'ja',
                            value: true
                        }, {
                            name: 'nej',
                            value: false
                        }]
                    },
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model[FORMKEYS.person.hollydays] !== 25;
                        }
                    }
                }]
            }, {
                className: 'col-md-12',
                key: FORMKEYS.person.ownCar,
                type: 'checkbox',
                templateOptions: {
                    label: 'Egen bil i tjänsten'
                }
            }];
        }

        function getOrderMobileBroadbandForm() {
            return [];
        }

        function getOrderPhoneAccessoriesForm() {
            return [];
        }

        function getOrderConsultantAccountForm() {
            return [];
        }

        function getOrderModifyConsultantAccountForm() {
            return [];
        }

        function getOrderExtendConsultantAccountForm() {
            return [];
        }

        function getOrderCareTalkForm() {
            return [];
        }

        function getOrderSubscriptionForm() {
            return [];
        }

        function getOrderComputerAccessoriesForm() {
            return [];
        }

        function getOrderProdocForm() {
            return [];
        }

        function getOrderEmployeeAccountForm() {
            return [{
                template: '<div><strong>Kompletterande personuppgifter</strong></div><br>'
            }, {
                className: 'col-md-12',
                type: 'select',
                templateOptions: {
                    label: 'MO (Marknadsområde)',
                    options: [{
                        name: 'Mo 1',
                        value: 'mo1'
                    }, {
                        name: 'Mo 2',
                        value: 'mo2'
                    }, {
                        name: 'Mo 3',
                        value: 'mo3'
                    }]
                }
            }, {
                className: 'col-md-12',
                type: 'select',
                templateOptions: {
                    label: 'Huvud-RE',
                    options: [{
                        name: 'RE 1',
                        value: 'RE1'
                    }, {
                        name: 'RE 2',
                        value: 'RE2'
                    }, {
                        name: 'RE 3',
                        value: 'RE3'
                    }]
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-8',
                    type: 'select',
                    templateOptions: {
                        label: 'Tillhör även RE',
                        options: [{
                            name: 'RE 1',
                            value: 'RE1'
                        }, {
                            name: 'RE 2',
                            value: 'RE2'
                        }, {
                            name: 'RE 3',
                            value: 'RE3'
                        }]
                    }
                }, {
                    template: '<button type="submit" class="btn btn-success">Lägg till</button>'
                }]
            }, {
                className: 'col-md-12',
                type: 'input',
                templateOptions: {
                    label: 'Tjänsteställe / Enhetens namn'
                }
            }, {
                template: '<div><strong>Befattning / Roll / Behörighet / Licenser</strong></div><br>'
            }, {
                className: 'col-md-12',
                type: 'radio',
                templateOptions: {
                    label: 'Befattningen är en Tf roll',
                    defaultValue: false,
                    options: [{
                        name: 'Ja',
                        value: true
                    }, {
                        name: 'Nej',
                        value: false
                    }]
                }
            }];
        }

        function getOrderPersonForm() {
            return [{
                template: '<div><strong>Tjänstetyp</strong></div>'
            }, {
                className: 'col-md-12',
                key: 'employmentType',
                type: 'radio',
                templateOptions: {
                    label: '',
                    default: 'no',
                    options: [{
                        name: 'Konsult',
                        value: 'consultant'
                    }, {
                        name: 'Anställd',
                        value: 'employee'
                    }]
                }
            }, {
                template: '<div><strong>Personlig information</strong></div><br>'
            }, {
                className: 'col-md-12',
                type: 'input',
                key: 'ppersonalNo',
                templateOptions: {
                    label: 'Personnummer',
                    required: true
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-4',
                    type: 'input',
                    key: 'pfirstname',
                    templateOptions: {
                        label: 'Förnamn',
                        required: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'pmiddleName',
                    templateOptions: {
                        label: 'Mellannamn'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'plastName',
                    templateOptions: {
                        label: 'Efternamn',
                        required: true
                    }
                }]
            }, {
                template: '<div><strong>Tjänställets besöksadress</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    key: 'pwstreet',
                    templateOptions: {
                        'label': 'Gata',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'pwzip',
                    templateOptions: {
                        type: 'number',
                        required: true,
                        'label': 'Postnummer',
                        'max': 99999,
                        'min': 0,
                        'pattern': '\\d{5}'
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'pwcityName',
                    templateOptions: {
                        'label': 'Ort',
                        required: true
                    }
                }]
            }, {
                template: '<div><strong>Tjänställets postadress</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    key: 'ppStreet',
                    templateOptions: {
                        label: 'Gata/box',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'ppZip',
                    templateOptions: {
                        label: 'Postnummer',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'ppCity',
                    templateOptions: {
                        label: 'Ort',
                        type: 'text',
                        required: true
                    }
                }]
            }];
        }

        function getOrderModifyEmployeeAccountForm() {
            return [];
        }

        function getOrderExtendEmployeeAccountForm() {
            return [];
        }

        function getOrderTerminateAccountForm() {
            return [];
        }

        function getOrderManagerForm() {
            return [{
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
        }
    }
})();