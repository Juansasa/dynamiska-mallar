(function() {
    'use strict';

    angular.module('bestallning')
        .filter('jsonToHtml', jsonHtml);

    function jsonHtml($filter) {
        return function(items) {
            return jsonToHtml(items, false);
        };

        function jsonToHtml(jsonData, noMargin) {
            var formattedHtml = noMargin ? '<ul style="list-style: none; margin: 0;">' : '<ul style="list-style: none; margin: 0 1em;">';
            _.forEach(jsonData, function(value, key) {
                if(key === '$$hashKey') {
                    return;
                }

                formattedHtml += '<li><b>' + _.capitalize(key) + '</b>';

                if (isPrimitive(value)) {
                    formattedHtml += ': ' + extractValue(value);
                } else {
                    formattedHtml += jsonToHtml(value, true);
                }

                formattedHtml += '</li>';
            });

            formattedHtml += '</ul>';

            return formattedHtml;
        }

        function extractValue(obj) {
            if (_.isNull(obj) || _.isUndefined(obj) || _.isObject(obj) && _.isEmpty(obj)) {
                return 'Uppgift saknas';
            }

            if (isPrimitive(obj)) {
                if (isDate(obj)) {
                    return $filter('date')(obj, 'yyyy-MM-dd');
                } else if(_.isBoolean(obj)) {
                    if(obj) {
                        return 'ja';
                    } else {
                        return 'nej';
                    }
                }
            }

            return obj;
        }

        function isPrimitive(obj) {
            return !obj || _.isEmpty(obj) || (_.isString(obj) || _.isNumber(obj) || _.isBoolean(obj) || isDate(obj));
        }

        function isDate(obj) {
            return _.isDate(obj);
        }
    }
})();