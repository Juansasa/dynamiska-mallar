(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope) {

    	$scope.testFields = [{
    		key: 'test',
    		type: 'employeeSearch',
    		templateOptions: {
    			label: 'Personalsökning',
    			placeholder: 'Fyll i namn på personen du leta efter'
    		}
    	}];
    }
})();