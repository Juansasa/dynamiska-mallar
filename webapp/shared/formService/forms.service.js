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

            newConsultantAccount: getOrderConsultantAccountForm,
            modifyConsultantAccount: getOrderModifyConsultantAccountForm,
            extendConsultantAccount: getOrderExtendConsultantAccountForm,

            terminateAccount: getOrderTerminateAccountForm,
            subscription: getOrderSubscriptionForm,
            careTalk: getOrderCareTalkForm,
            computerAccessories: getOrderComputerAccessoriesForm,
            mobileBroadband: getOrderMobileBroadbandForm,
            phoneEquipment: getOrderPhoneEquipmentForm,
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
                        showPrevileges: true
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
        function getNewConsultantPersonalInfo() {
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
            }, {
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

        // Nytt konto för ny konsult
        function getOrderConsultantAccountForm() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'autoCompleteAdd',
                    key: 'Sekundär tjänsteställe',
                    templateOptions: {
                        label: gettext('Tillhör även RE'),
                        placeholder: 'Lägga till en eller fler RE',
                        options: autocomplete.getRE('All')
                    }
                }, {
                    template: '<div><b>Befattning / Roll / Behörighet / Lincenser</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'select',
                    key: 'Befattningen är en Tf roll',
                    templateOptions: {
                        label: 'Befattningen är en Tf roll',
                        options: [{
                            name: 'Ja',
                            value: 'ja'
                        }, {
                            name: 'Nej',
                            value: 'nej'
                        }]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'infoList',
                    templateOptions: {
                        label: 'Standardbehörighet för samtliga roller och befattningar',
                        options: [
                            '3Q användarbehörighet( QV & Quando)',
                            'Läsrättigheter till Internwebben',
                            'E-post konto (konsult...)',
                            'Hemkatalog H',
                            'Improof',
                            'Handboken',
                            'Agda Entré',
                            'Access till Kuben',
                            'Lync'
                        ]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'roleSelect',
                    key: 'befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions()
                    }
                }, {
                    type: 'signature'
                }]

            }];

            return specific;
        }

        // Nytt konto för ny anställd
        function getOrderEmployeeAccountForm() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'autoCompleteAdd',
                    key: 'Sekundär tjänsteställe',
                    templateOptions: {
                        label: gettext('Tillhör även RE'),
                        placeholder: 'Lägga till en eller fler RE',
                        options: autocomplete.getRE('All')
                    }
                }, {
                    template: '<div><b>Befattning / Roll / Behörighet / Lincenser</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'select',
                    key: 'Befattningen är en Tf roll',
                    templateOptions: {
                        label: 'Befattningen är en Tf roll',
                        options: [{
                            name: 'Ja',
                            value: 'ja'
                        }, {
                            name: 'Nej',
                            value: 'nej'
                        }]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'infoList',
                    templateOptions: {
                        label: 'Standardbehörighet för samtliga roller och befattningar',
                        options: [
                            '3Q användarbehörighet( QV & Quando)',
                            'Läsrättigheter till Internwebben',
                            'E-post konto (konsult...)',
                            'Hemkatalog H:',
                            'Access till G:',
                            'Improof',
                            'Handboken',
                            'Agda Entré',
                            'Access till Kuben',
                            'Lync'
                        ]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'roleSelect',
                    key: 'befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions(true)
                    }
                }, {
                    type: 'signature'
                }]

            }];

            return specific;
        }

        // Person-info part of subscrition form
        function getSubscriptionPersonInfo() {
            return [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Personinformation</b></div>',
                    templateOptions: {
                        description: 'Om information om personen saknas var vänlig och fylla in i förregående steg. TODO bind data'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Resultatenhet',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Previa enhet',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Postadress',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Postnummer',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort',
                        disabled: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Kontaktperson',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefonnr',
                        type: 'tel',
                        required: true
                    }
                }]
            }];
        }

        // Nyt abonnemang
        function getOrderSubscriptionForm() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Nytt abonnemang</b></div>'
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'Datum då abonnemanget ska börja gälla',
                    templateOptions: {
                        label: 'Datum då abonnemanget ska börja gälla'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'select',
                    key: 'Ny Anknytning med tillhörande mobilnr',
                    templateOptions: {
                        label: 'Ny Anknytning med tillhörande mobilnr',
                        options: [{
                            name: 'Endast fast ankn',
                            value: 'Endast fast ankn'
                        }, {
                            name: 'Endast mobilabonnemang',
                            value: 'Endast mobilabonnemang'
                        }]
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'Beställningsdatum',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        required: true
                    }
                }, {
                    template: '<div><b>Flytt av abonnemang till annan användare</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum för ändring',
                    templateOptions: {
                        label: 'Datum för ändring'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'select',
                    key: 'Behövs nytt simkort',
                    templateOptions: {
                        label: 'Behövs nytt simkort',
                        required: true,
                        options: [{
                            name: 'Ja',
                            value: 'Ja'
                        }, {
                            name: 'Nej',
                            value: 'Nej'
                        }]
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Anknytning',
                    templateOptions: {
                        label: 'Anknytning',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Ny användare',
                    templateOptions: {
                        label: 'Ny användare',
                        required: true
                    }
                }, {
                    template: '<div><b>Uppsägning av abonnemang</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum för uppsägning',
                    templateOptions: {
                        label: 'Datum för uppsägning'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'select',
                    key: ' Anknytning med tillhörande mobilnr',
                    templateOptions: {
                        label: ' Anknytning med tillhörande mobilnr',
                        required: true,
                        options: [{
                            name: 'Endast Fast Abonnemang',
                            value: 'Endast Fast Abonnemang'
                        }, {
                            name: 'Endast mobilabonnemang',
                            value: 'Endast mobilabonnemang'
                        }]
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Telefonnummer',
                    templateOptions: {
                        label: 'Telefonnummer',
                        required: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Anknytning',
                    templateOptions: {
                        label: 'Anknytning',
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Mobilnummer',
                    templateOptions: {
                        label: 'Mobilnummer',
                        type: 'tel',
                    }
                }]
            }];

            return getSubscriptionPersonInfo().concat(specific).concat(getOrderSignaturePart());
        }

        // Nytt mobilt bredband formulär
        function getOrderMobileBroadbandForm() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Nytt Mobilt bredband</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum då abonnemanget ska börja gälla',
                    templateOptions: {
                        label: 'Datum då abonnemanget ska börja gälla'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'select',
                    key: 'Typ av mobilt bredband',
                    templateOptions: {
                        label: 'Typ av mobilt bredband',
                        options: [{
                            name: 'Mobilt bredband 3G',
                            value: 'Mobilt bredband 3G'
                        }, {
                            name: 'Mobilt bredband 4G',
                            value: 'Mobilt bredband 4G'
                        }]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'USB modem önskas',
                    templateOptions: {
                        label: 'USB modem önskas',
                        options: [{
                            name: 'Ja',
                            value: 'Ja'
                        }, {
                            name: 'Nej',
                            value: 'Nej'
                        }]
                    },
                    hideExpression: 'model["Typ av mobilt bredband"] !== "Mobilt bredband 4G"'
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Flytt av Mobilt bredband till annan användare</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum för flytt',
                    templateOptions: {
                        label: 'Datum för flytt'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Telefonnummer',
                    templateOptions: {
                        label: 'Telefonnummer',
                        type: 'tel'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Ny abonnent – Namn',
                    templateOptions: {
                        label: 'Ny abonnent – Namn',
                        disabled: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Alias',
                    templateOptions: {
                        label: 'Alias',
                        disabled: true
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Uppsägning av Mobilt bredband</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum för uppsägning',
                    templateOptions: {
                        label: 'Datum för uppsägning'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Telefonnummer',
                    templateOptions: {
                        label: 'Telefonnummer',
                        type: 'tel'
                    }
                }]
            }];

            return getSubscriptionPersonInfo().concat(specific).concat(getOrderSignaturePart());
        }

        // Nytt telefonutrustning formulär
        function getOrderPhoneEquipmentForm() {
            return [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Beställningsdatum',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        disabled: true,
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
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Fakturaref',
                        placeholder: 'Sign på den personen som har rollen som godkännare i Batlzar',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Fakturaadress',
                        placeholder: 'PAA 04220  FE 533,  105 69 STOCKHOLM',
                        disabled: true
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
                    type: 'today-date',
                    templateOptions: {
                        label: 'Datum',
                        disabled: true
                    }
                }]
            }];
        }

        // Datorutrustning formulär
        function getOrderComputerAccessoriesForm() {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Beställare</b></div>'
                },{
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        disabled: true,
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Resultatenhet',
                        disabled: true,
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Mailadress',
                        type: 'mail',
                        placeholder: 'Mottagare av orderbekräftelse'
                    }
                }, {
                    template: '<div><b>Mottagare</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        disabled: true,
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Leveransadress',
                        disabled: true,
                    }
                },{
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Postnummer',
                        disabled: true,
                    }
                },{
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort',
                        disabled: true,
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Fakturareferens',
                        placeholder: '(Sign på den personen som har rollen som ”Godkännare” i Palette)'
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Utrustning</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Dator – Leasing 36 mån',
                    templateOptions: {
                        label: 'Dator – Leasing 36 mån',
                        options: autocomplete.getComputerLeasingOptions()
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'iPad – Leasing 12 mån',
                    templateOptions: {
                        label: 'iPad – Leasing 12 mån',
                        options: autocomplete.getIpadLeasingOptions()
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Tillbehör – Leasing 36 mån',
                    templateOptions: {
                        label: 'Tillbehör – Leasing 36 mån',
                        options: autocomplete.getComputerEquipmentLeasingOptions()
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Tillbehör - EJ leasing',
                    templateOptions: {
                        label: 'Tillbehör - EJ leasing',
                        options: autocomplete.getComputerEquipmentOptions()
                    }
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Godkänt för inköp</b></div>'
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'Datum',
                    templateOptions: {
                        label: 'Datum',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Behörig beställare',
                        disabled: true
                    }
                }]
            }];

            return specific;
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
                template: '<hr>'
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'textarea',
                    templateOptions: {
                        label: 'Övriga upplysningar'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    templateOptions: {
                        label: 'Beställningsdatum',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Godkänt för beställning',
                        type: 'date'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Namnförtydligande'
                    }
                }]
            }];
        }

    }
})();