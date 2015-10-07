'use strict';

(function() {
    angular
        .module('data')
        .factory('mailService', mailService);

    /*@ngInject*/
    function mailService($rootScope, $http, $filter, usSpinnerService) {
        var DMServiceDeskAndHK = [
            'ServiceDesk@previa.se',
            'Support.telecomputing.se@previa.se',
            'Support@previa.se',
            'DMHKKontohantering@previa.se',
            'DMHRKontohantering@previa.se'
        ];

        var DMITOrder = [
            'ITOrder@previa.se'
        ];
        var DMTelefoni = [
            'telefoni@previa.se'
        ];

        var HR = [
            'helena.thuresson@previa.se'
        ];


        var formRecieversMap = {
            'Ändra konto (Previa anställd)': DMServiceDeskAndHK,
            'Ändra konto (Konsult)': DMServiceDeskAndHK,
            'Anställningsavtal - HR': HR, // Bara till HR
            'Nytt konto (Previa anställd)': DMServiceDeskAndHK,
            'Nytt konto (Konsult)': DMServiceDeskAndHK,
            'Datorutrustning': DMITOrder,
            'Mobilbredband': DMITOrder,
            'Telefoni': DMTelefoni,
            'Telefonutrustning': DMTelefoni,
            'Digital diktering': DMITOrder,
            'Avsluta konto': _.union([DMServiceDeskAndHK, HR])
        };

        var service = {
            sendMail: send
        };
        return service;

        function send(payload, orderer, formPerson) {
            var emails = [];
            _.forEach(payload, function(form, key) {
                if (!form) {
                    return;
                }

                var recievers = formRecieversMap[key];
                if (!recievers || recievers.length < 1) {
                    $rootScope.addAlert({
                        type: 'danger',
                        msg: 'Mottagare email till formulär <' + key + '> saknas'
                    });

                    usSpinnerService.stop('sendmail-spinner');
                    throw new Error('En eller flera emailaddresser för mailutskick till <' + key + '> formulär saknas');
                } else if (!orderer.email) {
                    $rootScope.addAlert({
                        type: 'danger',
                        msg: 'Sändare email till formulär <' + key + '> saknas'
                    });

                    usSpinnerService.stop('sendmail-spinner');
                    throw new Error('En eller flera emailaddresser för mailutskick till <' + key + '> formulär saknas');
                }

                emails.push({
                    "fromAddress": orderer.email,
                    "toAddress": [orderer.email], //recievers,
                    "subject": key + ' beställning',
                    "body": $filter('jsonToHtml')(form),
                    "toAddressCC": null, //_.without([formPerson.email, orderer.email], null, undefined),
                    "toAddressBCC": null, // _.rest(recievers)
                });
            });

            return $http.post('/api/ad/sendmail', {
                email: emails
            });
        }
    }
})();