(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryNewEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto) {
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
            if (isPrimitive(obj)) {
                return [obj];
            }

            return obj;
        };

        $scope.isPrimitive = isPrimitive;
        $scope.isDate = isDate;
        $scope.extractValue = extractValue;
        $scope.isOrderDefined = isOrderDefined;
        $scope.getMailURL = getMailURL;
        $scope.isArray = _.isArray;

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
                        'Konto beställning': model.ny && model.ny.anstalld ? model.ny.anstalld.nyttKonto : null,
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


        function isOrderDefined(order) {
            return order && !_.isEmpty(order);
        }

        function extractValue(obj) {
            if (!obj || _.isEmpty(obj)) {
                return 'Uppgift saknas';
            }

            if (isPrimitive(obj)) {
                if (isDate(obj)) {
                    return $filter('date')(obj, 'yyyy-MM-dd');
                }
                return obj;
            } else {
                return obj;
            }
        }

        function isPrimitive(obj) {
            return !obj || _.isEmpty(obj) || (_.isString(obj) || _.isNumber(obj) || _.isBoolean(obj) || isDate(obj));
        }

        function isDate(obj) {
            return _.isDate(obj);
        }

        function convertJsonToMailString(jsonObj) {
            return '\n \n' + '---------------------------------------------' + '\n' + $filter('json')(jsonObj);
        }

        function getMailURL(order, subject) {
            var recepient = order['Beställning mottagare'];
            var options = {
                cc: $scope.model.orderPerson.email,
                //bcc: 'bcc.this.person@dontgohere.com',
                subject: subject,
                body: convertJsonToMailString(order)
            };

            var href = Mailto.url(recepient, options);

            return href;
        }
    }
})();