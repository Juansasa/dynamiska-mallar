(function() {
    'use strict';

    angular
        .module('forms')
        .factory('forms', exception);

    /*@ngInject*/
    function exception(FORMKEYS, gettext, autocomplete, dataSharing) {
        var service = {
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
            //modifySubscription: getModifySubscriptionForm,

            careTalk: getOrderCareTalkForm,

            computerAccessories: getOrderComputerAccessoriesForm,

            //modifyMobileBroadband: getModifyMobileBroadbandForm,
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
                    template: '<div><b>Anställningsperiod</b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Anställd Fr o m',
                    templateOptions: {
                        label: 'Fr o m',
                        required: true
                    }
                }, {
                    className: 'col-md-6',
                    type: 'today-date',
                    key: 'Anställd T o m',
                    templateOptions: {
                        label: 'T o m',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Mailkonto för konsult',
                    templateOptions: {
                        label: 'Mailkonto för konsult',
                        options: [{
                            value: 'Ja',
                            name: 'Ja'
                        }, {
                            value: 'Nej',
                            name: 'Nej'
                        }],
                        required: true
                    }
                }, {
                    className: 'col-md-4',
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
                    className: 'col-md-4',
                    type: 'tjanstestalleSelect',
                    key: 'Tjänsteställe (Primärt)',
                    templateOptions: {
                        label: gettext('Tjänsteställe'),
                        placeholder: 'Välj ett tjänsteställe',
                        options: autocomplete.getTjanstestalleOptions(),
                        required: true
                    }
                }, {
                    className: 'col-md-4',
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
                    className: 'col-md-4',
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
                    className: 'col-md-4',
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
                }, {
                    className: 'col-md-4',
                    type: 'input',
                    key: 'Tjänstgöringsgrad',
                    templateOptions: {
                        label: 'Tjänstgöringsgrad',
                        type: 'number',
                        min: 0,
                        max: 100,
                        placeholder: '%'
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Tjänsteställe (Primärt)',
                    templateOptions: {
                        label: 'Tjänsteställe (Primärt)',
                        placeholder: 'Välj från listan',
                        required: true,
                        options: autocomplete.getTjanstestalleOptions()
                    }
                }, {
                    className: 'col-md-6',
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
                    key: 'orsak',
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] !== 'vikariat';
                    },
                    templateOptions: {
                        label: 'orsak',
                        required: true
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Lön<b></div>'
                }, {
                    className: 'col-md-6',
                    type: 'input',
                    key: 'Månadslön, heltid',
                    templateOptions: {
                        label: 'Månadslön, heltid',
                        required: true
                    },
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] === 'anställd med timlön';
                    }
                }, {
                    className: 'col-md-6',
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
                    className: 'col-md-6',
                    type: 'radio',
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
                    },
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['anställningsform'] === 'anställd med timlön';
                    }
                }, {
                    className: 'col-md-6',
                    type: 'radio',
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
                    hideExpression: function(vv, mv, scope) {
                        return scope.model['semesterrätt'] !== 25;
                    }
                }, {
                    className: 'col-md-12',
                    key: 'egen bil i tjänsten',
                    type: 'radio',
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
                    template: '<div><b>Befattning / Roll / Behörighet / Lincenser</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'radio',
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
                }, {
                    type: 'signature'
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
                    template: '<div><b>Tjänsteuppgifter</b></div>',
                    key: 'Ärende person',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model[$scope.options.key] = {
                            'Personnummer': model.person ? model.person.personnummer : null,
                            'Namn': model.person ? model.person.namn : null,
                            'Tjänsteställets besöksadress': autocomplete.getTjanstestalleBesokAdress(model.person['huvud-RE']),
                            'Tjänsteställets postadress': autocomplete.getTjanstestallePostAdress(model.person['huvud-RE']),
                            'Anställningsinformation': getAnstallning(model.person['anställningsform']),
                            'MO (Marknadsområde)': model.person.MO,
                            'Huvud-RE': model.person['huvud-RE'],
                            'Tillhör även RE': model.person['Sekundär tjänsteställe'],
                            'Tjänsteställe / Enhetens namn': autocomplete.getTjanstestalleNamn(model.person['huvud-RE']),
                        };
                        $scope.model['Beställare'] = model.orderPerson;
                        $scope.model['Dagens datum'] = new Date();

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
        function getNewOrderSubscriptionForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Vald formulär',
                    templateOptions: {
                        label: 'Välj ett formulär',
                        options: [{
                            name: 'Nytt abonnemang',
                            value: 'Nytt abonnemang'
                        }, {
                            name: 'Flytt av abonnemang till annan användare',
                            value: 'Flytt av abonnemang till annan användare'
                        }, {
                            name: 'Uppsägning av abonnemang',
                            value: 'Uppsägning av abonnemang'
                        }]
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Nytt abonnemang</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model['Beställnings datum'] = new Date();
                        $scope.model.Abonent = {
                            Namn: parentModel.person.name,
                            Resultatenhet: parentModel.person.RE,
                            Postadress: parentModel.person.address
                        };
                        $scope.model['Beställare'] = {
                            Namn: parentModel.orderPerson.name,
                            Telefonnummer: parentModel.orderPerson.telephones
                        };
                    }
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum abonnemanget ska börja gälla',
                    templateOptions: {
                        label: 'Datum abonnemanget ska börja gälla'
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
                }],
                hideExpression: 'model["Vald formulär"] !== "Nytt abonnemang"'
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Flytt av abonnemang till annan användare</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model['Beställnings datum'] = new Date();
                        $scope.model.Abonent = {
                            Namn: parentModel.person.name,
                            Resultatenhet: parentModel.person.RE,
                            Postadress: parentModel.person.address
                        };
                        $scope.model.Kontaktperson = {
                            Namn: parentModel.orderPerson.name,
                            Telefonnummer: parentModel.orderPerson.telephonesephones
                        };
                    }
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
                hideExpression: 'model["Vald formulär"] !== "Flytt av abonnemang till annan användare"'
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Uppsägning av abonnemang</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model['Beställnings datum'] = new Date();
                        $scope.model.Abonent = {
                            Resultatenhet: parentModel.person.RE
                        };
                        $scope.model.Kontaktperson = {
                            Namn: parentModel.orderPerson.name,
                            Telefonnummer: parentModel.orderPerson.telephones
                        };
                    }
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
                hideExpression: 'model["Vald formulär"] !== "Uppsägning av abonnemang"'
            }];
            showErrors(specific);
            return specific.concat(getOrderSignaturePart());
        }

        // Nytt mobilt bredband formulär
        function getNewMobileBroadband(parentModel) {
            var formTypeKey = 'Bäställningen gäller';

            var specific = [{
                className: 'col-md-12',
                fieldGroup: [{
                    type: 'radio',
                    key: formTypeKey,
                    templateOptions: {
                        label: 'Välj ett formulär',
                        options: [{
                            name: 'Nytt Mobilt bredband',
                            value: 'Nytt Mobilt bredband'
                        }, {
                            name: 'Flytt av Mobilt bredband till annan användare',
                            value: 'Flytt av Mobilt bredband till annan användare'
                        }, {
                            name: 'Uppsägning av Mobilt bredband',
                            value: 'Uppsägning av Mobilt bredband'
                        }],
                        onChange: function(v, o, s) {
                            // Clear out old model data
                            _.forIn(s.model, function(value, key) {
                                if(!(key === formTypeKey || key === 'Abonnent' || key === 'Kontaktperson')) {
                                    delete s.model[key];
                                }
                            });
                        }
                    }
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'Mobilt bredband för en existerande dator',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model.Abonnent = {
                            Namn: parentModel.person.name,
                            Resultatenhet: parentModel.person.RE,
                            Postadress: parentModel.person.address
                        };

                        $scope.model.Kontaktperson = {
                            Namn: parentModel.orderPerson.name,
                            Telefonnummer: parentModel.orderPerson.telephones
                        };
                    },
                    templateOptions: {
                        label: 'Mobilt bredband för en existerande dator ?',
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
                    key: 'Datornamn',
                    templateOptions: {
                        label: 'Ange datornamn'
                    },
                    hideExpression: 'model["Mobilt bredband för en existerande dator"] !== "Ja"'
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Datum då abonnemanget ska börja gälla',
                    templateOptions: {
                        label: 'Datum då abonnemanget ska börja gälla'
                    }
                }],
                hideExpression: 'model["' + formTypeKey + '"] !== "Nytt Mobilt bredband"'
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Flytt av Mobilt bredband till annan användare</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model.Abonnent = {
                            Namn: parentModel.person.name,
                            'Användarnamn': parentModel.person.username,
                            Resultatenhet: parentModel.person.RE,
                            Postadress: parentModel.person.address
                        };
                        $scope.model.Kontaktperson = {
                            Namn: parentModel.orderPerson.name,
                            Telefonnummer: parentModel.orderPerson.telephones
                        };
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
                    type: 'input',
                    key: 'Telefonnummer',
                    templateOptions: {
                        label: 'Telefonnummer',
                        type: 'tel'
                    }
                }],
                hideExpression: 'model["' + formTypeKey + '"] !== "Flytt av Mobilt bredband till annan användare"'
            }, {
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Uppsägning av Mobilt bredband</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model.Abonnent = {
                            Resultatenhet: parentModel.person.RE,
                            Kontaktperson: {
                                Namn: parentModel.orderPerson.name,
                                Telefonnummer: parentModel.orderPerson.telephonesephones
                            }
                        };
                    }
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
                }],
                hideExpression: 'model["' + formTypeKey + '"] !== "Uppsägning av Mobilt bredband"'
            }];

            showErrors(specific);
            return specific.concat(getOrderSignaturePart());
        }

        // Nytt telefonutrustning formulär
        function getOrderPhoneEquipmentForm(parentModel) {
            var specific = [{
                template: '<div><b>Utrustning</b></div>',
                controller: /*@ngInject*/ function($scope) {
                    $scope.model['Beställare'] = {
                        'Namn': parentModel.orderPerson.name,
                        'Tel': parentModel.orderPerson.telephones
                    };
                    $scope.model['Företag'] = 'AB Previa';
                    $scope.model['RE som beställningen avser'] = parentModel.person.RE;
                    $scope.model['Mottagare/Användare'] = {
                        'Namn': parentModel.person.name,
                        'Tel': parentModel.person.telefoner,
                        'Leveransadress': autocomplete.getTjanstestalleBesokAdress(parentModel.person.RE),
                        'Fakturaadress': 'AB Previa, PAA04220, FE 533, 105 69, STOCKHOLM'
                    };
                    $scope.model.Fakturaadress = dataSharing.get('Fakturaadress');
                    $scope.model['Dagens datum'] = new Date();
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Telefoner – Produktbeskrivning finns i Previas Handbok',
                templateOptions: {
                    label: 'Telefoner – Produktbeskrivning finns i Previas Handbok'
                },
                controller: /*@ngInject*/ function($scope, logger) {
                    var promise = autocomplete.getPhoneOptions();
                    promise.then(success, fail);

                    function success(response) {
                        $scope.to.options = response.data;
                    }

                    function fail(error) {
                        logger.error('Något gick fel när telefoner data ska läsas in', error);
                    }
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Kontorsheadset',
                templateOptions: {
                    label: 'Kontorsheadset',
                    enableModelInput: true
                },
                controller: /*@ngInject*/ function($scope, logger) {
                    var promise = autocomplete.getHeadsetOptions();
                    promise.then(success, fail);

                    function success(response) {
                        $scope.to.options = response.data;
                    }

                    function fail(error) {
                        logger.error('Något gick fel när kontorsheadset data ska läsas in', error);
                    }
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Konferenstelefon',
                templateOptions: {
                    label: 'Konferenstelefon'
                },
                controller: /*@ngInject*/ function($scope, logger) {
                    var promise = autocomplete.getConferencePhoneOptions();
                    promise.then(success, fail);

                    function success(response) {
                        $scope.to.options = response.data;
                    }

                    function fail(error) {
                        logger.error('Något gick fel när konferenstelefon data ska läsas in', error);
                    }
                }
            }, {
                className: 'col-md-12',
                type: 'equipment-select',
                key: 'Tillbehör',
                templateOptions: {
                    label: 'Tillbehör'
                },
                controller: /*@ngInject*/ function($scope, logger) {
                    var promise = autocomplete.getPhoneAccessoriesOptions();
                    promise.then(success, fail);

                    function success(response) {
                        $scope.to.options = response.data;
                    }

                    function fail(error) {
                        logger.error('Något gick fel när telefontillbehör data ska läsas in', error);
                    }
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
                    template: '<div><b>Utrustning</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        $scope.model['Beställare'] = parentModel.orderPerson.name;
                        $scope.model['RE som beställningen avser'] = parentModel.person.RE;
                        $scope.model.Mottagare = {
                            Leveransmottagare: parentModel.person.name,
                            Leveransadress: autocomplete.getTjanstestalleBesokAdress(parentModel.person.RE)
                        };
                        $scope.model.Datum = new Date();
                        $scope.model.Fakturareferens = dataSharing.get('Fakturareferens');
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Dator – Leasing 36 mån',
                    templateOptions: {
                        label: 'Dator – Leasing 36 mån'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getComputerLeasingOptions();
                        promise.then(success, fail);

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när dator-leasing data ska läsas in', error);
                        }
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'iPad – Leasing 12 mån',
                    templateOptions: {
                        label: 'iPad – Leasing 12 mån'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getIpadLeasingOptions();
                        promise.then(success, fail);

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när ipad-leasing data ska läsas in', error);
                        }
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Tillbehör – Leasing 36 mån',
                    templateOptions: {
                        label: 'Tillbehör – Leasing 36 mån'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getComputerEquipmentLeasingOptions();
                        promise.then(success, fail);

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när datortillbehör leasing data ska läsas in', error);
                        }
                    }
                }, {
                    className: 'col-md-12',
                    type: 'equipment-select',
                    key: 'Tillbehör - EJ leasing',
                    templateOptions: {
                        label: 'Tillbehör - EJ leasing'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getComputerEquipmentOptions();
                        promise.then(success, fail);

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när dator-leasing data ska läsas in', error);
                        }
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
        function getOrderCareTalkForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    key: 'Maskinvara',
                    type: 'equipment-select',
                    templateOptions: {
                        label: 'Maskinvara'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getCaretalkHardwareOptions();
                        promise.then(success, fail);
                        $scope.model['Beställare'] = {
                            Namn: parentModel.orderPerson.name,
                            Tel: parentModel.orderPerson.telephones,
                            Mailadress: parentModel.orderPerson.email
                        };

                        $scope.model.Leveransuppgifter = {
                            'Leveransadress 1': 'AB Previa',
                            Leveransmottagare: {
                                Namn: parentModel.person.name,
                                'Leveransadress 2': autocomplete.getTjanstestalleBesokAdress(parentModel.person.RE)
                            }
                        };

                        $scope.model.Fakturaadress = 'AB Previa';
                        $scope.model['Box/Postnr/Ort'] = 'PAA04220, FE 533 105 69, STOCKHOLM';
                        $scope.model['Dagens datum'] = new Date();
                        $scope.model.Fakturareferens = dataSharing.get('Fakturareferens');

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när caretalk hårdvaror ska hämtas', error);
                        }
                    }
                }, {
                    className: 'col-md-12',
                    key: 'Tillbehör',
                    type: 'equipment-select',
                    templateOptions: {
                        label: 'Tillbehör'
                    },
                    controller: /*@ngInject*/ function($scope, logger) {
                        var promise = autocomplete.getCaretalkAccessoriesOptions();
                        promise.then(success, fail);

                        function success(response) {
                            $scope.to.options = response.data;
                        }

                        function fail(error) {
                            logger.error('Något gick fel när caretalk tillbehör ska hämtas', error);
                        }
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }


        function setTVisitAdress(targetModel, parentModel) {
            targetModel['Tjänsteställets besöksadress'] = autocomplete.getTjanstestalleBesokAdress(parentModel.person.RE);
        }

        function setTPostalAdress(targetModel, parentModel) {
            targetModel['Tjänsteställets postadress'] = parentModel.person.address;

        }

        function getOrderModifyConsultantAccountForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Ange ny tidsperiod</b></div>',
                    controller: /*@ngInject*/ function($scope) {
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
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande MO till',
                    templateOptions: {
                        options: autocomplete.getAllMO(),
                        onChange: 'model["Ersätt nuvarande Huvud-RE till"] = null',
                        placeholder: 'Välj i listan'
                    },
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person && parentModel.person.MO) {
                            $scope.to.label = 'Ersätt nuvarande MO' + ': "' + parentModel.person.MO + '" ' + 'till';
                        } else {
                            $scope.to.label = 'Ersätt nuvarande MO till';
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande Huvud-RE till',
                    templateOptions: {
                        placeholder: 'Välj i listan'
                    },
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person && parentModel.person.MO) {
                            $scope.to.label = 'Ersätt nuvarande Huvud-RE' + ': "' + parentModel.person.RE + '" ' + 'till';
                        } else {
                            $scope.to.label = 'Ersätt nuvarande Huvud-RE till';
                        }
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
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person) {
                            var options = [];
                            angular.forEach(parentModel.person['Sekundär tjänsteställe'], function(value) {
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
                    controller: /*@ngInject*/ function($scope) {
                        setPersonInfo($scope.model, parentModel);
                        setTVisitAdress($scope.model, parentModel);
                        setTPostalAdress($scope.model, parentModel);
                        setOrderPersonInfo($scope.model, parentModel);
                    }
                }, {
                    className: 'col-md-12',
                    type: 'autocomplete-select',
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
                        }],
                        placeholder: 'Välj i listan'
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
                    },
                    hideExpression: 'model["Anställningsform"] === "Tillsvidareanställning"'
                }]
            }, {
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande MO till',
                    templateOptions: {
                        options: autocomplete.getAllMO(),
                        onChange: 'model["Ersätt nuvarande Huvud-RE till"] = null'
                    },
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person && parentModel.person.MO) {
                            $scope.to.label = 'Ersätt nuvarande MO' + ': "' + parentModel.person.MO + '" ' + 'till';
                        } else {
                            $scope.to.label = 'Ersätt nuvarande MO till';
                        }
                    }
                }, {
                    className: 'col-md-6',
                    type: 'autocomplete-select',
                    key: 'Ersätt nuvarande Huvud-RE till',
                    templateOptions: {
                        label: 'Ersätt nuvarande Huvud-RE till',
                    },
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person && parentModel.person.MO) {
                            $scope.to.label = 'Ersätt nuvarande Huvud-RE' + ': "' + parentModel.person.RE + '" ' + 'till';
                        } else {
                            $scope.to.label = 'Ersätt nuvarande Huvud-RE till';
                        }
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
                    key: 'Borttag av existerande RE',
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
                    controller: /*@ngInject*/ function($scope) {
                        if (parentModel.person) {
                            var options = [];
                            angular.forEach(parentModel.person['Sekundär tjänsteställe'], function(value) {
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
                    controller: /*@ngInject*/ function($scope) {
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

        function getOrderExtendEmployeeAccountForm(parentModel) {
            console.log('anställd');
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Tjänsteuppgifter</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        setPersonInfo($scope.model, parentModel);
                        $scope.model['Huvud-RE'] = parentModel.person.RE;
                        $scope.model['Dagens datum'] = new Date();
                        $scope.model['Beställare'] = parentModel.orderPerson;
                    }
                }, {
                    className: 'col-md-12',
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
                        }],
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
                    },
                    hideExpression: 'model["Anställningsform"] === "Tillsvidareanställning"'
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information',
                        description: 'En kontobeställning-/ändring/-avslut tar cirka 5 arbetsdagar samt kostar cirka 200 kronor'
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function getOrderRemoveAccountForm(parentModel) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Avsluta konto</b></div>',
                    controller: /*@ngInject*/ function($scope) {
                        setPersonInfo($scope.model, parentModel);
                        $scope['huvud-RE'] = parentModel.person.RE;
                        $scope['Dagens datum'] = new Date();
                        $scope['Beställare'] = parentModel.orderPerson;
                    }
                }, {
                    className: 'col-md-12',
                    type: 'today-date',
                    key: 'Kontot avslutas fr.o.m',
                    templateOptions: {
                        label: 'Kontot avslutas fr.o.m',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'input',
                    key: 'Mailbox och H: kopieras till följande person',
                    templateOptions: {
                        label: 'Mailbox och H: kopieras till följande person',
                        description: 'Mailbox behålls i 90 dagar, sedan raderas den automatiskt',
                        required: true
                    }
                }, {
                    className: 'col-md-12',
                    type: 'textarea',
                    key: 'Övrig information',
                    templateOptions: {
                        label: 'Övrig information',
                        description: '* En konto-avslut tar cirka 5 arbetsdagar samt kostar cirka 200kr'
                    }
                }]
            }];

            showErrors(specific);
            return specific;
        }

        function changeEmploymentStatus(model) {
            var specific = [{
                className: 'row',
                fieldGroup: [{
                    template: '<h1>Work in progress ...</h1>'
                }, {
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
                    key: 'Övriga upplysningar',
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
            targetModel['Användarnamn'] = parentModel.person['användarnamn'];
            targetModel.Namn = parentModel.person.name;
        }

        function setOrderPersonInfo(targetModel, parentModel) {
            targetModel['Nuvarande huvud-RE'] = parentModel.person.RE;
            targetModel['Dagens datum'] = new Date();
            targetModel['Behörig beställare'] = parentModel.orderPerson;
        }
    }
})();