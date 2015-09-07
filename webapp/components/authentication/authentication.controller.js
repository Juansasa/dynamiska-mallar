(function() {
    'use strict';
    angular.module('authentication')
        .controller('AuthenticationController', authenticationCtrl);

    /*@ngInject*/
    function authenticationCtrl($rootScope, $scope, adService, usSpinnerService, $state, AUTH_EVENTS) {
        //adService.getManager().then(success, error);
        success({
            data: {
                "name": {
                    "firstname": "Quang",
                    "lastname": "Vu"
                },
                "email": null,
                "telephones": {
                    "mobile": "0733709517",
                    "phone": null
                },
                "re": null,
                "isManager": true
            }
        });
        $scope.authMessage = 'Verifiera access...';


        function success(response) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            usSpinnerService.stop('auth-spinner');
            adService.loggedUser = response.data;
            $state.go('home');
        }

        function error(err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            usSpinnerService.stop('auth-spinner');
            $scope.authMessage = 'Du har inte behörighet att använda tjänsten, följande fel uppstod: ' + err;
        }
    }
})();