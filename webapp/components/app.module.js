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
        'modifyAccount'
    ]);
})();