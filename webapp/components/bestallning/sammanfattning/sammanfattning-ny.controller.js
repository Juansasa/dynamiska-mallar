(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryNewEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter) {
        if (!$scope.model.steps || !$scope.model.steps.newEmployee) {
            $state.go('^');
        }

        if ($scope.model.person) {
            $scope.orders = $scope.model.ny || {};
            switch ($scope.model.person['Anställningstyp']) {
                case 'konsult':
                    $scope.orders['Nytt konto'] = $scope.model.person;
                    break;
                case 'previa anställd':
                    $scope.orders['Anställningsavtal'] = $scope.model.person;
                    break;
                default:
                    break;
            }

            $scope.mailBody = convertJsonToMailString($scope.orders);
        }

        $scope.getValue = function(obj) {
            if (_.isString(obj) || _.isNumber(obj) || _.isBoolean(obj)) {
                return [obj];
            }

            return obj;
        };

        $scope.getOrders = function(model) {
            switch (model.person['Anställningstyp']) {
                case 'konsult':
                    return {
                        'Konto beställning': model.person,
                        'Datorutrustning': model.ny ? model.ny.datorutrustning : null,
                        'Mobilt bredband': model.ny ? model.ny.mobilbredband : null,
                        'Telefonutrustning': model.ny ? model.ny.telefonutrustning : null,
                        'Telefoni': model.ny ? model.ny.abonnemang : null,
                        'Digital diktering': model.ny ? model.ny.digitaldiktering : null,
                    };
                case 'previa anställd':
                    return {
                        'Anställningsavtal': model.person,
                        'Konto beställning': model.ny ? model.ny.anstalld.nyttKonto : null,
                        'Datorutrustning': model.ny ? model.ny.datorutrustning : null,
                        'Mobilt bredband': model.ny ? model.ny.mobilbredband : null,
                        'Telefonutrustning': model.ny ? model.ny.telefonutrustning : null,
                        'Telefoni': model.ny ? model.ny.abonnemang : null,
                        'Digital diktering': model.ny ? model.ny.digitaldiktering : null,
                    };
                default:
                    break;
            }

            return [];
        };

        function convertJsonToMailString(jsonObj) {
            return '%0D --------------------------------------------- %0D --------------------------------------------- %0D' + encodeURIComponent($filter('json')(jsonObj));
        }
    }
})();