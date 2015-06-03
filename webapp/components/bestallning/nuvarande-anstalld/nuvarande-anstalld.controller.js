(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NuvarandeAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state) {
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
                        name: 'Start',
                        route: 'bestallning.nuvarande.personinfo'
                    },
                    post: {
                        name: 'Sammanfattning',
                        route: 'bestallning.nuvarande.sammanfattning'
                    },
                    options: [{
                        name: 'Abonnemang',
                        value: {
                            name: 'Abonnemang',
                            route: 'bestallning.nuvarande.abonnemang'
                        }
                    }, {
                        name: 'Mobilbredband',
                        value: {
                            name: 'Mobilbredband',
                            route: 'bestallning.ny.mobilbredband'
                        }
                    }, {
                        name: 'Datorutrustning',
                        value: {
                            name: 'Datorutrustning',
                            route: 'bestallning.ny.datorutrustning'
                        }
                    }, {
                        name: 'Telefonutrustning',
                        value: {
                            name: 'Telefonutrustning',
                            route: 'bestallning.ny.telefoniutrustning'
                        }
                    }, {
                        name: 'Digital diktering',
                        value: {
                            name: 'Digital diktering',
                            route: 'bestallning.ny.digital-diktering'
                        }
                    }]
                }
            }]
        }];


        $scope.$parent.getSteps = function() {
            return $scope.model.steps.existingEmployee;
        };

        $scope.sok = function() {
            $state.go('bestallning.nuvarande.personinfo');
        };

        $scope.$parent.next = function() {
            var index = findStateIndex($state.current);
            if (index + 1 < $scope.model.steps.existingEmployee.length) {
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
            $scope.model.steps.existingEmployee = $scope.model.steps.existingEmployee || [{
                name: 'Start',
                route: 'bestallning.nuvarande.personinfo'
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