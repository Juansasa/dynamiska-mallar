(function() {
    'use strict';
    angular.module('bestallning')
        .controller('BestallningController', ctrl);

    /*@ngInject*/
    function ctrl($scope) {
        modelReset();

        function modelReset() {
            $scope.currentStep = -1;
            $scope.fields = {};
            $scope.model = $scope.model || {
                person: null, // Personinformation
                orderPerson: {
                    namn: 'Bosse King',
                    email: 'Bosee.king@fortet.se'
                }, // Chef information
                steps: {
                    newEmployee: null,
                    modifyExistingEmployee: null
                }
            };
        }
    }
})();