(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryExistingEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto, $window, mailService) {
        if (!$scope.model.steps || !$scope.model.steps.existingEmployee) {
            $state.go('^');
        }

        init();

        $scope.isPrimitive = isPrimitive;
        $scope.isDate = isDate;
        $scope.extractValue = extractValue;
        $scope.isOrderDefined = isOrderDefined;
        $scope.getMailURL = getMailURL;

        $scope.$parent.isSummary = isSummary;
        $scope.$parent.sendMail = sendMail;
        $scope.$parent.removeForm = removeForm;

        function init() {
            if (!$scope.model.nuvarande) {
                return;
            }

            $scope.summary = {};
            _.each($scope.model.steps.existingEmployee, function(step) {
                if (!(step.name === 'Sök' || step.name === 'Sammanfattning')) {
                    $scope.summary[step.name] = step.model;
                }
            });
        }

        function sendMail() {
            mailService.sendMail($scope.summary, $scope.model.orderPerson, $scope.model.person);
        }

        function isSummary() {
            return $state.current.name === 'bestallning.ny.sammanfattning' || $state.current.name === 'bestallning.nuvarande.sammanfattning';
        }

        function removeForm(key) {
            $scope.summary[key] = null;
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