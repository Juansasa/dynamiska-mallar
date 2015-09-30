(function() {
    'use strict';

    angular
        .module('data')
        .factory('autocomplete', exception);

    /*@ngInject*/
    function exception($http) {
        var service = {

            getTjanstestalleOptions: getToptions,
            getTjanstestalleBesokAdress: getTBadress,
            getTjanstestallePostAdress: getTPadress,
            getTjanstestalleNamn: getTjanstestalleNamn,

            getBefattningOptions: getBefattningOptions,

            getAllMO: getMO,
            getRE: getRE,

            getComputerLeasingOptions: getComputerLeasingOptions,
            getComputerEquipmentLeasingOptions: getComputerEquipmentLeasingOptions,
            getComputerEquipmentOptions: getComputerEquipmentNoLeasingOptions,
            getIpadLeasingOptions: getIpadLeasingOptions,

            getPhoneOptions: getPhoneOptions,
            getHeadsetOptions: getHeadsetOptions,
            getConferencePhoneOptions: getConferencePhoneOptions,
            getPhoneAccessoriesOptions: getPhoneAccessoriesOptions,
            getCaretalkHardwareOptions: getCaretalkHardwareOptions,
            getCaretalkAccessoriesOptions: getCaretalkAccessoriesOptions,

            getAllEmployee: getAllEmployee
        };
        
        return service;

        function getTjanstestalleNamn(id) {
            return 'Namn(' + id + ')';
        }

        function getTPadress(id) {
            return {
                'Gata/Box': 'exempelgatan',
                Postnummer: '33333',
                Ort: 'Stockholm'
            };
        }


        function getTBadress(id) {
            return {
                Gata: id + ':: St eriks-gata 12',
                Postnummer: '33333',
                Ort: 'Stockholm'
            };
        }

        function getAllEmployee() {
            return [{
                'Anställningstyp': 'previa anställd',
                'användarnamn': 'zqistf',
                'namn': {
                    'förnamn': 'Juan',
                    'mellannamn': 'Von',
                    'efternamn': 'Kiel'
                },
                'adress': {
                    'gata': 'Hemmagatan',
                    'postnummer': 33333,
                    'ort': 'Linköping'
                },
                'telefoner': {
                    'hem': '333-333333',
                    'mobil': '4444-444444'
                },
                'MO': 'MO 2',
                'huvud-RE': 'MO 2-452252',
                'Tjänsteställe (Primärt)': 'Kumla',
                'Sekundär tjänsteställe': [
                    'Tumba',
                    'Kumla'
                ],
                'anställningsform': 'tillsvidareanställning',
                'fr o m': new Date(),
                'Månadslön, heltid': '45000',
                'om begynnelselönen gäller oberoende av årets lönerevision': 'nej',
                'semesterrätt': 25,
                'Rätt till övertids-, restidsersättning': 'ja',
                'egen bil i tjänsten': 'ja'
            }, {
                'Anställningstyp': 'konsult',
                'användarnamn': 'zkkfsgs',
                'namn': {
                    'förnamn': 'Konsult',
                    'mellannamn': 'c',
                    'efternamn': 'Martin'
                },
                'Anställd Fr o m': new Date(),
                'Anställd T o m': new Date(),
                'Mailkonto för konsult': 'Ja',
                'MO': 'MO 3',
                'huvud-RE': 'MO 3-141432535',
                'Tjänsteställe (Primärt)': 'Tumba',
                'Sekundär tjänsteställe': [
                    'All-452252',
                    'All-124124214'
                ],
                'Rapporterar till (chef)': 'John karlsson',
                'Befattningen är en Tf roll': 'ja',
                'Befattning': 'Affärsområdeschef',
                'Fakturareferens': 'Fakturareferens-dddd'
            }];
        }

        function getCaretalkAccessoriesOptions() {
            return $http.get('assets/equipment/careTalkTillbehor.json');
        }

        function getCaretalkHardwareOptions() {
            return $http.get('assets/equipment/careTalkHardvaror.json');
        }

        function getPhoneAccessoriesOptions() {
            return $http.get('assets/equipment/telefonutrustning-tillbehor.json');
        }

        function getConferencePhoneOptions() {
            return $http.get('assets/equipment/telefonutrustning-konferenstelefon.json');
        }

        function getHeadsetOptions() {
            return $http.get('assets/equipment/telefonutrustning-kontorsheadset.json');
        }

        function getPhoneOptions() {
            return $http.get('assets/equipment/telefonutrustning-telefoner.json');
        }

        function getComputerEquipmentNoLeasingOptions() {
            return $http.get('assets/equipment/datorTillbehorEjLeasing.json');
        }


        function getIpadLeasingOptions() {
            return $http.get('assets/equipment/ipadLeasing.json');
        }

        function getComputerEquipmentLeasingOptions() {
            return $http.get('assets/equipment/datorTillbehorLeasing.json');
        }

        function getComputerLeasingOptions() {
            return $http.get('assets/equipment/datorLeasing.json');
        }

        function getRE(MO) {
            if (!MO) {
                return [];
            }
            return [{
                name: MO + '-' + '124124214',
            }, {
                name: MO + '-' + '141432535',
                value: MO + '-' + '141432535'
            }, {
                name: MO + '-' + '452252',
                value: MO + '-' + '452252'
            }, {
                name: MO + '-' + '324523552',
                value: MO + '-' + '324523552'
            }];
        }

        function getMO() {
            return [{
                name: 'MO 1'
            }, {
                name: 'MO 2'
            }, {
                name: 'MO 3'
            }];
        }

        function getToptions() {
            return [{
                name: 'Odensplan',
                value: 'Odensplan',
                besokadress: {
                    gata: 'gata',
                    postnummer: '33333',
                    ort: 'Stockholm'
                }
            }, {
                name: 'Tumba',
                value: 'Tumba',
                besokadress: {
                    gata: 'St eriksplan',
                    postnummer: '33353',
                    ort: 'Linköping'
                }
            }, {
                name: 'Kumla',
                value: 'Kumla',
                besokadress: {
                    gata: 'Brogatan',
                    postnummer: '13414',
                    ort: 'Malmö'
                }
            }, {
                name: 'Summa',
                value: 'Summa',
                besokadress: {
                    gata: 'Trägården',
                    postnummer: '55533',
                    ort: 'Lund'
                }
            }];
        }

        function getBefattningOptions(isEmployee) {
            return [{
                    name: 'Account Manager',
                    $explanations: [
                        'Försäljningsrapportering och försäljningsstatistik',
                        'CRM'
                    ]
                }, {
                    name: 'Affärscontroller',
                    $explanations: [
                        'Visma', 'Mercur', 'Adm access till kuben'
                    ]
                }, {
                    name: 'Affärsutvecklingschef',
                    $explanations: [
                        'Visma', 'Mercur', 'Agda PS'
                    ]
                }, {
                    name: 'Affärsområdeschef',
                    $explanations: [
                        'Visma', 'Mercur', 'Agda PS'
                    ]
                }, {
                    name: 'Affärsstöd - Admin & Service',
                    $explanations: [
                        'Visma', 'Mercur', 'Agda PS'
                    ]
                }, {
                    name: 'Affärsstöd – Ekonomi',
                    $explanations: [
                        'Visma', 'Mercur', 'Option administratörs behörighet 3Q ( efter genomgången utbildning)'
                    ]
                }, {
                    name: 'Affärsstöd - Sälj & Marknad',
                    $explanations: [
                        'Option administratörs behörighet 3Q ( efter genomgången utbildning)'
                    ]
                }, {
                    name: 'Affärsutvecklingschef',
                }, {
                    name: 'Anbudsansvarig',
                }, {
                    name: 'Anbudskoordinator',
                }, {
                    name: 'Arbetsmiljöingenjör',
                }, {
                    name: 'Arbetsmiljökonsult',
                }, {
                    name: 'Arbetsmiljötekniker',
                }, {
                    name: 'Barnmorska – Ej obligatorisk förskrivarkod',
                    $explanations: [
                        'Quid Agis'
                    ]
                }, {
                    name: 'Beteendevetare',
                    $explanations: [
                        'Quid Agis'
                    ],
                    $subOptions: [{
                        key: 'Beteendevetare-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Callcenteragent',
                    $explanations: [
                        'Se specifik lista för roller inom KSC'
                    ]
                }, {
                    name: 'CFO',
                    $explanations: [
                        'Agda PS', 'Visma', 'Mercur'
                    ]
                }, {
                    name: 'Chef Previa Trygghetstjänster',
                }, {
                    name: 'Drift och förvaltningsansvarig',
                    $explanations: [
                        'IT Kontakt'
                    ]
                }, {
                    name: 'Drogterapeut',
                    $explanations: [
                        'Quid Agis'
                    ]
                }, {
                    name: 'Ekonomiassistent',
                    $explanations: [
                        'Visma'
                    ]
                }, {
                    name: 'Ekonomichef',
                    $explanations: [
                        'Agda PS', 'Visma', 'Mercur'
                    ]
                }, {
                    name: 'Faktureringsekonom',
                    $explanations: [
                        'Visma'
                    ]
                }, {
                    name: 'Fysioterapeut',
                    $explanations: [
                        'Quid Agis', 'Mobilus (kostnad)', 'Vidar - Video- och datorbaserad arbetsanalys för sjukgymnaster (kostnad)'
                    ],
                    $subOptions: [{
                        key: 'Fysioterapeut-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: ' CareTalk - Digital diktering (kostnad) (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Företagsläkare',
                    $explanations: [
                        'Quid Agis', 'Cardio Controll - EKG/Spiro (OBS! Se handboken för installationsinstruktion)',
                        'CareTalk - Digital diktering (OBS! Se handboken för installationsinstruktion)'
                    ],
                    $subInput: [{
                        type: 'input',
                        key: 'Obligatorisk förskrivarkod',
                        templateOptions: {
                            label: 'Obligatorisk förskrivarkod',
                            required: true,
                            placeholder: 'Förskrivarkod xxx-xxxxx'
                        }
                    }]
                }, {
                    name: 'Företagssköterska',
                    $explanations: [
                        'Quid Agis', 'Mobilus (kostnad)', 'Vidar - Video- och datorbaserad arbetsanalys för sjukgymnaster (kostnad)'
                    ],
                    $subOptions: [{
                        key: 'Företagssköterska-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: ' CareTalk - Digital diktering (kostnad) (OBS! Se handboken för installationsinstruktion)'
                        }
                    }],
                    $subInput: [{
                        type: 'input',
                        key: 'Obligatorisk förskrivarkod',
                        templateOptions: {
                            label: 'Frivillig förskrivarkod',
                            placeholder: 'Förskrivarkod xxx-xxxxx'
                        }
                    }]
                }, {
                    name: 'Försäljnings- och Marknadschef (FMC)',
                    $explanations: [
                        'Försäljningsrapportering och försäljningsstatistik',
                        'Agda PS',
                        'CRM',
                        'Visma',
                        'Mercur'
                    ]
                }, {
                    name: 'Försäljningschef',
                    $explanations: [
                        'Försäljningsrapportering och försäljningsstatistik',
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                }, {
                    name: 'HR-ansvarig',
                    $explanations: [
                        'Agda PS'
                    ]
                }, {
                    name: 'HR-chef',
                    $explanations: [
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                }, {
                    name: 'Hälsoutvecklare',
                    $explanations: [
                        'Quid Agis'
                    ]
                }, {
                    name: 'Informationschef',
                    $explanations: [
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                }, {
                    name: 'IT-chef',
                    $explanations: [
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                },
                isEmployee ? {
                    name: 'IT-koordinator',
                } : {
                    name: 'IT-konsult',
                }, {
                    name: 'Key Account Manager',
                    $explanations: [
                        'Försäljningsrapportering och försäljningsstatistik',
                        'CRM'
                    ]
                }, {
                    name: 'Kundservicehandläggare',
                    $explanations: [
                        'Se specifik lista för roller inom KSC'
                    ]
                }, {
                    name: 'Konsultchef',
                    $explanations: [
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                }, {
                    name: 'Kvalitets- och miljösamordnare',
                }, {
                    name: 'Kvalitets-och miljöansvarig',
                }, {
                    name: 'Leg psykolog',
                    $explanations: [
                        'Quid Agis'
                    ],
                    $subOptions: [{
                        key: 'Leg psykolog-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Löneadministratör',
                    $explanations: [
                        'Agda PS'
                    ]
                }, {
                    name: 'Marknadsområdeschef (MOC)',
                    $explanations: [
                        'Agda PS',
                        'Mercur',
                        'Visma'
                    ]
                }, {
                    name: 'Operativ samordnare',
                    $subOptions: [{
                        key: 'Operativ samordnare option',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Agda PS'
                        }
                    }]
                }, {
                    name: 'Organisationskonsult',
                    $explanations: [
                        'Quid Agis'
                    ],
                    $subOptions: [{
                        key: 'Organisationskonsult-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Produktionsplanerare',
                }, {
                    name: 'Projektledare',
                }, {
                    name: 'Projektsamordnare',
                }, {
                    name: 'PTP-psykolog',
                    $explanations: [
                        'Quid Agis'
                    ],
                    $subOptions: [{
                        key: 'PTP-psykolog-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Receptionist',
                    $subOptions: [{
                        key: 'Receptionist-option',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Quid Agis'
                        }
                    }]
                }, {
                    name: 'Redovisningscontroller',
                    $explanations: [
                        'Visma'
                    ]
                }, {
                    name: 'Sales Executive',
                    $explanations: [
                        'Försäljningsrapportering och försäljningsstatistik',
                        'CRM'
                    ]
                }, {
                    name: 'S&F Agent',
                    $explanations: [
                        'Se specifik lista för roller inom KSC'
                    ]
                }, {
                    name: 'Systemkoordinator',
                }, {
                    name: 'Telefonsjuksköterska',
                    $explanations: [
                        'Se specifik lista för roller inom KSC'
                    ]
                }, {
                    name: 'Undersköterska',
                    $explanations: [
                        'Quid Agis',
                        'Cardio Controll - EKG/Spiro'
                    ],
                    $subOptions: [{
                        key: 'Undersköterska-CareTalk',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'CareTalk - Digital diktering  (OBS! Se handboken för installationsinstruktion)'
                        }
                    }]
                }, {
                    name: 'Vaktmästare',
                }, {
                    name: 'VD',
                    $explanations: [
                        'Agda PS'
                    ]
                }, {
                    name: 'Växeltelefonist',
                    $explanations: [
                        'Se specifik lista för roller inom KSC'
                    ]
                }, {
                    name: 'Övrig kontorspersonal',
                    $explanations: [
                        'Quid Agis',
                        'Cardio Controll - EKG/Spiro'
                    ],
                    $subOptions: [{
                        key: 'Övrig kontorspersonal-option',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Quid Agis'
                        }
                    }]
                }
            ];
        }
    }
})();