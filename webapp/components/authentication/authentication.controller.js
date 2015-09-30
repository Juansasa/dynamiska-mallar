(function() {
    'use strict';
    angular.module('authentication')
        .controller('AuthenticationController', authenticationCtrl);

    /*@ngInject*/
    function authenticationCtrl($rootScope, $scope, adService, usSpinnerService, $state, AUTH_EVENTS) {
        adService.getManager().then(success, error);
        $scope.authMessage = 'Verifiera access...';


        function success(response) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            usSpinnerService.stop('auth-spinner');
            adService.loggedUser = _.first(response.data);
            $state.go('home');
        }

        function error(err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            usSpinnerService.stop('auth-spinner');
            $scope.authMessage = 'Du har inte behörighet att använda tjänsten, följande fel uppstod: ' + err;
        }
    }
})();