(function() {
    'use strict';

    angular.module('existingEmployment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = gettext('existingEmployment');
        var stateConfig = {
            url: '/existing',
            templateUrl: 'components/existing-employment/existingEmployment.html',
            title: gettext('Existing employment'),
            controller: 'ExistingEmploymentController',
            controllerAs: 'vm'
        };

        routeHelper.registerState(stateName, stateConfig);
    }
    setUpRoutes.$inject = ['routeHelper', 'gettext'];
})();