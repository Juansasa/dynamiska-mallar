'use strict';

(function() {
    angular
        .module('data')
        .factory('mailService', mailService);

        /*@ngInject*/
        function mailService($http) {
        var service = {
            sendMail: send
        };
        return service;

        function send(payload) {
            var example = {
                            "email": [
                                {
                                    "fromAddress": "quavun@gmail.com",
                                    "toAddress": "nickiewooster@gmail.com",
                                    "subject": "My First WebAPI",
                                    "body": "Hohohohoho",
                                    "toAddressCC": "quang.vu@r2m.se",
                                    "toAddressBCC": "",
                                    "emailTemplate": "ErrorsTable",
                                    "locale": "fr-CA"
                                }
                            ]
                        }
            return $http.post('/api/users/sendmail', payload);
        }
    }
})();