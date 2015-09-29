'use strict';

(function() {
    angular
        .module('data')
        .factory('mailService', mailService);

    /*@ngInject*/
    function mailService($http, $filter) {
        var DMServiceDeskAndHK = [
            'ServiceDesk@previa.se',
            'Support.telecomputing.se@previa.se',
            'Support@previa.se',
            'DMHKKontohantering@previa.se',
            'DMHRKontohantering@previa.se'
        ];
        var DMITOrder = ['ITOrder@previa.se'];
        var DMTelefoni = ['telefoni@previa.se'];


        var formRecieversMap = {
            'Anställningsavtal - HR': DMServiceDeskAndHK,
            'Nytt konto': DMServiceDeskAndHK,
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
                if(!recievers || recievers.length < 1 || !formPerson.email || !orderer.email) {
                    throw new Error('En eller flera emailaddresser för mailutskick till <' + key +'> formulär saknas');
                }

                if (form) {
                    emails.push({
                        "fromAddress": orderer.email,
                        "toAddress": _.first(recievers),
                        "subject": key + ' beställning',
                        "body": $filter('jsonToHtml')(form),
                        "toAddressCC": _.without([formPerson.email, orderer.email], null),
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