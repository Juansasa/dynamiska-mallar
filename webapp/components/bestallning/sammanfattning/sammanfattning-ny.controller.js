(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryNewEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto, $window) {
        if (!$scope.model.steps || !$scope.model.steps.newEmployee) {
            $state.go('^');
        }

        $scope.isPrimitive = isPrimitive;
        $scope.isDate = isDate;
        $scope.extractValue = extractValue;
        $scope.isOrderDefined = isOrderDefined;
        $scope.getMailURL = getMailURL;
        $scope.getOrders = getOrders;

        function getOrders(model) {

            if (!model.ny) {
                return;
            }

            var summary = {};
            _.each($scope.model.steps.newEmployee, function(step){
                if(!(step.name === 'Sök' || step.name === 'Sammanfattning' || $state.get(step.route).skip)) {
                    summary[step.name] = step.model;
                }
            });

            return summary;
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
                subject: subject + '-' +new Date().getTime(),
                body: convertJsonToMailString(order)
            };

            $window.location.href = Mailto.url(recepient, options);
        }
    }
})();