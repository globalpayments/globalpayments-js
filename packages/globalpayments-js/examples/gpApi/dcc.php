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
    'permissions' => [ 'CCS_POST_DCC', 'PMT_POST_Create_Single' ]
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

<script src="../../dist/globalpayments.js"></script>
<script>
    const amount = "87.90";

    GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "local",
        apiVersion: "2021-03-22",
        currencyConversion: {
            enabled: true,
            accountName: "dcc",
            currency: "EUR",
            country: "GB",
        },
        fieldValidation: {
            enabled: true
        },
        orderInformation: {
            enabled: true,
            merchantName: "Test Merchant Name",
            orderTotalAmount: amount,
            orderReference: "XXXX12345",
            currencyCode: "USD",
        },
    });

    GlobalPayments.on("error", function (error) {
        console.error(error);
    });

    const cardForm = GlobalPayments.creditCard.form(
        '#credit-card-form',
        {
            amount,
            style: "gp-default",
            // style: GlobalPayments.enums.HostedFieldStyles.Default,
            // style: GlobalPayments.enums.HostedFieldStyles.Simple,

            // style: GlobalPayments.enums.BrandThemes.BrandThemeBOIPA,
            // style: GlobalPayments.enums.BrandThemes.BrandThemeBOIPAUK,
            // style: GlobalPayments.enums.BrandThemes.BrandThemeCOMMERZBANK,
            // style: GlobalPayments.enums.BrandThemes.BrandThemeNBGPAY,
            // style: GlobalPayments.enums.BrandThemes.BrandThemeESERVICE,
            apms: [],
        });
    
    cardForm.on("token-success", resp => { console.log(resp); });
    cardForm.on("token-error", resp => { console.log(resp); });
</script>
</body>
</html>
