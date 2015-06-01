(function() {
    'use strict';

    angular
        .module('forms')
        .factory('forms', exception);

    /*@ngInject*/
    function exception(FORMKEYS, gettext, autocomplete) {
        var service = {
            manager: getOrderManagerForm,
            newConsultantPersonalInfo: getNewConsultantPersonalInfo,
            newEmployeePersonalInfo: getNewPreviaEmployeePersonalInfo,
            newEmployeeAccount: getOrderEmployeeAccountForm,
            modifyEmployeeAccount: getOrderModifyEmployeeAccountForm,
            extendEmployeeAccount: getOrderExtendEmployeeAccountForm,
            terminateAccount: getOrderTerminateAccountForm,
            subscription: getOrderSubscriptionForm,
            careTalk: getOrderCareTalkForm,
            computerAccessories: getOrderComputerAccessoriesForm,
            prodoc: getOrderProdocForm,
            mobileBroadband: getOrderMobileBroadbandForm,
            phoneEquipment: getOrderPhoneEquipmentForm,
            newConsultantAccount: getOrderConsultantAccountForm,
            modifyConsultantAccount: getOrderModifyConsultantAccountForm,
            extendConsultantAccount: getOrderExtendConsultantAccountForm,
        };

        return service;

        // Personliga info som är samma för både ny konsult och previa anställd
        function getGeneralPersonInfo() {
            return [{
                fieldGroup: [{
                    type: 'personNo',
                    key: 'personnummer'
                }, {
                    type: 'personName',
                    key: 'namn'
                }, {
                    type: 'adress',
                    key: 'adress'
                }, {
                    type: 'telefon',
                    key: 'telefoner'
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Tjänsteuppgifter<b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'roleSelect',
                    key: 'befattning',
                    templateOptions: {
                        label: gettext('Befattning'),
                        options: autocomplete.getBefattningOptions(false),
                        placeholder: 'Välj befattning/roll/titel',
                        disableExplanations: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'tjanstestalleSelect',
                    key: 'tjänsteställe',
                    templateOptions: {
                        label: gettext('Tjänsteställe'),
                        placeholder: 'Välj ett tjänsteställe',
                        options: autocomplete.getTjanstestalleOptions()
                    }
                }]
            }];
        }

        // Personliga info som är specifik för ny previa anställd
        function getNewConsultantPersonalInfo () {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'select',
                    key: 'huvud-RE',
                    templateOptions: {
                        label: 'Resultatenhet',
                        options: autocomplete.getRE('All re')
                    }
                }]
            }];

            return getGeneralPersonInfo().concat(specific);
        }

        // Personliga info som är specifik för ny konsult
        function getNewPreviaEmployeePersonalInfo() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'autoCompleteAdd',
                    key: 'Sekundär tjänsteställe',
                    templateOptions: {
                        label: gettext('Tjänsteställe (Sekundärt)'),
                        placeholder: 'Lägga till ett eller fler sekundär tjänsteställe',
                        options: autocomplete.getTjanstestalleOptions()
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'MO',
                    templateOptions: {
                        label: 'MO (Marknadsområde)',
                        placeholder: 'Välj ett marknadsåmråde',
                        options: autocomplete.getAllMO(),
                        onChange: function(v, m, s) {
                            s.model['Huvud-RE'] = null;
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'huvud-RE',
                    templateOptions: {
                        label: 'Huvud-RE',
                        placeholder: 'Välj en RE',
                        required: true
                    },
                    expressionProperties: {
                        'templateOptions.options': function(v, m, s) {
                            return autocomplete.getRE(s.model.MO);
                        }
                    }
                }]
            },{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    key: 'anställningsform',
                    type: 'radio',
                    templateOptions: {
                        label: 'Anställningsform (se om möjligt till att startdatum inte är en arbetsfri dag)',
                        options: [{
                            name: 'Tillsvidareanställning',
                            value: 'tillsvidareanställning'
                        }, {
                            name: 'Provanställning (högst 6 månader)',
                            value: 'provanställning'
                        }, {
                            name: 'Vikariat',
                            value: 'vikariat'
                        }, {
                            name: 'Visstidanställning',
                            value: 'visstidanställning'
                        }, {
                            name: 'Anställd med timlön',
                            value: 'anställd med timlön'
                        }]
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'fr o m',
                    templateOptions: {
                        label: 'fr o m',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 't o m',
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model['anställningsform'] === 'tillsvidareanställning';
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
                    key: 'vikariat för',
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model['anställningsform'] !== 'vikariat';
                        }
                    },
                    templateOptions: {
                        label: 'vikariat för',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'pga',
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model['anställningsform'] !== 'vikariat';
                        }
                    },
                    templateOptions: {
                        label: 'pga',
                        required: true
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Lön<b></div>'
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'Månadslön, heltid',
                    templateOptions: {
                        label: 'Månadslön, heltid',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'Timlön, exkl semesterlön',
                    templateOptions: {
                        label: 'Timlön, exkl semesterlön',
                        required: true
                    },
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model['anställningsform'] !== 'anställd med timlön';
                        }
                    }
                }, {
                    className: 'col-md-6',
                    key: 'om begynnelselönen gäller oberoende av årets lönerevision',
                    type: 'select',
                    templateOptions: {
                        label: 'Om begynnelselönen gäller oberoende av årets lönerevision',
                        options: [{
                            name: 'Ja',
                            value: 'ja'
                        }, {
                            name: 'Nej',
                            value: 'nej'
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Allmänna anställningsvillkor<b></div>'
                }, {
                    className: 'col-md-4',
                    type: 'select',
                    key: 'semesterrätt',
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
                    className: 'col-md-4',
                    type: 'select',
                    key: 'Rätt till övertids-, restidsersättning',
                    templateOptions: {
                        label: 'Rätt till övertids-, restidsersättning',
                        options: [{
                            name: 'ja',
                            value: 'ja'
                        }, {
                            name: 'nej',
                            value: 'nej'
                        }]
                    },
                    expressionProperties: {
                        'templateOptions.disabled': function(vv, mv, scope) {
                            return scope.model['semesterrätt'] !== 25;
                        }
                    }
                }, {
                    className: 'col-md-4',
                    key: 'egen bil i tjänsten',
                    type: 'select',
                    templateOptions: {
                        label: 'Egen bil i tjänsten',
                        options: [{
                            name: 'ja',
                            value: 'ja'
                        }, {
                            name: 'nej',
                            value: 'nej'
                        }]
                    }
                }]
            }];

            return getGeneralPersonInfo().concat(specific);
        }







        
        function getOrderMobileBroadbandForm() {
            return [{
                template: '<div><i>Frågor kring beställning av Mobilt bredband mailas till DM IT Order</i></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Nytt Mobilt bredband, f r o m ',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'select',
                    //defaultValue: 'Mobilt bredband 4G',
                    templateOptions: {
                        label: 'Bredbandstyp',
                        options: [{
                            name: 'Mobilt bredband 3G ',
                            value: 'Mobilt bredband 3G '
                        }, {
                            name: 'Mobilt bredband 4G (för priser se prislista i handboken)',
                            value: 'Mobilt bredband 4G'
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
                    templateOptions: {
                        label: 'USB modem önskas',
                        options: [{
                            name: 'Ja',
                            value: 'ja'
                        }, {
                            name: 'Nej',
                            value: 'nej'
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Alias',
                        placeholder: 'personens användarnamn i Previas domän',
                        required: true
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    template: '<div><b>Resultatenhet:</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Re-namn'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-12',
                    templateOptions: {
                        label: 'Postadress'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Postnummer'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Ort'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Kontaktperson'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Telefonnr',
                        type: 'tel'
                    }
                }]
            }, {
                template: '<hr>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Flytt av Mobilt bredband till annan användare fr o m',
                        placeholder: 'ange datum för flytt'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-12',
                    templateOptions: {
                        label: 'Telefonnr',
                        type: 'tel'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Ny abonnent – Namn'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Alias',
                        required: true
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    template: '<div><b>Resultatenhet:</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Re-namn'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-12',
                    templateOptions: {
                        label: 'Postadress'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Postnummer'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Ort'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Kontaktperson'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Telefonnr',
                        type: 'tel'
                    }
                }]
            }, {
                className: 'col-md-12',
                type: 'input',
                templateOptions: {
                    label: 'Uppsägning av Mobilt bredband fr o m',
                    type: 'date'
                }
            }, {
                type: 'input',
                className: 'col-md-12',
                templateOptions: {
                    label: 'Telefonnr',
                    type: 'tel'
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    template: '<div><b>Resultatenhet:</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Re-namn'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Kontaktperson'
                    }
                }, {
                    type: 'input',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Telefonnr',
                        type: 'tel'
                    }
                }]
            }, {
                className: 'col-md-12',
                type: 'textarea',
                templateOptions: {
                    label: 'Övriga upplysningar'
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Godkänt för beställning',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namnförtydligande'
                    }
                }]
            }, {
                template: '<h1 style="background-color: red">Underskrift ???</h1>'
            }];
        }

        function getOrderPhoneEquipmentForm() {
            return [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställare',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Tel',
                        type: 'tel',
                        required: true
                    }
                }, {
                    template: '<div class="col-md-6"><label>Företag</label><p><b><i>AB Previa</i></b></p></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Mottagare/Användare (Om annan än beställaren)',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Leveransadress',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    templateOptions: {
                        label: 'Postnr',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort',
                        required: true
                    }
                }, {
                    template: '<div class="col-md-12"><label>Fakturaadress</label><p><b><i>AB Previa</i></b></p></div>'
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Fakturaref',
                        placeholder: 'Sign på den personen som har rollen som godkännare i Batlzar',
                        required: true
                    }
                }]
            }, {
                className: 'col-md-12',
                type: 'equipmentTable',
                templateOptions: {
                    headers: ['Telefoner – Produktbeskrivning finns i Previas Handbok', '', 'Antal/st'],
                    rowFields: [
                        [{
                            template: 'Samsung GT-B2710, enkel knapptelefon'
                        }, {
                            template: ''
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'iPhone 5C  16GB'
                        }, {
                            template: ''
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Simkort passande till iPhone 5C'
                        }, {
                            template: ''
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }]
                    ]
                }
            }, {
                className: 'col-md-12',
                type: 'equipmentTable',
                templateOptions: {
                    headers: ['Kontorsheadset', 'Modell', 'Antal/st'],
                    rowFields: [
                        [{
                            template: 'Kontorsheadset  Mono'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Kontorsheadset  Stereo'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Mellankabel till Kontorsheadset'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }]
                    ]
                }
            }, {
                className: 'col-md-12',
                type: 'equipmentTable',
                templateOptions: {
                    headers: ['Konferenstelefon', '', 'Antal/st'],
                    rowFields: [
                        [{
                            template: 'Konferenstelefon'
                        }, {
                            template: ''
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }]
                    ]
                }
            }, {
                className: 'col-md-12',
                type: 'equipmentTable',
                templateOptions: {
                    headers: ['Tillbehör', 'Modell', 'Antal/st'],
                    rowFields: [
                        [{
                            template: 'Reseladdare'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Billaddare'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Bluetooth'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }],
                        [{
                            template: 'Hörlurar'
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                placeholder: 'Ange till vilken telefonmodell'
                            }
                        }, {
                            className: 'plainInput',
                            type: 'plainInput',
                            templateOptions: {
                                type: 'number',
                                min: '0'
                            }
                        }]
                    ]
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    template: '<div><p><b>Godkänt för inköp</b></p></div>'
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Namnförtydligande'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Datum',
                        type: 'date'
                    }
                }]
            }];
        }

        function getOrderConsultantAccountForm() {
            return getOrderPersonForm()
                .concat(getConsultantEmploymentPeriod())
                .concat(getAccountMOPart())
                .concat(getAccountPermissionPart(false))
                .concat(getAccountSignaturePart());
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
            return [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Nytt abonnemang f r o m (ange datum då abonnemanget ska börja gälla)',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Ny Anknytning med tillhörande mobilnr',
                        type: 'tel'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
                    templateOptions: {
                        label: '',
                        options: [{
                            name: 'Endast fast ankn',
                            value: 'Endast fast ankn'
                        }, {
                            name: 'Endast mobilabonnemang',
                            value: 'Endast mobilabonnemang'
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        type: 'date',
                        required: true
                    }
                }].concat(getOrderAdressPart())
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Flytt av abonnemang till annan användare fr o m: (ange datum för ändring)',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Anknytning med tillhörande mobilnr',
                        type: 'tel'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
                    templateOptions: {
                        label: 'Behövs nytt simkort',
                        options: [{
                            name: 'Ja',
                            value: true
                        }, {
                            name: 'Nej',
                            value: false
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        type: 'date',
                        required: true
                    }
                }].concat(getOrderAdressPart())
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Uppsägning av abonnemang fr o m (ange datum för uppsägning)',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Anknytning med tillhörande mobilnr',
                        type: 'tel'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
                    templateOptions: {
                        label: '',
                        options: [{
                            name: 'Endast Fast Abonnemang',
                            value: 'Endast Fast Abonnemang'
                        }, {
                            name: 'Endast mobilabonnemang',
                            value: 'Endast mobilabonnemang'
                        }]
                    }
                }]
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'Telefonnummer',
                    required: true,
                    type: 'tel'
                }
            }, {
                className: 'col-md-3',
                type: 'input',
                templateOptions: {
                    label: 'Anknytning',
                    required: true
                }
            }, {
                className: 'col-md-3',
                type: 'input',
                templateOptions: {
                    label: 'Mobilnummer',
                    required: true,
                    type: 'tel'
                }
            }, {
                className: 'col-md-12',
                template: '<div><p><b>Resultatenhet</b></p></div>'
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'RE-nr',
                    required: true
                }
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'Previa enhet',
                    required: true
                }
            }, {
                className: 'col-md-8',
                type: 'input',
                templateOptions: {
                    label: 'Kontaktperson',
                    required: true
                }
            }, {
                className: 'col-md-4',
                type: 'input',
                templateOptions: {
                    label: 'Telefonnr',
                    type: 'tel',
                    pattern: '[0-9]{10}',
                    required: true
                }
            }].concat(getOrderSignaturePart());
        }

        function getOrderComputerAccessoriesForm() {
            return [];
        }

        function getOrderProdocForm() {
            return [];
        }

        function getOrderEmployeeAccountForm() {
            return getAccountMOPart()
                .concat(getAccountPermissionPart(true))
                .concat([{
                    template: '<hr>'
                }])
                .concat(getAccountSignaturePart());
        }

        function getOrderPersonForm() {
            return [
                /*{
                template: '<div><strong>Tjänstetyp</strong></div>'
            }, {
                className: 'col-md-12',
                key: 'employmentType',
                type: 'radio',
                templateOptions: {
                    label: '',
                    defaultValue: 'employee',
                    options: [{
                        name: 'Konsult',
                        value: 'consultant'
                    }, {
                        name: 'Anställd',
                        value: 'employee'
                    }]
                }
            },*/
                {
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
                }
            ];
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


        // 
        // Form fragments
        // 

        function getOrderSignaturePart() {
            return [{
                className: 'col-md-12',
                type: 'textarea',
                templateOptions: {
                    label: 'Övriga upplysningar'
                }
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Godkänt för beställning',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namnförtydligande'
                    }
                }]
            }, {
                template: '<h1 style="background-color: red">Underskrift ???</h1>'
            }];
        }

        function getOrderAdressPart() {
            return [{
                className: 'col-md-12',
                template: '<div><p><b>Resultatenhet</b></p></div>'
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'RE-nr',
                    required: true
                }
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'Previa enhet',
                    required: true
                }
            }, {
                className: 'col-md-6',
                type: 'input',
                templateOptions: {
                    label: 'Postadress',
                    required: true
                }
            }, {
                className: 'col-md-3',
                type: 'input',
                templateOptions: {
                    label: 'Postnummer',
                    required: true
                }
            }, {
                className: 'col-md-3',
                type: 'input',
                templateOptions: {
                    label: 'Ort',
                    required: true
                }
            }, {
                className: 'col-md-8',
                type: 'input',
                templateOptions: {
                    label: 'Kontaktperson',
                    required: true
                }
            }, {
                className: 'col-md-4',
                type: 'input',
                templateOptions: {
                    label: 'Telefonnr',
                    type: 'tel',
                    pattern: '[0-9]{10}',
                    required: true
                }
            }];
        }

        function getAccountMOPart() {
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
                    label: 'Tjänsälle / Enhetens namn'
                }
            }];
        }

        function getAccountPermissionPart(isEmployee) {
            return [{
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
            }, {
                template: '<div><strong>Standardbehörighet för samtliga roller och befattningar:</strong></div>'
            }, {
                className: 'col-md-12',
                type: 'titleRadio',
                templateOptions: {
                    label: '',
                    noRadio: true,
                    options: [{
                        explanations: [
                            '3Q användarbehörighet( QV & Quando)',
                            'Läsrättigheter till Internwebben',
                            'E-post konto (konsult...)',
                            'Hemkatalog H'
                        ].concat(
                            isEmployee ? ['Access till G'] : []).concat([
                            'Improof',
                            'Handboken',
                            'Agda Entré',
                            'Access till Kuben',
                            'Lync'
                        ])
                    }]
                }
            }, {
                template: '<div><strong>Välj Befattning, roll och behörighet:</strong></div><br>'
            }, {
                className: 'col-md-12',
                type: 'roleSelect',
                key: FORMKEYS.newAccount.role,
                templateOptions: {
                    label: '',
                    options: [{
                            name: 'Account Manager',
                            value: 'accountManager',
                            explanations: [
                                'Försäljningsrapportering och försäljningsstatistik',
                                'CRM'
                            ]
                        }, {
                            name: 'Affärscontroller',
                            value: 'affarscontroller',
                            explanations: [
                                'Visma', 'Mercur', 'Adm access till kuben'
                            ]
                        }, {
                            name: 'Affärsutvecklingschef',
                            value: 'affarsutvecklingschef',
                            explanations: [
                                'Visma', 'Mercur', 'Agda PS'
                            ]
                        }, {
                            name: 'Affärsområdeschef',
                            value: 'affarsomradeschef',
                            explanations: [
                                'Visma', 'Mercur', 'Agda PS'
                            ]
                        }, {
                            name: 'Affärsstöd - Admin & Service',
                            value: 'affaradminservice',
                            explanations: [
                                'Visma', 'Mercur', 'Agda PS'
                            ]
                        }, {
                            name: 'Affärsstöd – Ekonomi',
                            value: 'affarstodekonomi',
                            explanations: [
                                'Visma', 'Mercur', 'Option administratörs behörighet 3Q ( efter genomgången utbildning)'
                            ]
                        }, {
                            name: 'Affärsstöd - Sälj & Marknad',
                            value: 'affarstodsaljmarknad',
                            explanations: [
                                'Option administratörs behörighet 3Q ( efter genomgången utbildning)'
                            ]
                        }, {
                            name: 'Affärsutvecklingschef',
                            value: 'Affärsutvecklingschef'
                        }, {
                            name: 'Anbudsansvarig',
                            value: 'Anbudsansvarig'
                        }, {
                            name: 'Anbudskoordinator',
                            value: 'Anbudskoordinator'
                        }, {
                            name: 'Arbetsmiljöingenjör',
                            value: 'Arbetsmiljöingenjör'
                        }, {
                            name: 'Arbetsmiljökonsult',
                            value: 'Arbetsmiljökonsult'
                        }, {
                            name: 'Arbetsmiljötekniker',
                            value: 'Arbetsmiljötekniker'
                        }, {
                            name: 'Barnmorska – Ej obligatorisk förskrivarkod',
                            value: 'Barnmorska – Ej obligatorisk förskrivarkod',
                            explanations: [
                                'Quid Agis'
                            ]
                        }, {
                            name: 'Beteendevetare',
                            value: 'Beteendevetare',
                            explanations: [
                                'Quid Agis'
                            ],
                            subOptions: [{
                                key: 'Beteendevetare-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Beteendevetare');
                                }
                            }]
                        }, {
                            name: 'Callcenteragent',
                            value: 'Callcenteragent',
                            explanations: [
                                'Se specifik lista för roller inom KSC'
                            ]
                        }, {
                            name: 'CFO',
                            value: 'CFO',
                            explanations: [
                                'Agda PS', 'Visma', 'Mercur'
                            ]
                        }, {
                            name: 'Chef Previa Trygghetstjänster',
                            value: 'Chef Previa Trygghetstjänster'
                        }, {
                            name: 'Drift och förvaltningsansvarig',
                            value: 'Drift och förvaltningsansvarig',
                            explanations: [
                                'IT Kontakt'
                            ]
                        }, {
                            name: 'Drogterapeut',
                            value: 'Drogterapeut',
                            explanations: [
                                'Quid Agis'
                            ]
                        }, {
                            name: 'Ekonomiassistent',
                            value: 'Ekonomiassistent',
                            explanations: [
                                'Visma'
                            ]
                        }, {
                            name: 'Ekonomichef',
                            value: 'Ekonomichef',
                            explanations: [
                                'Agda PS', 'Visma', 'Mercur'
                            ]
                        }, {
                            name: 'Faktureringsekonom',
                            value: 'Faktureringsekonom',
                            explanations: [
                                'Visma'
                            ]
                        }, {
                            name: 'Fysioterapeut',
                            value: 'Fysioterapeut',
                            explanations: [
                                'Quid Agis', 'Mobilus (kostnad)', 'Vidar - Video- och datorbaserad arbetsanalys för sjukgymnaster (kostnad)'
                            ],
                            subOptions: [{
                                key: 'Fysioterapeut-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: ' CareTalk - Digital diktering (kostnad) (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Fysioterapeut');
                                }
                            }]
                        }, {
                            name: 'Företagsläkare',
                            value: 'Företagsläkare',
                            explanations: [
                                'Quid Agis', 'Cardio Controll - EKG/Spiro (OBS! Se handboken för installationsinstruktion)',
                                'CareTalk - Digital diktering (OBS! Se handboken för installationsinstruktion)'
                            ],
                            subInput: [{
                                type: 'input',
                                key: 'Obligatorisk förskrivarkod',
                                templateOptions: {
                                    label: 'Obligatorisk förskrivarkod',
                                    required: true,
                                    placeholder: 'Förskrivarkod xxx-xxxxx'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Företagsläkare');
                                }
                            }]
                        }, {
                            name: 'Företagssköterska',
                            value: 'Företagssköterska',
                            explanations: [
                                'Quid Agis', 'Mobilus (kostnad)', 'Vidar - Video- och datorbaserad arbetsanalys för sjukgymnaster (kostnad)'
                            ],
                            subOptions: [{
                                key: 'Företagssköterska-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: ' CareTalk - Digital diktering (kostnad) (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Företagssköterska');
                                }
                            }],
                            subInput: [{
                                type: 'input',
                                key: 'Obligatorisk förskrivarkod',
                                templateOptions: {
                                    label: 'Frivillig förskrivarkod',
                                    placeholder: 'Förskrivarkod xxx-xxxxx'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Företagssköterska');
                                }
                            }]
                        }, {
                            name: 'Försäljnings- och Marknadschef (FMC)',
                            value: 'Försäljnings- och Marknadschef (FMC)',
                            explanations: [
                                'Försäljningsrapportering och försäljningsstatistik',
                                'Agda PS',
                                'CRM',
                                'Visma',
                                'Mercur'
                            ]
                        }, {
                            name: 'Försäljningschef',
                            value: 'Försäljningschef',
                            explanations: [
                                'Försäljningsrapportering och försäljningsstatistik',
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        }, {
                            name: 'HR-ansvarig',
                            value: 'HR-ansvarig',
                            explanations: [
                                'Agda PS'
                            ]
                        }, {
                            name: 'HR-chef',
                            value: 'HR-chef',
                            explanations: [
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        }, {
                            name: 'Hälsoutvecklare',
                            value: 'Hälsoutvecklare',
                            explanations: [
                                'Quid Agis'
                            ]
                        }, {
                            name: 'Informationschef',
                            value: 'Informationschef',
                            explanations: [
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        }, {
                            name: 'IT-chef',
                            value: 'IT-chef',
                            explanations: [
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        },
                        isEmployee ? {
                            name: 'IT-koordinator',
                            value: 'IT-koordinator'
                        } : {
                            name: 'IT-konsult',
                            value: 'IT-konsult'
                        }, {
                            name: 'Key Account Manager',
                            value: 'Key Account Manager',
                            explanations: [
                                'Försäljningsrapportering och försäljningsstatistik',
                                'CRM'
                            ]
                        }, {
                            name: 'Kundservicehandläggare',
                            value: 'Kundservicehandläggare',
                            explanations: [
                                'Se specifik lista för roller inom KSC'
                            ]
                        }, {
                            name: 'Konsultchef',
                            value: 'Konsultchef',
                            explanations: [
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        }, {
                            name: 'Kvalitets- och miljösamordnare',
                            value: 'Kvalitets- och miljösamordnare'
                        }, {
                            name: 'Kvalitets-och miljöansvarig',
                            value: 'Kvalitets-och miljöansvarig'
                        }, {
                            name: 'Leg psykolog',
                            value: 'Leg psykolog',
                            explanations: [
                                'Quid Agis'
                            ],
                            subOptions: [{
                                key: 'Leg psykolog-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Leg psykolog');
                                }
                            }]
                        }, {
                            name: 'Löneadministratör',
                            value: 'Löneadministratör',
                            explanations: [
                                'Agda PS'
                            ]
                        }, {
                            name: 'Marknadsområdeschef (MOC)',
                            value: 'Marknadsområdeschef (MOC)',
                            explanations: [
                                'Agda PS',
                                'Mercur',
                                'Visma'
                            ]
                        }, {
                            name: 'Operativ samordnare',
                            value: 'Operativ samordnare',
                            subOptions: [{
                                key: 'Operativ samordnare option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'Agda PS'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Operativ samordnare');
                                }
                            }]
                        }, {
                            name: 'Organisationskonsult',
                            value: 'Organisationskonsult',
                            explanations: [
                                'Quid Agis'
                            ],
                            subOptions: [{
                                key: 'Organisationskonsult-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Organisationskonsult');
                                }
                            }]
                        }, {
                            name: 'Produktionsplanerare',
                            value: 'Produktionsplanerare'
                        }, {
                            name: 'Projektledare',
                            value: 'Projektledare'
                        }, {
                            name: 'Projektsamordnare',
                            value: 'Projektsamordnare'
                        }, {
                            name: 'PTP-psykolog',
                            value: 'PTP-psykolog',
                            explanations: [
                                'Quid Agis'
                            ],
                            subOptions: [{
                                key: 'PTP-psykolog-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'PTP-psykolog');
                                }
                            }]
                        }, {
                            name: 'Receptionist',
                            value: 'Receptionist',
                            subOptions: [{
                                key: 'Receptionist-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'Quid Agis'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Receptionist');
                                }
                            }]
                        }, {
                            name: 'Redovisningscontroller',
                            value: 'Redovisningscontroller',
                            explanations: [
                                'Visma'
                            ]
                        }, {
                            name: 'Sales Executive',
                            value: 'Sales Executive',
                            explanations: [
                                'Försäljningsrapportering och försäljningsstatistik',
                                'CRM'
                            ]
                        }, {
                            name: 'S&F Agent',
                            value: 'S&F Agent',
                            explanations: [
                                'Se specifik lista för roller inom KSC'
                            ]
                        }, {
                            name: 'Systemkoordinator',
                            value: 'Systemkoordinator'
                        }, {
                            name: 'Telefonsjuksköterska',
                            value: 'Telefonsjuksköterska',
                            explanations: [
                                'Se specifik lista för roller inom KSC'
                            ]
                        }, {
                            name: 'Undersköterska',
                            value: 'Undersköterska',
                            explanations: [
                                'Quid Agis',
                                'Cardio Controll - EKG/Spiro'
                            ],
                            subOptions: [{
                                key: 'Undersköterska-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Undersköterska');
                                }
                            }]
                        }, {
                            name: 'Vaktmästare',
                            value: 'Vaktmästare'
                        }, {
                            name: 'VD',
                            value: 'VD',
                            explanations: [
                                'Agda PS'
                            ]
                        }, {
                            name: 'Växeltelefonist',
                            value: 'Växeltelefonist',
                            explanations: [
                                'Se specifik lista för roller inom KSC'
                            ]
                        }, {
                            name: 'Övrig kontorspersonal',
                            value: 'Övrig kontorspersonal',
                            explanations: [
                                'Quid Agis',
                                'Cardio Controll - EKG/Spiro'
                            ],
                            subOptions: [{
                                key: 'Övrig kontorspersonal-option',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'Quid Agis'
                                },
                                hideExpression: function(vv, mv, scope) {
                                    return (scope.model[FORMKEYS.newAccount.role] !== 'Övrig kontorspersonal');
                                }
                            }]
                        }
                    ]
                }
            }];
        }

        function getAccountSignaturePart() {
            return [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'textarea',
                    templateOptions: {
                        label: 'Övrig information',
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Dagens datum',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Rapporterar till (chef)',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn på behörig beställare',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'E-postadress på behörig beställare',
                        required: true
                    }
                }]
            }];
        }

        function getConsultantEmploymentPeriod() {
            return [{
                template: '<div><strong>Tidsperiod enligt konsultavtalet</strong></div>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Fr.o.m',
                        type: 'date',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'T.o.m',
                        type: 'date',
                        required: true
                    }
                }]
            }, {
                type: 'checkbox',
                templateOptions: {
                    label: 'Mailkonto för konsult',
                    options: [{
                        name: 'ja'
                    }]
                }
            }];
        }
    }
})();