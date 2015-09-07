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
                if (form) {
                    emails.push({
                        "fromAddress": 'quavun@gmail.com', //orderer.email,
                        "toAddress": 'nickiewooster@gmail.com', //form.reciever,
                        "subject": key,
                        "body": $filter('jsonToHtml')(form),
                        "toAddressCC": "",//formPerson.email,
                        "toAddressBCC": "",
                        "emailTemplate": ""
                    });
                }
            });

            return $http.post('/api/ad/sendmail', {
                email: emails
            });
        }
    }
})();