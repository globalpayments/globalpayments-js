<?php

$appId = '4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs';
$appKey = 'FQyJA5VuEQfcji2M';

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
  'permissions' => [ 'PMT_POST_Create_Single' ]
]);

$headers = [ 'X-GP-Version' => '2021-03-22' ];

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
      <div id="digital-wallet-form"></div>
      <div id="credit-card-form"></div>
    </main>

    <script src="https://js-cert.globalpay.com/<?= $version ?>/globalpayments.js"></script>
    <script>
      GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "sandbox",
        apiVersion: "2021-03-22",
        language: "en",
        fieldValidation: {
          enabled: true
        },
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
                currencyCode: "EUR",
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

      GlobalPayments.on("error", function (error) {
        console.error(error);
      });

      const cardForm = GlobalPayments.creditCard.form(
        '#credit-card-form',
        {
          amount: "30000",
          style: "gp-default",
          apms: [],
        });
      cardForm.on("token-success", resp => { console.log(resp); });
      cardForm.on("token-error", resp => { console.log(resp); });
      cardForm.on("card-form-validity", function (isValid) {
          console.log("The form is valid: ", isValid); // The form is valid: true | false
      });
    </script>
  </body>
</html>
