(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryExistingEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto) {
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
            $state.go('^');
        }

        $scope.isPrimitive = isPrimitive;
        $scope.isDate = isDate;
        $scope.extractValue = extractValue;
        $scope.isOrderDefined = isOrderDefined;
        $scope.getMailURL = getMailURL;
        $scope.getOrders = getOrders;


        function getOrders(model) {
            return {
                'Datorutrustning': model.nuvarande ? model.nuvarande.datorutrustning : null,
                'Mobilt bredband': model.nuvarande ? model.nuvarande.mobilbredband : null,
                'Telefonutrustning': model.nuvarande ? model.nuvarande.telefonutrustning : null,
                'Telefoni': model.nuvarande ? model.nuvarande.abonnemang : null,
                'Digital diktering': model.nuvarande ? model.nuvarande.digitaldiktering : null,
            };
        }

        function isOrderDefined(order) {
            return order && !_.isEmpty(order);
        }

        function extractValue(obj) {
            if (_.isNull(obj) || _.isUndefined(obj) || _.isObject(obj) && _.isEmpty(obj)) {
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