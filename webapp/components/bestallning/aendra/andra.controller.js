(function() {
    'use strict';
    angular.module('bestallning')
        .controller('AendraController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete, personInfo) {

        init();

        // Ersätt med search call
        $scope.employees = autocomplete.getAllEmployee();

        $scope.fields.formsSelection = [{
            className: 'row',
            fieldGroup: [{
                className: 'col-md-12',
                template: '<div><b>Välj de formulär som ska genomföras</b></div>'
            }, {
                className: 'col-md-12',
                type: 'formSelection',
                key: 'modifyExistingEmployee',
                templateOptions: {
                    label: 'Välj beställningar som ska genomföras',
                    pre: {
                        name: 'Start',
                        route: 'bestallning.andra.personinfo'
                    },
                    post: {
                        name: 'Sammanfattning',
                        route: 'bestallning.andra.sammanfattning'
                    },
                    options: [$scope.model.person && $scope.model.person.anstallningstyp === 'previa anställd' ?
                    {
                        name: 'Förändring Konto',
                        value: {
                            name: 'Förändring Konto',
                            route: 'bestallning.andra.anstalld.forandring-konto'
                        }
                    } : {
                        name: 'Förändring Konto',
                        value: {
                            name: 'Förändring Konto',
                            route: 'bestallning.andra.anstalld.forandring-konto'
                        }
                    },{
                        name: 'Abonnemang',
                        value: {
                            name: 'Abonnemang',
                            route: 'bestallning.andra.abonnemang'
                        }
                    }, {
                        name: 'Mobilbredband',
                        value: {
                            name: 'Mobilbredband',
                            route: 'bestallning.andra.mobilbredband'
                        }
                    }, {
                        name: 'Ändring av anställningsförhållande',
                        value: {
                            name: 'Ändring av anställningsförhållande',
                            route: 'bestallning.andra.anstallningsforhallande'
                        }
                    }, {
                        name: 'Avsluta konto',
                        value: {
                            name: 'Avsluta konto',
                            route: 'bestallning.andra.avsluta'
                        }
                    }]
                }
            }]
        }];


        $scope.selected = function(person) {
            personInfo.set(person);
            $state.go('bestallning.andra.personinfo');
        };

        $scope.$parent.getSteps = function() {
            return $scope.model.steps.modifyExistingEmployee;
        };

        $scope.$parent.next = function() {
            var index = findStateIndex($state.current);
            if (index + 1 < $scope.model.steps.modifyExistingEmployee.length) {
                $state.go($scope.model.steps.modifyExistingEmployee[index + 1].route);
            }
        };

        $scope.$parent.previous = function() {
            var index = findStateIndex($state.current);
            if (index > 0) {
                $state.go($scope.model.steps.modifyExistingEmployee[index - 1].route);
            }
        };

        $scope.$parent.checkGoBack = function() {
            return findStateIndex($state.current) === 0;
        };

        $scope.$parent.checkGoForward = function() {
            return findStateIndex($state.current) === $scope.model.steps.modifyExistingEmployee.length - 1;
        };

        function init() {
            $scope.model.steps.modifyExistingEmployee = $scope.model.steps.modifyExistingEmployee || [{
                name: 'Start',
                route: 'bestallning.andra.personinfo'
            }];

            if($scope.model.person && $scope.model.person.anstallningstyp) {
                $state.go('bestallning.andra.personinfo');
            }
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps.modifyExistingEmployee, function(step) {
                return state.name === step.route;
            });
        }
    }
})();