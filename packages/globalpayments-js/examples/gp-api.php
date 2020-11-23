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

error_log(print_r($response, true));

$accessToken = $response->token ?? '';

?><!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <title>GP API Examples</title>
  </head>
  <body>
    <h1>Examples</h1>

    <h2>Credit Card Form</h2>

    <form id="form" action="/charge" method="get">
      <div id="cardNumber"></div>
      <div id="cardCvv"></div>
      <div id="cardExpiration"></div>
      <div id="cardHolder"></div>
      <div id="cardSubmit"></div>
    </form>

    <h2>PaymentRequest API</h2>

    <div>
      <button type="button" id="paymentRequestPlainButton" style="display: none">Pay</button>
    </div>

    <script src="/dist/globalpayments.js"></script>
    <script>
      GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "qa",
      });

      GlobalPayments.on("error", function (error) {
        console.error(error);
      });

      var cardForm = GlobalPayments.ui.form({
        fields: {
          "card-number": {
            placeholder: "•••• •••• •••• ••••",
            target: "#cardNumber"
          },
          "card-expiration": {
            placeholder: "MM / YYYY",
            target: "#cardExpiration"
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
        }
      });

      cardForm.on("card-number", "token-success", function (resp) { console.log(resp); });
      cardForm.on("card-number", "token-error", function (resp) { console.log(resp); });

      var paymentRequestForm = GlobalPayments.paymentRequest.setup("#paymentRequestPlainButton", {
        total: {
          label: "Total",
          amount: { value: 10, currency: "USD" }
        }
      });

      paymentRequestForm.on("token-success", function (resp) {
        console.log(resp);
        GlobalPayments.paymentRequest.complete("success");
      });
      paymentRequestForm.on("token-error", function (resp) { console.log(resp); });
      paymentRequestForm.on("error", function (resp) { console.log(resp); });
    </script>
  </body>
</html>
