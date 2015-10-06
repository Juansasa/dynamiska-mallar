(function() {
    'use strict';
    angular.module('authentication')
        .controller('AuthenticationController', authenticationCtrl);

    /*@ngInject*/
    function authenticationCtrl($rootScope, $scope, $location, $anchorScroll, adService, usSpinnerService, $state, AUTH_EVENTS) {
        adService.getManager().then(success, error);
        $scope.authMessage = 'Verifiera access...';

        // [{
        //     "name": {
        //         "firstname": "Helena",
        //         "lastname": "Thuresson"
        //     },
        //     "email": "Helena.Thuresson@previa.se",
        //     "telephones": {
        //         "mobile": "0703389067",
        //         "phone": "086274303"
        //     },
        //     "RE": "707 / Personal",
        //     "isManager": true,
        //     "username": "helthu"
        // }]

        function success(response) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            usSpinnerService.stop('auth-spinner');
            adService.loggedUser = _.first(response.data);
            $state.go('home');
        }

        function error(err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            usSpinnerService.stop('auth-spinner');
            $scope.authMessage = '';
            $rootScope.addAlert({
                type: 'danger',
                msg: 'Verifieringen av dina behörigheter misslyckades, var god och försök igen senare'
            });
        }

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