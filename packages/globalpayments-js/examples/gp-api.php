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
      <div id="credit-card-form"></div>
    </main>

    <script src="/dist/globalpayments.js"></script>
    <script>
      GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "qa",
      });

      GlobalPayments.on("error", function (error) {
        console.error(error);
      });

      var cardForm = GlobalPayments.creditCard.form('#credit-card-form', { style: "gp-default" });

      cardForm.on("token-success", function (resp) { console.log(resp); });
      cardForm.on("token-error", function (resp) { console.log(resp); });
    </script>
  </body>
</html>
