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

            removeAccount: getOrderRemoveAccountForm,

            newSubscription: getNewOrderSubscriptionForm,
            modifySubscription: getModifySubscriptionForm,

            careTalk: getOrderCareTalkForm,

            computerAccessories: getOrderComputerAccessoriesForm,

            modifyMobileBroadband: getModifyMobileBroadbandForm,
            newMobileBroadband: getNewMobileBroadband,

            changeEmploymentStatus: changeEmploymentStatus,

            phoneEquipment: getOrderPhoneEquipmentForm,
        };

        return service;



        // Personliga info som är specifik för ny previa anställd
        function getNewConsultantPersonalInfo() {
            var specific = [{
                fieldGroup: [{
                    type: 'personNo',
                    key: 'personnummer'
                }, {
                    type: 'personName',
                    key: 'namn'
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Tjänsteuppgifter<b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'MO',
                    templateOptions: {
                        label: 'MO (Marknadsområde)',
                        placeholder: 'Välj ett marknadsåmråde',
                        options: autocomplete.getAllMO(),
                        onChange: function(v, m, s) {
                            s.model['huvud-RE'] = null;
                        },
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'tjanstestalleSelect',
                    key: 'Tjänsteställe',
                    templateOptions: {
                        label: gettext('Tjänsteställe'),
                        placeholder: 'Välj ett tjänsteställe',
                        options: autocomplete.getTjanstestalleOptions(),
                        required: true
                    }
                }, {
                    className: 'col-md-12',
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
            }];

            showErrors(specific);

            return specific;
        }

        // Personliga info som är specifik för ny konsult
        function getNewPreviaEmployeePersonalInfo() {
            var specific = [{
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
                    type: 'autocomplete-select',
                    key: 'MO',
                    templateOptions: {
                        label: 'MO (Marknadsområde)',
                        placeholder: 'Välj ett marknadsåmråde',
                        options: autocomplete.getAllMO(),
                        onChange: function(v, m, s) {
                            s.model['huvud-RE'] = null;
                        },
                        required: true
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
                    type: 'autoCompleteAdd',
                    key: 'Sekundär tjänsteställe',
                    templateOptions: {
                        label: gettext('Tjänsteställe (Sekundärt)'),
                        placeholder: 'Lägga till ett eller fler sekundär tjänsteställe',
                        options: autocomplete.getTjanstestalleOptions()
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
                        }],
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'today-date',
                    key: 'fr o m',
                    templateOptions: {
                        label: 'fr o m',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'today-date',
                    key: 't o m',
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] === 'tillsvidareanställning';
                    },
                    templateOptions: {
                        label: 't o m',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'vikariat för',
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] !== 'vikariat';
                    },
                    templateOptions: {
                        label: 'vikariat för',
                        required: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    key: 'pga',
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] !== 'vikariat';
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
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] !== 'anställd med timlön';
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

            showErrors(specific);
            return specific;
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
                    className: 'col-md-12',
                    type: 'autocomplete-select',
                    key: 'Rapporterar till (chef)',
                    templateOptions: {
                        label: 'Rapporterar till (chef)',
                        required: true,
                        options: [{
                            name: 'Chef 1',
                            value: 'Chef 1'
                        }, {
                            name: 'Chef 2',
                            value: 'Chef 2'
                        }, {
                            name: 'Chef 3',
                            value: 'Chef 3'
                        }]
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
                    key: 'Befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions()
                    }
                }]

            }];

            showErrors(specific);
            return specific;
        }

        // Nytt konto för ny anställd
        function getOrderEmployeeAccountForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Personuppgifter</b></div>',
                    key: 'personuppgifter',
                    controller: function($scope) {
                        $scope.model[$scope.options.key] = {
                            'Personnummer': model.person.personnummer,
                            'Namn': model.person.namn,
                            'Tjänsteställets besöksadress': autocomplete.getTjanstestalleBesokAdress(model.person['huvud-RE']),
                            'Tjänsteställets postadress': autocomplete.getTjanstestallePostAdress(model.person['huvud-RE']),
                            'Anställningsinformation': getAnstallning(model.person['anställningsform']),
                            'MO (Marknadsområde)': model.person.MO,
                            'Huvud-RE': model.person['huvud-RE'],
                            'Tillhör även RE': model.person['Sekundär tjänsteställe'],
                            'Tjänsteställe / Enhetens namn': autocomplete.getTjanstestalleNamn(model.person['huvud-RE']),
                            'Dagens datum': new Date(),
                            'Beställare': model.orderPerson
                        };

                        function getAnstallning(type) {
                            var retval = {
                                'Anställningsform': type
                            };
                            switch (type) {
                                case 'tillsvidareanställning':
                                    retval['Fr.o.m'] = model.person['fr o m'];
                                    break;
                                default:
                                    retval['Fr.o.m'] = model.person['fr o m'];
                                    retval['T.o.m'] = model.person['t o m'];
                                    break;
                            }

                            return retval;
                        }
                    }
                }, {
                    template: '<div><b>Tjänsteuppgifter</b></div>'
                }, {
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
                    key: 'Befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions(true)
                    }
                }, {
                    type: 'signature'
                }]

            }];

            showErrors(specific);
            return specific;
        }

        // Nyt abonnemang
        function getNewOrderSubscriptionForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Nytt abonnemang</b></div>',
                    key: 'Vald formulär',
                    controller: function($scope) {
                        $scope.model[$scope.options.key] = 'Nytt abonnemang';
                    }
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Anknytningsval',
                    templateOptions: {
                        label: 'Anknytningsval',
                        options: [{
                            name: 'Ny Anknytning med tillhörande mobilnr',
                            value: 'Ny Anknytning med tillhörande mobilnr'
                        }, {
                            name: 'Endast fast ankn',
                            value: 'Endast fast ankn'
                        }, {
                            name: 'Endast mobilabonnemang',
                            value: 'Endast mobilabonnemang'
                        }]
                    }
                }, {
                    template: '<div><b>Flytt av abonnemang till annan användare</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum för ändring',
                    templateOptions: {
                        label: 'Datum för ändring'
                    }
                }]
            }];
            showErrors(specific);
            return specific;
        }

        // Modifiera abonnemang
        function getModifySubscriptionForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'row',
                    type: 'select',
                    key: 'Vald formulär',
                    templateOptions: {
                        label: 'Välj ett formulär',
                        options: [{
                            name: 'Flytt av abonnemang till annan användare',
                            value: 'Flytt'
                        }, {
                            name: 'Uppsägning av abonnemang',
                            value: 'Uppsägning'
                        }]
                    }
                }, {
                    template: '<hr>'
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Flytt av abonnemang till annan användare</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'checkbox',
                    key: 'Anknytning med tillhörande mobilnr',
                    templateOptions: {
                        label: 'Anknytning med tillhörande mobilnr'
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
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Datum för flytt',
                    templateOptions: {
                        label: 'Datum för flytt'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'select',
                    key: 'Behövs nytt simkort ?',
                    templateOptions: {
                        label: 'Behövs nytt simkort ?',
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
                }],
                hideExpression: 'model["Vald formulär"] !== "Flytt"'
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Uppsägning av abonnemang</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Anknytningsval',
                    templateOptions: {
                        label: 'Anknytningsval',
                        options: [{
                            name: 'Anknytning med tillhörande mobilnr',
                            value: 'Anknytning med tillhörande mobilnr'
                        }, {
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
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum för uppsägning',
                    templateOptions: {
                        label: 'Datum för uppsägning'
                    }
                }],
                hideExpression: 'model["Vald formulär"] !== "Uppsägning"'
            }];

            showErrors(specific);
            return specific;
        }

        // Modifiera existerande mobilt bredband
        function getModifyMobileBroadbandForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    type: 'select',
                    key: 'Mobilt bredband ärende',
                    templateOptions: {
                        label: 'Välj ett formulär',
                        options: [{
                            name: 'Flytt av Mobilt bredband till annan användare',
                            value: 'Flytt'
                        }, {
                            name: 'Uppsägning av Mobilt bredband',
                            value: 'Uppsägning'
                        }]
                    }
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
                }],
                hideExpression: 'model["Mobilt bredband ärende"] !== "Flytt"'
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
                        label: 'RE-namn',
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
                }],
                hideExpression: 'model["Mobilt bredband ärende"] !== "Uppsägning"'
            }];
            showErrors(specific);
            return specific;
        }

        // Nytt mobilt bredband formulär
        function getNewMobileBroadband(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Nytt Mobilt bredband</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Mobilt bredband för en existerande dator',
                    templateOptions: {
                        label: 'Mobilt bredband för en existerande dator',
                        defaultOptions: 'Nej',
                        options: [{
                            name: 'Ja',
                            value: 'Ja'
                        }, {
                            name: 'Nej',
                            value: 'Nej'
                        }]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Datorns serienummer',
                    templateOptions: {
                        label: 'Ange serienummer för datorn ifrågan'
                    },
                    hideExpression: 'model["Mobilt bredband för en existerande dator"] !== "Ja"'
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum då abonnemanget ska börja gälla',
                    templateOptions: {
                        label: 'Datum då abonnemanget ska börja gälla'
                    }
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
                    key: 'Användarnamn',
                    templateOptions: {
                        label: 'Användarnamn',
                        disabled: true
                    }
                }]
            }];

            showErrors(specific);
            return specific.concat(getOrderSignaturePart());
        }

        // Nytt telefonutrustning formulär
        function getOrderPhoneEquipmentForm(model) {
            var specific = [{
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
                        disabled: true,
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Beställarens telefon-nr',
                        type: 'tel',
                        disabled: true
                    }
                }, {
                    template: '<div class="col-md-6"><label>Företag</label><p><b><i>AB Previa</i></b></p></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'RE-nr',
                        placeholder: 'Kostnadsbelastad resultatenhet',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Mottagare/Användare (Om annan än beställaren)',
                        disabled: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Leveransadress',
                        disabled: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    templateOptions: {
                        label: 'Postnr',
                        disabled: true
                    }
                }, {
                    className: 'col-md-3',
                    type: 'input',
                    templateOptions: {
                        label: 'Ort',
                        disabled: true
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
                type: 'equipment-select',
                key: 'Telefoner – Produktbeskrivning finns i Previas Handbok',
                templateOptions: {
                    label: 'Telefoner – Produktbeskrivning finns i Previas Handbok',
                    options: autocomplete.getPhoneOptions()
                }
            }, {
                className: 'col-md-12',
                type: 'equipmentTable',
                templateOptions: {

                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Kontorsheadset',
                templateOptions: {
                    label: 'Kontorsheadset',
                    enableModelInput: true,
                    options: autocomplete.getHeadsetOptions()
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Konferenstelefon',
                templateOptions: {
                    label: 'Konferenstelefon',
                    options: autocomplete.getConferencePhoneOptions()
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Tillbehör',
                templateOptions: {
                    label: 'Tillbehör',
                    options: autocomplete.getPhoneAccessoriesOptions()
                }
            }];

            showErrors(specific);
            return specific;
        }

        // Datorutrustning formulär
        function getOrderComputerAccessoriesForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Faktureringuppgifter</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Fakturareferens',
                    templateOptions: {
                        label: 'Fakturareferens',
                        placeholder: '(Sign på den personen som har rollen som ”Godkännare” i Palette)'
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Utrustning</b></div>',
                    controller: function($scope) {
                        $scope.model['Beställare'] = parentModel.orderPerson;
                        $scope.model.Mottagare = {
                            Leveransmottagare: parentModel.person.namn,
                            Leveransadress: autocomplete.getTjanstestalleBesokAdress(parentModel.person['huvud-RE'])
                        };
                    }
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
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }]
            }];
            showErrors(specific);
            return specific;
        }

        // Digital diktering formulär
        function getOrderCareTalkForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Beställare</b></div>'
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefonnummer',
                        disabled: true
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Mailadress',
                    templateOptions: {
                        label: 'Mailadress',
                        placeholder: 'Mailadress till mottagare av orderbekräftelse',
                        required: true,
                        type: 'mail'
                    }
                }, {
                    template: '<div><b>Mottagare</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Leveransadress 1',
                    templateOptions: {
                        label: 'Leveransadress 1',
                        disabled: true
                    },
                    controller: function($scope) {
                        $scope.model['Leveransadress 1'] = 'AB Previa';
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Leveransmottagare'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefonnummer',
                        type: 'tel',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Leveransadress 2',
                    templateOptions: {
                        label: 'Leveransadress 2',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefonnummer',
                        type: 'tel',
                        required: true
                    }
                }, {
                    template: '<div><b>Faktureringsuppgifter</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Fakturaadress',
                    templateOptions: {
                        label: 'Fakturaadress',
                        disabled: true
                    },
                    controller: function($scope) {
                        $scope.model.Fakturaadress = 'AB Previa';
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Re-nr',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Fakturareferens',
                    templateOptions: {
                        label: 'Fakturareferens',
                        placeholder: 'Sign på den personen som har rollen som "Godkännare" i Pallette',
                        required: true
                    },
                    controller: function($scope) {
                        $scope.model.Fakturaadress = 'AB Previa';
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Box',
                    templateOptions: {
                        label: 'Box',
                        disabled: true
                    },
                    controller: function($scope) {
                        $scope.model.Box = 'PAA04220, FE 533';
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Postnr',
                    templateOptions: {
                        label: 'Postnr',
                        disabled: true
                    },
                    controller: function($scope) {
                        $scope.model.Postnr = '105 69';
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Ort',
                    templateOptions: {
                        label: 'Ort',
                        disabled: true
                    },
                    controller: function($scope) {
                        $scope.model.Ort = 'STOCKHOLM';
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    key: 'Maskinvara',
                    type: 'equipment-select',
                    templateOptions: {
                        label: 'Maskinvara',
                        options: autocomplete.getCaretalkHardwareOptions()
                    }
                }, {
                    className: 'col-md-12',
                    key: 'Tillbehör',
                    type: 'equipment-select',
                    templateOptions: {
                        label: 'Tillbehör',
                        options: autocomplete.getCaretalkAccessoriesOptions()
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }


        function setTVisitAdress(targetModel, parentModel) {
            targetModel['Tjänsteställets besöksadress'] = autocomplete.getTjanstestalleBesokAdress(parentModel.person['huvud-RE']);
        }

        function setTPostalAdress(targetModel, parentModel) {
            targetModel['Tjänsteställets postadress'] = autocomplete.getTjanstestallePostAdress(parentModel.person['huvud-RE']);

        }

        function getOrderModifyConsultantAccountForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Ange ny tidsperiod</b></div>',
                    controller: function($scope) {
                        setPersonInfo($scope.model, parentModel);
                        setTVisitAdress($scope.model, parentModel);
                        setTPostalAdress($scope.model, parentModel);
                        setOrderPersonInfo($scope.model, parentModel);
                    }
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Fr.o.m',
                    templateOptions: {
                        label: 'Fr.o.m'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'T.o.m',
                    templateOptions: {
                        label: 'T.o.m'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Mailkonto',
                    templateOptions: {
                        label: 'Mailkonto',
                        options: [{
                            name: 'Ja',
                            value: 'Ja'
                        }, {
                            name: 'Nej',
                            value: 'Nej'
                        }]
                    }
                }, {
                    className: 'col-md-12',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande MO till',
                    templateOptions: {
                        label: 'Ersätt nuvarande MO till',
                        options: autocomplete.getAllMO(),
                        onChange: 'model["Ersätt nuvarande Huvud-RE till"] = null'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Nuvarande Huvud-RE',
                    templateOptions: {
                        label: 'Nuvarande Huvud-RE',
                        disabled: true,
                        placeholder: 'Huvud-RE'
                    },
                    controller: function($scope, personInfo) {
                        if (personInfo.get()) {
                            $scope.model[$scope.options.key] = personInfo.get()['huvud-RE'];
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande Huvud-RE till',
                    templateOptions: {
                        label: 'Ersätt nuvarande Huvud-RE till',
                    },
                    expressionProperties: {
                        'templateOptions.placeholder': '!model["Ersätt nuvarande MO till"] ? "Var vänlig och välj ett MO": "Välj ett RE"',
                        'templateOptions.disabled': '!model["Ersätt nuvarande MO till"]',
                        'templateOptions.options': function(v, o, s) {
                            return autocomplete.getRE(s.model['Ersätt nuvarande MO till']);
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autoCompleteAdd',
                    key: 'Lägg till ytterliggare RE',
                    templateOptions: {
                        label: 'Lägg till ytterliggare RE',
                        options: autocomplete.getRE('All-RE: ')
                    },
                    expressionProperties: {
                        'templateOptions.placeholder': '!model["Ersätt nuvarande MO till"] ? "Var vänlig och välj ett MO": "Välj ett RE"',
                        'templateOptions.disabled': '!model["Ersätt nuvarande MO till"]'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autoCompleteAdd',
                    key: 'Borttag av RE',
                    templateOptions: {
                        label: 'Borttag av RE',
                        onChange: function(v, options, scope) {
                            var model = scope.model;
                            model[options.key] = model[options.key] || [];

                            var index = _.findIndex(scope.model[options.key], function(item) {
                                return item === scope.to.selectedValue.name;
                            });

                            if (index > -1) {
                                return;
                            }

                            model[options.key].push(options.templateOptions.selectedValue.value);
                            options.templateOptions.selectedValue = null;
                        },
                    },
                    controller: function($scope, personInfo) {
                        if (personInfo.person) {
                            var options = [];
                            angular.forEach(personInfo.person['Sekundär tjänsteställe'], function(value) {
                                options.push({
                                    name: value,
                                    value: value
                                });
                            });

                            $scope.to.options = options;
                            $scope.to.placeholder = 'Välj RE som ska tas bort';
                        } else {
                            $scope.to.disabled = true;
                            $scope.to.placeholder = 'Ärende person saknar sekundära RE';
                        }
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Befattning / Roll / Behörighet / Licenser</b></div>'
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
                    key: 'Befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions(false)
                    }
                }, {
                    className: 'col-md-6',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Rapportera till chef',
                    templateOptions: {
                        label: 'Rapportera till chef',
                        required: true
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function getOrderModifyEmployeeAccountForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Tjänsteuppgifter</b></div>',
                    controller: function($scope) {
                        setPersonInfo($scope.model, parentModel);
                        setTVisitAdress($scope.model, parentModel);
                        setTPostalAdress($scope.model, parentModel);
                        setOrderPersonInfo($scope.model, parentModel);
                    }
                }, {
                    className: 'col-md-4',
                    type: 'select',
                    key: 'Anställningsform',
                    templateOptions: {
                        label: 'Anställningsform',
                        options: [{
                            name: 'Provanställning',
                            value: 'Provanställning'
                        }, {
                            name: 'Tillsvidareanställning',
                            value: 'Tillsvidareanställning'
                        }, {
                            name: ' Tidsbegränsad anställning',
                            value: 'Tidsbegränsad anställning'
                        }]
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'Fr.o.m',
                    templateOptions: {
                        label: 'Fr.o.m'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'T.o.m',
                    templateOptions: {
                        label: 'T.o.m'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande MO till',
                    templateOptions: {
                        label: 'Ersätt nuvarande MO till',
                        options: autocomplete.getAllMO(),
                        onChange: 'model["Ersätt nuvarande Huvud-RE till"] = null'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Nuvarande Huvud-RE',
                    templateOptions: {
                        label: 'Nuvarande Huvud-RE',
                        disabled: true,
                        placeholder: 'Huvud-RE'
                    },
                    controller: function($scope, personInfo) {
                        if (personInfo.get()) {
                            $scope.model[$scope.options.key] = personInfo.get()['huvud-RE'];
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande Huvud-RE till',
                    templateOptions: {
                        label: 'Ersätt nuvarande Huvud-RE till',
                    },
                    expressionProperties: {
                        'templateOptions.placeholder': '!model["Ersätt nuvarande MO till"] ? "Var vänlig och välj ett MO": "Välj ett RE"',
                        'templateOptions.disabled': '!model["Ersätt nuvarande MO till"]',
                        'templateOptions.options': function(v, o, s) {
                            return autocomplete.getRE(s.model['Ersätt nuvarande MO till']);
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autoCompleteAdd',
                    key: 'Lägg till ytterliggare RE',
                    templateOptions: {
                        label: 'Lägg till ytterliggare RE',
                        options: autocomplete.getRE('All-RE: ')
                    },
                    expressionProperties: {
                        'templateOptions.placeholder': '!model["Ersätt nuvarande MO till"] ? "Var vänlig och välj ett MO": "Välj ett RE"',
                        'templateOptions.disabled': '!model["Ersätt nuvarande MO till"]'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autoCompleteAdd',
                    key: 'Borttag av RE',
                    templateOptions: {
                        label: 'Borttag av RE',
                        onChange: function(v, options, scope) {
                            var model = scope.model;
                            model[options.key] = model[options.key] || [];

                            var index = _.findIndex(scope.model[options.key], function(item) {
                                return item === scope.to.selectedValue.name;
                            });

                            if (index > -1) {
                                return;
                            }

                            model[options.key].push(options.templateOptions.selectedValue.value);
                            options.templateOptions.selectedValue = null;
                        },
                    },
                    controller: function($scope, personInfo) {
                        if (personInfo.person) {
                            var options = [];
                            angular.forEach(personInfo.person['Sekundär tjänsteställe'], function(value) {
                                options.push({
                                    name: value,
                                    value: value
                                });
                            });

                            $scope.to.options = options;
                            $scope.to.placeholder = 'Välj RE som ska tas bort';
                        } else {
                            $scope.to.disabled = true;
                            $scope.to.placeholder = 'Ärende person saknar sekundära RE';
                        }
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Befattning / Roll / Behörighet / Licenser</b></div>'
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
                    key: 'Befattning',
                    templateOptions: {
                        label: 'Välj Befattning, roll och behörighet',
                        options: autocomplete.getBefattningOptions(true)
                    }
                }, {
                    className: 'col-md-6',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Rapportera till chef',
                    templateOptions: {
                        label: 'Rapportera till chef',
                        required: true
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function getOrderExtendConsultantAccountForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Förläng konto</b></div>',
                    controller: function($scope) {
                        $scope.model['Användarnamn'] = model.person['Användarnamn'];
                        $scope.model.Namn = model.person.namn;
                        $scope.model['Huvud-RE'] = model.person['huvud-RE'];
                        $scope.model['Dagens datum'] = new Date();
                        $scope.model['Behörig beställare'] = model.orderPerson;
                    }
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Fr.o.m',
                    templateOptions: {
                        label: 'Fr.o.m'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'T.o.m',
                    templateOptions: {
                        label: 'T.o.m'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }]
            }];

            return specific;
        }

        function getOrderExtendEmployeeAccountForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Tjänsteuppgifter</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Huvud-RE',
                        disabled: true,
                        placeholder: 'get from personuppgifter'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'select',
                    key: 'Anställningsform',
                    templateOptions: {
                        label: 'Anställningsform',
                        options: [{
                            name: 'Provanställning',
                            value: 'Provanställning'
                        }, {
                            name: 'Tillsvidareanställning',
                            value: 'Tillsvidareanställning'
                        }, {
                            name: ' Tidsbegränsad anställning',
                            value: 'Tidsbegränsad anställning'
                        }]
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'Fr.o.m',
                    templateOptions: {
                        label: 'Fr.o.m'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'today-date',
                    key: 'T.o.m',
                    templateOptions: {
                        label: 'T.o.m'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information'
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function getOrderRemoveAccountForm(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Användarnamn',
                        disabled: 'true'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Förnamn',
                        disabled: 'true'
                    }
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    templateOptions: {
                        label: 'Efternamn',
                        disabled: 'true'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    templateOptions: {
                        label: 'Huvud-RE',
                        disabled: 'true'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Kontot avslutas fr.o.m',
                    templateOptions: {
                        label: 'Kontot avslutas fr.o.m',
                        required: 'true'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Mailbox och H: kopieras till följande person',
                    templateOptions: {
                        label: 'Mailbox och H: kopieras till följande person',
                        description: 'Mailbox behålls i 90 dagar, sedan raderas den automatiskt',
                        required: 'true'
                    }
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information',
                        required: 'true',
                        description: '* En konto-avslut tar cirka 5 arbetsdagar samt kostar cirka 200kr'
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function getOrderManagerForm(model) {
            var specific = [{
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

            showErrors(specific);
            return specific;
        }

        function changeEmploymentStatus(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Namn',
                        placeholder: 'get från personuppgifter',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    templateOptions: {
                        label: 'Personnummer',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'tjanstestalleSelect',
                    templateOptions: {
                        label: 'Tjänsteställe',
                        required: true,
                        options: autocomplete.getTjanstestalleOptions()
                    }
                }, {
                    className: 'col-md-6',
                    type: 'tjanstestalleSelect',
                    templateOptions: {
                        label: 'Resultatenhet',
                        required: true,
                        options: autocomplete.getRE('All-RE')
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Vilken ändring som gäller (t ex ökad eller minskad tjänstgöringsgrad)',
                    templateOptions: {
                        label: 'Vilken ändring som gäller (t ex ökad eller minskad tjänstgöringsgrad)',
                        required: true,
                        type: 'number',
                        placeholder: '%',
                        min: 0
                    }
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum som anger när ändringen skall gälla',
                    templateOptions: {
                        label: 'Datum som anger när ändringen skall gälla',
                        required: true
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }


        // 
        // Form fragments
        // 

        function showErrors(fields) {
            angular.forEach(fields, function(field, index) {
                addShowError(fields[index]);
                if (field.fieldGroup && field.fieldGroup.length > 0) {
                    angular.forEach(field.fieldGroup, function(subField, subIndex) {
                        addShowError(fields[index].fieldGroup[subIndex]);
                    });
                }
            });
        }

        function addShowError(field) {
            if (field && field.templateOptions && field.templateOptions.required) {
                field.validation = {
                    show: true
                };
            }
        }

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
                }]
            }];
        }


        //
        // Model setters
        // 
        
        function setPersonInfo(targetModel, parentModel) {
            targetModel['Användarnamn'] = parentModel.person['Användarnamn'];
            targetModel.Namn = parentModel.person.namn;
        }

        function setOrderPersonInfo(targetModel, parentModel) {
            targetModel['Huvud-RE'] = parentModel.person['huvud-RE'];
            targetModel['Dagens datum'] = new Date();
            targetModel['Behörig beställare'] = parentModel.orderPerson;
        }
    }
})();