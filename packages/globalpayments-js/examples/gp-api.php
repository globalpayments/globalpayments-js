<?php

$appId = 'q3HGIFtHPt6ivl7JXGNBsXLFpDdsFHoN';
$appKey = 'wJUd4vJQfN23sVxG';

$nonce = date(DateTime::ISO8601);
$secret = hash('sha512', sprintf('%s%s', $nonce, $appKey));

$curl = include 'transit/curl.php';

$request = json_encode([
  'app_id' => $appId,
  'secret' => $secret,
  'grant_type' => 'client_credentials',
  'nonce' => $nonce,
  'interval_to_expire' => '1_HOUR',
  'permissions' => [ 'PMT_POST_Create_Single' ]
]);

$headers = [ 'X-GP-Version' => '2020-10-22' ];

[$response,,] = $curl('https://apis-qa.globalpay.com', '/ucp/accesstoken', '', $headers, $request);

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

    <script src="/dist/globalpayments.js"></script>
    <script>
      GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "local",
        apiVersion: "2021-03-22",
        apms: {
            currencyCode: "USD",
            allowedCardNetworks: [GlobalPayments.enums.CardNetwork.Visa, GlobalPayments.enums.CardNetwork.Mastercard, GlobalPayments.enums.CardNetwork.Amex, GlobalPayments.enums.CardNetwork.Discover],
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

      GlobalPayments.on("error", function (error) {
        console.error(error);
      });
      // APM form for CTP Standalone
      var apmForm = GlobalPayments.apm.form('#digital-wallet-form',
      { amount: "3.4",
        style: "gp-default",
        apms: [GlobalPayments.enums.Apm.ApplePay]
      });
      apmForm.setSubtotalAmount("4.57");
         apmForm.on("token-success", function (resp) { console.log(resp); });
         apmForm.on("token-error", function (resp) { console.log(resp); });

    </script>
  </body>
</html>
