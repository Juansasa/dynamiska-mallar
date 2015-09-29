(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NuvarandeAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete, adService) {
        init();

        $scope.personSelected = personSelected;
        $scope.refreshUserList = refreshUserList;
        $scope.employeeSearch = [{
            key: 'person',
            type: 'employeeSearch',
            templateOptions: {
                label: 'Personalsökning',
                placeholder: 'Fyll i namn på personen du leta efter',
                personSelected: personSelected
            }
        }];

        function personSelected() {            
            $scope.fields.formsSelection = [{
                className: 'row',
                fieldGroup: [{
                    className: 'col-md-12',
                    template: '<div><b>Välj de formulär som ska genomföras</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'formSelection',
                    key: 'existingEmployee',
                    templateOptions: {
                        label: 'Välj beställningar som ska genomföras',
                        pre: {
                            name: 'Sök',
                            route: 'bestallning.nuvarande'
                        },
                        post: {
                            name: 'Sammanfattning',
                            route: 'bestallning.nuvarande.sammanfattning'
                        },
                        options: [{
                                name: 'Telefoni',
                                value: {
                                    name: 'Telefoni',
                                    route: 'bestallning.nuvarande.abonnemang',
                                    model: $scope.model.nuvarande.abonnemang
                                }
                            }, {
                                name: 'Mobilbredband',
                                value: {
                                    name: 'Mobilbredband',
                                    route: 'bestallning.nuvarande.mobilbredband',
                                    model: $scope.model.nuvarande.mobilbredband
                                }
                            }, {
                                name: 'Datorutrustning',
                                value: {
                                    name: 'Datorutrustning',
                                    route: 'bestallning.nuvarande.datorutrustning',
                                    model: $scope.model.nuvarande.datorutrustning
                                }
                            }, {
                                name: 'Telefonutrustning',
                                value: {
                                    name: 'Telefonutrustning',
                                    route: 'bestallning.nuvarande.telefoniutrustning',
                                    model: $scope.model.nuvarande.telefonutrustning
                                }
                            }, {
                                name: 'Digital diktering',
                                value: {
                                    name: 'Digital diktering',
                                    route: 'bestallning.nuvarande.digital-diktering',
                                    model: $scope.model.nuvarande.digitaldiktering
                                }
                            },
                            $scope.model.person && $scope.model.person['Anställningstyp'] === 'previa anställd' ? {
                                name: 'Ändra konto',
                                value: {
                                    name: 'Ändra konto',
                                    route: 'bestallning.nuvarande.anstalld.forandring-konto',
                                    model: $scope.model.nuvarande.anstalld.andraKonto
                                }
                            } : {
                                name: 'Ändra konto',
                                value: {
                                    name: 'Ändra konto',
                                    route: 'bestallning.nuvarande.konsult.forandring-konto',
                                    model: $scope.model.nuvarande.konsult.andraKonto
                                }
                            }, {
                                name: 'Avsluta konto',
                                value: {
                                    name: 'Avsluta konto',
                                    route: 'bestallning.nuvarande.avsluta',
                                    model: $scope.model.nuvarande.avsluta
                                }
                            }
                            // , {
                            //     name: 'Ändra anställningsförhållande',
                            //     value: {
                            //         name: 'Ändra anställningsförhållande',
                            //         route: 'bestallning.andra.anstallningsforhallande'
                            //     }
                            // }
                        ]
                    }
                }]
            }];
        }

        $scope.$parent.getSteps = function() {
            if ($scope.model.steps.existingEmployee.length === 2) {
                return $scope.model.steps.existingEmployee.splice(1, 1);
            }
            return $scope.model.steps.existingEmployee;
        };

        $scope.$parent.next = function() {
            var index = findStateIndex($state.current);
            if (index + 1 < $scope.model.steps.existingEmployee.length && $scope.form.$valid) {
                $state.go($scope.model.steps.existingEmployee[index + 1].route);
            }
        };

        $scope.$parent.previous = function() {
            var index = findStateIndex($state.current);
            if (index > 0) {
                $state.go($scope.model.steps.existingEmployee[index - 1].route);
            }
        };

        $scope.$parent.checkGoBack = function() {
            return findStateIndex($state.current) === 0;
        };

        $scope.$parent.checkGoForward = function() {
            return findStateIndex($state.current) === $scope.model.steps.existingEmployee.length - 1;
        };

        function init() {
            $scope.model.nuvarande = $scope.model.nuvarande || {
                konsult: {
                    andraKonto: {}
                },
                anstalld: {
                    andraKonto: {}
                },
                abonnemang: {},
                mobilbredband: {},
                datorutrustning: {},
                telefonutrustning: {},
                digitaldiktering: {},
                avsluta: {}
            };
            $scope.model.steps.existingEmployee = $scope.model.steps.existingEmployee || [{
                name: 'Sök',
                route: 'bestallning.nuvarande'
            }, {
                name: 'Sammanfattning',
                route: 'bestallning.nuvarande.sammanfattning'
            }];
        }

        function refreshUserList(queryString) {
            if (!queryString) {
                return;
            }

            var employees = [];
            return adService.searchUser(queryString).then(function(resp) {
                _.forEach(resp.data, function(item) {
                    employees.push(item);
                });

                $scope.employees = employees;
            });
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps.existingEmployee, function(step) {
                return state.name === step.route;
            });
        }
    }
})();