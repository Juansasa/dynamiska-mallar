(function() {
    'use strict';

    angular.module('modifyAccount')
        .run(setUpRoutes);

    /*@ngInject*/
    function setUpRoutes(routeHelper, gettext) {
        var state = [{
            stateName: 'bestallning.andra.konsult.forandring-konto',
            stateConfig: {
                url: '/forandring-konto',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.andra.konto.konsult" fields="fields"></form-form>',
                        title: gettext('Förändring konto'),
                        controller: 'ModifyConsultantAccountController'
                    }
                }
            }
        }, {
            stateName: 'bestallning.andra.anstalld.forandring-konto',
            stateConfig: {
                url: '/forandring-konto',
                views: {
                    'wizardContent@bestallning': {
                        template: '<formly-form model="model.andra.konto[\'anställd\']" fields="fields"></form-form>',
                        title: gettext('Förändring konto'),
                        controller: 'ModifyConsultantAccountController'
                    }
                }
            }
        }];

        routeHelper.registerStates(state);
    }
})();