(function() {
    'use strict';

    angular.module('bestallning')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, $filter) {
        var states = [{
            stateName: 'bestallning.ny.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state) {
                            if (!$scope.model.steps || !$scope.model.steps.newEmployee) {
                                $state.go('^');
                            }

                            switch ($scope.model.person.anstallningstyp) {
                                case 'konsult':
                                    $scope.summary = {
                                        'Personuppgift och konto beställning': $scope.model.person
                                    };
                                    break;
                                case 'previa anställd':
                                    $scope.summary = {
                                        'Anställningsavtal': $scope.model.person
                                    };
                            }
                            
                            $scope.summary['Beställningar'] =  $scope.model.ny;
                            $scope.mailBody = convertJsonToMailString($scope.summary);
                        }
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state) {
                            if (!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee) {
                                $state.go('^');
                            }

                            $scope.summary = {
                                person: $scope.model.person,
                                'Beställare': $scope.model.orderPerson,
                                'Beställningar': $scope.model.andra
                            };

                            $scope.mailBody = convertJsonToMailString($scope.summary);
                        }
                    }
                }
            }
        }, {
            stateName: 'bestallning.nuvarande.sammanfattning',
            stateConfig: {
                url: '/sammanfattning',
                views: {
                    'wizardContent@bestallning': {
                        templateUrl: 'components/bestallning/sammanfattning/sammanfattning.html',
                        controller: function($scope, $state) {
                            if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
                                $state.go('^');
                            }

                            $scope.summary = {
                                person: $scope.model.person,
                                'Beställare': $scope.model.orderPerson,
                                'Beställningar': $scope.model.nuvarande
                            };

                            $scope.mailBody = convertJsonToMailString($scope.summary);
                        }
                    }
                }
            }
        }];

        routeHelper.registerStates(states);

        function convertJsonToMailString(jsonObj) {
            return '%0D --------------------------------------------- %0D --------------------------------------------- %0D' + encodeURIComponent($filter('json')(jsonObj));
        }
    }
})();