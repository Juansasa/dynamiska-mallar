'use strict';

(function() {
    angular
        .module('data')
        .factory('mailService', mailService);

    /*@ngInject*/
    function mailService($http, $filter) {
        var DMServiceDeskAndHK = [
            'quavun@gmail.com',
            'nickiewooster@gmail.com',

            // 'ServiceDesk@previa.se',
            // 'Support.telecomputing.se@previa.se',
            // 'Support@previa.se',
            // 'DMHKKontohantering@previa.se',
            // 'DMHRKontohantering@previa.se'
        ];
        var DMITOrder = [
            'nickiewooster@gmail.com',
            // 'ITOrder@previa.se'
        ];
        var DMTelefoni = [
            'quavun@gmail.com',
            // 'telefoni@previa.se'
        ];


        var formRecieversMap = {
            'Ändra konto (Previa anställd)': DMServiceDeskAndHK,
            'Ändra konto (Konsult)': DMServiceDeskAndHK,
            'Anställningsavtal - HR': DMServiceDeskAndHK,
            'Nytt konto (Previa anställd)': DMServiceDeskAndHK,
            'Nytt konto (Konsult)': DMServiceDeskAndHK,
            'Datorutrustning': DMITOrder,
            'Mobilbredband': DMITOrder,
            'Telefoni': DMTelefoni,
            'Telefonutrustning': DMTelefoni,
            'Digital diktering': DMITOrder,
            'Avsluta konto': DMServiceDeskAndHK
        };

        var service = {
            sendMail: send
        };
        return service;

        function send(payload, orderer, formPerson) {
            var emails = [];
            _.forEach(payload, function(form, key) {
                var recievers = formRecieversMap[key];
                if(!recievers || recievers.length < 1 || !orderer.email) {
                    throw new Error('En eller flera emailaddresser för mailutskick till <' + key +'> formulär saknas');
                }

                if (form) {
                    emails.push({
                        "fromAddress": orderer.email,
                        "toAddress": _.first(recievers),
                        "subject": key + ' beställning',
                        "body": $filter('jsonToHtml')(form),
                        "toAddressCC": _.without([formPerson.email/*, orderer.email*/], null, undefined),
                        "toAddressBCC": _.rest(recievers)
                    });
                }
            });

            return $http.post('/api/ad/sendmail', {
                email: emails
            });
        }
    }
})();