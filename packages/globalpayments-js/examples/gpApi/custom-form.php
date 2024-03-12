<?php

$appId = 'q3HGIFtHPt6ivl7JXGNBsXLFpDdsFHoN';
$appKey = 'wJUd4vJQfN23sVxG';

$nonce = date(DateTime::ISO8601);
$secret = hash('sha512', sprintf('%s%s', $nonce, $appKey));

$curl = include '../transit/curl.php';

$version = file_get_contents('../../src/lib/version.ts');
preg_match('/export default "(.*?)";/', $version, $matches);
$version = $matches[1] ?? 'Unknown';

$request = json_encode([
    'app_id' => $appId,
    'secret' => $secret,
    'grant_type' => 'client_credentials',
    'nonce' => $nonce,
    'interval_to_expire' => '1_HOUR',
    'permissions' => ['PMT_POST_Create_Single']
]);

$headers = ['X-GP-Version' => '2021-03-22'];

[$response,,] = $curl('https://apis.sandbox.globalpay.com', '/ucp/accesstoken', '', $headers, $request);

$response = json_decode($response);

$accessToken = $response->token ?? '';

?><!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>GP API Examples</title>
</head>
<body>
<main title="GP API Examples">
    <h1>Examples</h1>

    <h2>Credit Card Form</h2>
    <form id="form">
        <label>Credit Card Number</label>
        <div id="cardNumber"></div>
        <label>Card CVV</label>
        <div id="cardCvv"></div>
        <label>Card Expiration</label>
        <div id="cardExpiration"></div>
        <label>Card Holder</label>
        <div id="cardHolder"></div>
        <div id="cardSubmit"></div>
    </form>
</main>

