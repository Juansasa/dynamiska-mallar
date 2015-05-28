(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NuvarandeAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
        init();
        $scope.fields.formsSelection = [{
            className: 'row',
            fieldGroup: [{
                className: 'col-md-12',
                template: '<div><b>Välj de formulär som ska genomföras</b></div>'
            }, {
                className: 'col-md-12',
                type: 'formSelection',
                key: 'steps',
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
                        name: 'Mobilbredband',
                        value: {
                            name: 'Mobilbredband',
                            route: 'bestallning.nuvarande.mobilbredband'
                        }
                    }]
                }
            }]
        }];

        $scope.sok = function() {
            $state.go('bestallning.nuvarande.personinfo');
        };

        $scope.$parent.next = function() {
            var index = findStateIndex($state.current);
            if (index + 1 < $scope.model.steps.length) {
                $state.go($scope.model.steps[index + 1].route);
            }
        };

        $scope.$parent.previous = function() {
            var index = findStateIndex($state.current);
            if (index > 0) {
                $state.go($scope.model.steps[index - 1].route);
            }
        };

        $scope.$parent.checkGoBack = function() {
            return findStateIndex($state.current) === 0;
        };

        $scope.$parent.checkGoForward = function() {
            return findStateIndex($state.current) === $scope.model.steps.length - 1;
        };

        function init() {
            $scope.fields.person = forms.person();
            $scope.model.steps = [{
                name: 'Start',
                route: 'bestallning.nuvarande.personinfo'
            }, {
                name: 'Sammanfattning',
                route: 'bestallning.nuvarande.sammanfattning'
            }];
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps, function(step) {
                return state.name === step.route;
            });
        }
    }
})();