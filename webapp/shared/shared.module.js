(function() {
    'use strict';
    /**
     * Shared Module
     *
     * This module include all common utilities modules used accross the app.
     */
    angular.module('shared', [
        'gettext',
        //'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngResource',
        'ui.bootstrap',
        'ui.bootstrap.fontawesome',
        'angularSpinner',
        'formly',
        'formlyBootstrap',
        'ui.select',
        'uz.mailto',

        'exception',
        'router',
        'data',
        'forms'
    ]).run(initStart);

    /*@ngInject*/
    function initStart($rootScope, gettextCatalog, adService, $state) {
        gettextCatalog.currentLanguage = 'sv';
        //gettextCatalog.debug = true;

        $rootScope.$on('$stateChangeStart', function(event, next) {

            if(!adService.isAuthorized() && next.name !== 'authentication') {
                event.preventDefault();
                $state.go('authentication');
            }

            // If go to state previously skipped, reenable it
            if(next.skip) {
                next.skip = false;
            }
        });

        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
})();