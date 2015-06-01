(function() {
    'use strict';

    angular
        .module('data')
        .factory('autocomplete', exception);

    /*@ngInject*/
    function exception() {
        var service = {
            getTjanstestalleOptions: getToptions,
            getBefattningOptions: getBefattningOptions,
            getAllMO: getMO,
            getRE: getRE
        };
        return service;

        function getRE(MO) {
            if (!MO) {
                return [];
            }
            return [{
                name: MO + '-' + '124124214',
                value: MO + '-' + '124124214'
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
                        }
                    }],
                    subInput: [{
                        type: 'input',
                        key: 'Obligatorisk förskrivarkod',
                        templateOptions: {
                            label: 'Frivillig förskrivarkod',
                            placeholder: 'Förskrivarkod xxx-xxxxx'
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
                        }
                    }]
                }
            ];
        }
    }
})();