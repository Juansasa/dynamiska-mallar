(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig) {
        formlyConfig.setType([{
            name: 'titleRadio',
            extends: 'checkbox',
            templateUrl: 'shared/formService/titleRadio.html'
        }, {
            name: 'plainInput',
            template: '<input class="form-control" ng-model="model[options.key]">',
            wrapper: ['bootstrapHasError']
        }, {
            name: 'equipmentTable',
            templateUrl: 'shared/formService/equipmentTable.html'
        }, {
            name: 'plainRadio',
            extends: 'radio',
            wrapper: ['bootstrapHasError']
        }]);
    }
})();