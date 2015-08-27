(function() {
    'use strict';

    angular.module('forms')
        .filter('propsFilter', function() {
            return function(items, props) {
                var keys = props.keys;
                var term = props.term;
                var options = {
                    keys: keys,
                    caseSensitive: false,
                    threshold: 0.4
                };

                var f = new Fuse(items, options);
                var result = f.search(term).slice(0, 10);

                return result;
            };
        });
})();