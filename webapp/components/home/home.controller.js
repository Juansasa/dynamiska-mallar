(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($rootScope, $location, $anchorScroll) {
        $rootScope.addAlert = function(alert) {
            if (!$rootScope.alerts) {
                $rootScope.alerts = [];
            }
            $rootScope.alerts.push(alert);
            $location.hash('wizard-control');
            $anchorScroll();
        };

        $rootScope.closeAlert = function(index) {
            $rootScope.alerts.splice(index, 1);
        };
    }
})();