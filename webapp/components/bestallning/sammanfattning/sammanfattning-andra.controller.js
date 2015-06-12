(function() {
    'use strict';
    angular.module('bestallning')
        .controller('SummaryAndraEmployeeController', ctrl);

    /*@ngInject*/
    function ctrl($scope, $state, $filter, Mailto, $window) {
        if (!$scope.model.steps || !$scope.model.steps.modifyExistingEmployee) {
            $state.go('^');
        }

        $scope.isPrimitive = isPrimitive;
        $scope.isDate = isDate;
        $scope.extractValue = extractValue;
        $scope.isOrderDefined = isOrderDefined;
        $scope.getMailURL = getMailURL;
        $scope.getOrders = getOrders;

        function getOrders(model) {
            if(!model.andra) {
                return;
            }
            switch (model.person['Anställningstyp']) {
                case 'konsult':
                    return {
                        'Konto ändring': model.andra.konto && model.andra.konto.konsult,
                        'Mobilt bredband': model.andra.mobilbredband,
                        'Telefoni': model.andra.abonnemang,
                        'Avsluta konto': model.andra.avsluta,
                        //'Ändra anställningsförhållande': model.andra.anstallningsforhallande.konsult
                    };
                case 'previa anställd':
                    return {
                        'Konto ändring': model.andra.konto && model.andra.konto['anställd'],
                        'Mobilt bredband': model.andra.mobilbredband,
                        'Telefoni': model.andra.abonnemang,
                        'Avsluta konto': model.andra.avsluta,
                        //'Ändra anställningsförhållande': model.andra ? model.andra.anstallningsforhallande.anstalld : null
                    };
                default:
                    break;
            }

            return [];
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