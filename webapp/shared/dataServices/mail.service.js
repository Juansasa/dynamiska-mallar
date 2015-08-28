'use strict';

(function() {
    angular
        .module('data')
        .factory('mailService', mailService);

    /*@ngInject*/
    function mailService($http, $filter) {
        var service = {
            sendMail: send
        };
        return service;

        function send(payload, orderer, formPerson) {
            var emails = [];
            _.forEach(payload, function(form, key) {
                emails.push({
                    "fromAddress": orderer.email,
                    "toAddress": form.reciever,
                    "subject": key,
                    "body": $filter('json')(form),
                    "toAddressCC": formPerson.email,
                    "toAddressBCC": "",
                    "emailTemplate": ""
                });
            });

            console.log(emails);
            
            //return $http.post('/api/ad/sendmail', emails);
        }
    }
})();