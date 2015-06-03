(function() {
    'use strict';
    angular.module('bestallning')
        .controller('NyAnstalldController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, forms) {
        init();

        $scope.$parent.getSteps = function() {
            return $scope.model.steps.newEmployee;
        };

        $scope.$parent.next = function() {
            var index = findStateIndex($state.current);
            if (index + 1 < $scope.model.steps.newEmployee.length) {
                $state.go($scope.model.steps.newEmployee[index + 1].route);
            }
        };

        $scope.$parent.previous = function() {
            var index = findStateIndex($state.current);
            if (index > 0) {
                $state.go($scope.model.steps.newEmployee[index - 1].route);
            }
        };

        $scope.$parent.checkGoBack = function() {
            return findStateIndex($state.current) < 1;
        };

        $scope.$parent.checkGoForward = function() {
            return findStateIndex($state.current) === $scope.model.steps.newEmployee.length - 1;
        };

        function init() {
            // initialize wizardsteps
            $scope.model.steps.newEmployee = $scope.model.steps.newEmployee || [{
                name: 'Start',
                route: $state.current.name
            }];

            if ($scope.model.person && $scope.model.person.anstallningstyp) {
                getPageDataByEmploymentType();
            }

            // initialize employmenttype radio
            $scope.fields.anstallningstyp = [{
                className: 'row',
                fieldGroup: [{
                    template: '<div><b>Personuppgifter</b></div>'
                }, {
                    className: 'col-md-12',
                    type: 'radio',
                    key: 'anstallningstyp',
                    templateOptions: {
                        label: 'Anställningstyp',
                        options: [{
                            name: 'Konsult',
                            value: 'konsult'
                        }, {
                            name: 'Previa anställd',
                            value: 'previa anställd'
                        }],
                        required: true,
                        onChange: function() {
                            if ($scope.model.person.anstallningstyp) {
                                getPageDataByEmploymentType();
                            }
                        }
                    }
                }]
            }];
        }

        function getPageDataByEmploymentType() {
            if (!$scope.model.person) {
                return;
            }

            var wizardSteps = [];
            if ($scope.model.person.anstallningstyp === 'konsult') {
                $scope.fields.personinfo = forms.newConsultantPersonalInfo();
                wizardSteps = [{
                    name: 'Person information',
                    route: 'bestallning.ny'
                }, {
                    name: 'Nytt konto',
                    route: 'bestallning.ny.konsult.nytt-konto'
                }];
            } else if ($scope.model.person.anstallningstyp === 'previa anställd') {
                $scope.fields.personinfo = forms.newEmployeePersonalInfo();
                wizardSteps = [{
                    name: 'Anställningsavtal - HR',
                    route: 'bestallning.ny'
                }, {
                    name: 'Nytt konto',
                    route: 'bestallning.ny.anstalld.nytt-konto'
                }];
            } else {
                return;
            }

            $scope.model.steps.newEmployee = wizardSteps
                .concat(getCommonFormsteps())
                .concat([{
                    name: 'Sammanfattning',
                    route: 'bestallning.ny.sammanfattning'
                }]);
        }

        function getCommonFormsteps() {
            return [{
                name: 'Abonnemang',
                route: 'bestallning.ny.abonnemang'
            }, {
                name: 'Mobilbredband',
                route: 'bestallning.ny.mobilbredband'
            }, {
                name: 'Datorutrustning',
                route: 'bestallning.ny.datorutrustning'
            }, {
                name: 'Telefonutrustning',
                route: 'bestallning.ny.telefoniutrustning'
            }, {
                name: 'Digital diktering',
                route: 'bestallning.ny.digital-diktering'
            }];
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps.newEmployee, function(step) {
                return state.name === step.route;
            });
        }
    }
})();