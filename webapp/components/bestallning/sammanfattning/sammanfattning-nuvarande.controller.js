(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryExistingEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto, $window) {
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
            if(!model.nuvarande) {
                return;
            }

            return {
                'Datorutrustning': model.nuvarande.datorutrustning,
                'Mobilt bredband': model.nuvarande.mobilbredband,
                'Telefonutrustning': model.nuvarande.telefonutrustning,
                'Telefoni': model.nuvarande.abonnemang,
                'Digital diktering': model.nuvarande.digitaldiktering,
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
                subject: subject + '-' + new Date().getTime(),
                body: convertJsonToMailString(order)
            };

            $window.location.href = Mailto.url(recepient, options);
        }
    }
})();