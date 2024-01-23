<?php

$appId = '56U06WT6UlHV7IZbO3nYrFbj4zAJCwqd';
$appKey = 'HfAzUbln57E8dsC8';

$version = '2021-03-22';
$url = 'apis.sandbox.globalpay.com';

$nonce = date(DateTime::ISO8601);
$secret = hash('sha512', sprintf('%s%s', $nonce, $appKey));

$curl = include 'transit/curl.php';

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

$headers = [ 'X-GP-Version' => $version ];
[$response,,] = $curl('https://'.$url, '/ucp/accesstoken', '', $headers, $request);
$response = json_decode($response);

$accessToken = $response->token ?? '';
$accountId = 'TRA_d8fb0de640294140947be603f700dc2e'; // $response->scope->accounts[0]->id;

?><!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>GP API - TSYS BNPL Installments</title>
  </head>
  <body>
    <main>
      <h1>Examples</h1>

      <h2>Credit Card Form</h2>
      <div id="digital-wallet-form"></div>
      <div id="credit-card-form"></div>
    </main>

    <script src="https://js-cert.globalpay.com/<?= $version ?>/globalpayments.js"></script>
    <script>
      GlobalPayments.configure({
        account: "<?= $accountId ?>",
        accessToken: "<?= $accessToken ?>",
        env: "sandbox",
        apiVersion: "<?= $version ?>",
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
            clickToPay: {
                buttonless: false,
                canadianDebit: true,
                cardForm: false,
                ctpClientId: "d83e8615-9d0a-46fe-9677-8040887e27fa",
                currencyCode: "EUR",
                wrapper: false
            },
        },
        installments: {
          country: "US",
          currency: "GBP",
        },
      });

      GlobalPayments.on("error", error => {
        console.error(error);
      });

      const cardForm = GlobalPayments.creditCard.form(
        '#credit-card-form',
        {
          amount: "30000",
          style: "gp-default",
          apms: [
            GlobalPayments.enums.Apm.ClickToPay,
            GlobalPayments.enums.Apm.GooglePay,
            GlobalPayments.enums.Apm.ApplePay,
          ],
        });
      cardForm.on("token-success", resp => { console.log(resp); });
      cardForm.on("token-error", resp => { console.log(resp); });
    </script>
  </body>
</html>
