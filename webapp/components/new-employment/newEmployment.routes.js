(function() {
    'use strict';

    angular.module('newEmployment')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var stateName = gettext('newEmployment');
        var stateConfig = {
            url: '/new',
            templateUrl: 'components/new-employment/newEmployment.html',
            title: gettext('New employment'),
            controller: 'NewEmploymentController',
            controllerAs: 'vm'
        };

        routeHelper.registerState(stateName, stateConfig);
    }
    setUpRoutes.$inject = ['routeHelper', 'gettext'];
})();