<script src="https://js-cert.globalpay.com/<?= $version ?>/globalpayments.js"></script>
<script>

    GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "sandbox",
        apiVersion: "2021-03-22",
        fieldValidation: {
            enabled: true
        },
        language: "en",
        apms: {
            currencyCode: "USD",
            allowedCardNetworks: [
                GlobalPayments.enums.CardNetwork.Visa,
                GlobalPayments.enums.CardNetwork.Mastercard,
                GlobalPayments.enums.CardNetwork.Amex,
                GlobalPayments.enums.CardNetwork.Discover
            ],
            applePay: {
                applePayVersionNumber: 3,
                currencyCode: "USD",
                countryCode: "US",
                merchantName: 'GP Store',
                merchantIdentifier: "merchant.com.gpapi.sandbox",
                merchantCapabilities: ['supports3DS'],
                merchantSessionUrl: "https://gptestcarts.swedencentral.cloudapp.azure.com/jslib/apple-pay/validate-merchant.php",
                globalPaymentsClientID: "gpapiqa1"
            },
            clickToPay: {
                buttonless: false,
                canadianDebit: true,
                cardForm: false,
                ctpClientId: "d83e8615-9d0a-46fe-9677-8040887e27fa",
                currencyCode: "EUR",
                wrapper: false
            },
            googlePay: {
                currencyCode: "USD",
                countryCode: "US",
                merchantName: 'Merchant Name',
                allowedAuthMethods: ["PAN_ONLY"],
                allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"],
                buttonColor: "black",
                buttonType: "pay",
                merchantID: "12345678901234567890",
                globalPaymentsClientID: "gpapiqa1"
            },
        },
    });

    const imageBase = "https://js-cert.globalpay.com/<?= $version ?>/images/";
    const cardForm = GlobalPayments.ui.form({
        fields: {
            "card-number": {
                placeholder: "•••• •••• •••• ••••",
                target: "#cardNumber",
                validationMessages: {
                    Required: 'Se requiere un número de tarjeta',
                    CharactersLessThan12: 'El Número de Tarjeta debe tener al menos 12 dígitos',
                    NumberIsNotValid: 'El Número de Tarjeta no es válido',
                    NotAllowedCardType: 'No se puede procesar este tipo de tarjeta, utilice otra tarjeta'
                }
            },
            "card-expiration": {
                placeholder: "MM / YYYY",
                target: "#cardExpiration",
                validationMessages: {
                    NotCompleted: 'Por favor ingrese un mes/año válido',
                    ExpiryDateNotValid: 'La fecha de vencimiento no es válida',
                }
            },
            "card-cvv": {
                placeholder: "•••",
                target: "#cardCvv"
            },
            "card-holder-name": {
                placeholder: "Jane Smith",
                target: "#cardHolder"
            },
            "submit": {
                value: "Submit",
                target: "#cardSubmit"
            }
        },
        styles: {
            'html': {
                'font-size': '62.5%'
            },
            'body': {
                'font-size': '1.4rem'
            },
            '#secure-payment-field-wrapper': {
                'postition': 'relative'
            },
            '#secure-payment-field': {
                '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                'background-color': '#fff',
                'border': '1px solid #cecece',
                'border-radius': '2px',
                'box-shadow': 'none',
                'box-sizing': 'border-box',
                'display': 'block',
                'font-family': '"Roboto", sans-serif',
                'font-size': '11px',
                'font-smoothing': 'antialiased',
                'height': '35px',
                'margin': '5px 0 10px 0',
                'max-width': '100%',
                'outline': '0',
                'padding': '0 10px',
                'transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                'vertical-align': 'baseline',
                'width': '100%'
            },
            '#secure-payment-field:focus': {
                'border': '1px solid lightblue',
                'box-shadow': '0 1px 3px 0 #cecece',
                'outline': 'none'
            },
            '#secure-payment-field[type=button]': {
                'box-sizing': 'border-box',
                'text-align': 'center',
                'text-transform': 'none',
                'white-space': 'nowrap',
                'background-image': 'none',
                'background': '#1979c3',
                'border': '1px solid #1979c3',
                'color': '#ffffff',
                'cursor': 'pointer',
                'display': 'inline-block',
                'font-family': '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                'font-weight': '500',
                'padding': '14px 17px',
                'font-size': '1.8rem',
                'line-height': '2.2rem',
                'vertical-align': 'middle',
                'margin': '0',
                'height': 'initial',
                'width': 'initial',
                'flex': 'initial',
            },
            '#secure-payment-field[type=button]:focus': {
                'outline': 'none',
                'box-shadow': 'none',
                'background': '#006bb4',
                'border': '1px solid #006bb4',
                'color': '#ffffff'
            },
            '#secure-payment-field[type=button]:hover': {
                'background': '#006bb4',
                'border': '1px solid #006bb4',
                'color': '#ffffff'
            },
            '.card-cvv': {
                'background': 'transparent url(' + imageBase + '/cvv.png) no-repeat right',
                'background-size': '60px'
            },
            '.card-cvv.card-type-amex': {
                'background': 'transparent url(' + imageBase + '/cvv-amex.png) no-repeat right',
                'background-size': '60px'
            },
            '.card-number': {
                'background': 'transparent url(' + imageBase + '/logo-unknown@2x.png) no-repeat right',
                'background-size': '52px'
            },
            '.card-number.invalid.card-type-amex': {
                'background': 'transparent url(' + imageBase + '/amex-invalid.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '38px'
            },
            '.card-number.invalid.card-type-discover': {
                'background': 'transparent url(' + imageBase + '/discover-invalid.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '60px'
            },
            '.card-number.invalid.card-type-jcb': {
                'background': 'transparent url(' + imageBase + '/jcb-invalid.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '38px'
            },
            '.card-number.invalid.card-type-mastercard': {
                'background': 'transparent url(' + imageBase + '/mastercard-invalid.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '40px'
            },
            '.card-number.invalid.card-type-visa': {
                'background': 'transparent url(' + imageBase + '/visa-invalid.svg) no-repeat center',
                'background-position-x': '98%',
                'background-size': '50px'
            },
            '.card-number.invalid.card-type-diners': {
                'background': 'transparent url(' + imageBase + '/diners-invalid.svg) no-repeat center',
                'background-position-x': '98%',
                'background-size': '50px'
            },
            '.card-number.valid.card-type-amex': {
                'background': 'transparent url(' + imageBase + '/amex.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '38px'
            },
            '.card-number.valid.card-type-discover': {
                'background': 'transparent url(' + imageBase + '/discover.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '60px'
            },
            '.card-number.valid.card-type-jcb': {
                'background': 'transparent url(' + imageBase + '/jcb.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '38px'
            },
            '.card-number.valid.card-type-mastercard': {
                'background': 'transparent url(' + imageBase + '/mastercard.svg) no-repeat center',
                'background-position-x': '98%',
                'background-size': '40px'
            },
            '.card-number.valid.card-type-visa': {
                'background': 'transparent url(' + imageBase + '/visa.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '50px'
            },
            '.card-number.valid.card-type-diners': {
                'background': 'transparent url(' + imageBase + '/diners.svg) no-repeat right center',
                'background-position-x': '98%',
                'background-size': '50px'
            },
            '.card-number::-ms-clear': {
                'display': 'none',
            },
            'input[placeholder]': {
                'letter-spacing': '.5px',
            }
        }
    });

    cardForm.on("card-number", "token-success", resp => {
        console.log(resp);
    });
    cardForm.on("card-number", "token-error", resp => {
        console.log(resp);
    });

</script>
</body>
</html>
