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
            if (index + 1 < $scope.model.steps.newEmployee.length && $scope.form.$valid) {
                $state.go($scope.model.steps.newEmployee[index + 1].route);
            }
        };

        $scope.$parent.canSkip = function() {
            var index = findStateIndex($state.current);
            return $scope.model.steps.newEmployee[index] && $scope.model.steps.newEmployee[index].canSkip;
        };

        $scope.$parent.skip = function() {

            // Clear model-data and mark model as disabled
            var index = findStateIndex($state.current);
            $state.current.skip = true;
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

            if ($scope.model.person && $scope.model.person.employmentType) {
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
                    key: 'employmentType',
                    templateOptions: {
                        label: 'employmentType',
                        options: [{
                            name: 'Previa anställd',
                            value: 'anställd'
                        }, {
                            name: 'Konsult',
                            value: 'konsult'
                        }],
                        required: true,
                        onChange: function() {
                            if ($scope.model.person.employmentType.toLowerCase()) {
                                getPageDataByEmploymentType();
                            }
                        }
                    }
                }]
            }];

            // init form model data
            $scope.model.ny = $scope.model.ny || {
                anstalld: {
                    nyttKonto: {}
                },
                datorutrustning: {},
                mobilbredband: {},
                abonnemang: {},
                telefonutrustning: {},
                digitaldiktering: {}
            };
        }

        function getPageDataByEmploymentType() {
            if (!$scope.model.person) {
                return;
            }

            var wizardSteps = [];
            if ($scope.model.person.employmentType.toLowerCase() === 'konsult') {
                $scope.fields.personinfo = forms.newConsultantPersonalInfo().concat(forms.newConsultantAccount());
                wizardSteps = [{
                    name: 'Nytt konto',
                    route: 'bestallning.ny',
                    model: $scope.model.person
                }];
            } else if ($scope.model.person.employmentType.toLowerCase() === 'anställd') {
                $scope.fields.personinfo = forms.newEmployeePersonalInfo();
                wizardSteps = [{
                    name: 'Anställningsavtal - HR',
                    route: 'bestallning.ny',
                    model: $scope.model.person
                }, {
                    name: 'Nytt konto',
                    route: 'bestallning.ny.anstalld.nytt-konto',
                    model: $scope.model.ny.anstalld.nyttKonto,
                    canSkip: true
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
                name: 'Datorutrustning',
                route: 'bestallning.ny.datorutrustning',
                canSkip: true,
                model: $scope.model.ny.datorutrustning
            }, {
                name: 'Mobilbredband',
                route: 'bestallning.ny.mobilbredband',
                canSkip: true,
                model: $scope.model.ny.mobilbredband
            }, {
                name: 'Telefoni',
                route: 'bestallning.ny.abonnemang',
                canSkip: true,
                model: $scope.model.ny.abonnemang
            }, {
                name: 'Telefonutrustning',
                route: 'bestallning.ny.telefoniutrustning',
                canSkip: true,
                model: $scope.model.ny.telefonutrustning
            }, {
                name: 'Digital diktering',
                route: 'bestallning.ny.digital-diktering',
                canSkip: true,
                model: $scope.model.ny.digitaldiktering
            }];
        }

        function findStateIndex(state) {
            return _.findIndex($scope.model.steps.newEmployee, function(step) {
                return state.name === step.route;
            });
        }
    }
})();