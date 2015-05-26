(function() {
    'use strict';
    angular.module('newEmployment')
        .controller('NewEmploymentController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, forms) {
        // Make sure to only use one model for all states
        $scope.model = $scope.model || {};
        $scope.fields = forms.newPerson();

        $scope.steps = [{
            name: 'start',
            route: '.start'
        }, {
            name: 'New account',
            route: '.newConsultantAccount'
        }, {
            name: 'Summary',
            route: '.summary'
        }];

        $scope.onSubmit = function() {
            // $('header').hide();
            // $('.wizard').hide();
            // $('button').hide();

            // html2canvas($('body').first(), {
            //     onrendered: function(canvas) {
            //         window.location = canvas.toDataURL('image/png');
            //         $('header').show();
            //         $('.wizard').show();
            //         $('button').show();
            //     }
            // });
            console.log($scope.model);
        };
    }
})();