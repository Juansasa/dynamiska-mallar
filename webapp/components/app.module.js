(function() {
        'use strict';
        /**
         * app Module
         *
         * This is the entry point to the application
         */
        angular.module('previa.order', [
            'shared',

            'home',
            'bestallning',
            'newConsultantAccount',
            'mobileBroadband',
            'phoneEquipment',
            'subscription',
            'employeeNewAccount',
            'computerEquipments',
            'careTalk',
            'modifyAccount',
            'changeEmploymentStatus',
            'removeAccount',
            'authentication'
        ]).config(function($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        }).factory('AuthInterceptor', interceptor);

        function interceptor($rootScope, $q) {
            return {
                responseError: function(response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        }
    }
})();