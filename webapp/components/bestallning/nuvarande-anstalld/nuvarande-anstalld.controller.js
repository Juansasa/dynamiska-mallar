(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NuvarandeAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, autocomplete) {
        init();

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
                            route: 'bestallning.nuvarande.abonnemang'
                        }
                    }, {
                        name: 'Mobilbredband',
                        value: {
                            name: 'Mobilbredband',
                            route: 'bestallning.nuvarande.mobilbredband'
                        }
                    }, {
                        name: 'Datorutrustning',
                        value: {
                            name: 'Datorutrustning',
                            route: 'bestallning.nuvarande.datorutrustning'
                        }
                    }, {
                        name: 'Telefonutrustning',
                        value: {
                            name: 'Telefonutrustning',
                            route: 'bestallning.nuvarande.telefoniutrustning'
                        }
                    }, {
                        name: 'Digital diktering',
                        value: {
                            name: 'Digital diktering',
                            route: 'bestallning.nuvarande.digital-diktering'
                        }
                    }]
                }
            }]
        }];

        $scope.$parent.getSteps = function() {
            if($scope.model.steps.existingEmployee.length === 2) {
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
            $scope.model.person = null;
            $scope.employees = autocomplete.getAllEmployee();
            $scope.model.steps.existingEmployee = [{
                name: 'Sök',
                route: 'bestallning.nuvarande'
            }, {
                name: 'Sammanfattning',
                route: 'bestallning.nuvarande.sammanfattning'
            }];
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps.existingEmployee, function(step) {
                return state.name === step.route;
            });
        }
    }
})();