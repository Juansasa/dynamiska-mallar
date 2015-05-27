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
        'wizard',
        'wizard-footer',
        'newEmployment',
        'existingEmployment',
        'newConsultantAccount',
        'mobileBroadband',
        'phoneEquipment',
        'subscription'
    ]);
})();