<?php

/* Sandbox */
$appId = 'gYLpOwjMRpfQSoMZAPdA4adwp0HbvK7u';
$appKey = 'Mx66UqG2RQ16LhiT';
$account = 'TRA_c7fdc03bc9354fd3b674dddb22583553';
$merchant_id = 'MER_48054b882b1847c8a11214e3ad6b5f02';

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

$has_error = property_exists($response, 'error_code') ? $response->error_code : NULL;
if (isset($has_error)) {
    var_dump($response);
    return;
}

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
        account: "<?= $account ?>",
        apms: {
            currencyCode: "GBP",
            countryCode: "GB",
            nonCardPayments: {
                allowedPaymentMethods: [{
                    provider: GlobalPayments.enums.ApmProviders.PayPal,
                }]
            }
        },
    });

    GlobalPayments.on("error", error => {
        console.error(error);
    });

    const cardForm = GlobalPayments.creditCard.form(
        '#credit-card-form',
        {
            amount: "800",
            style: "gp-default",
            apms: [ GlobalPayments.enums.Apm.PayPal ],
        }
    );
    cardForm.on("token-success", resp => {
        console.log(resp);
    });
    cardForm.on("token-error", resp => {
        console.log(resp);
    });

    cardForm.on(GlobalPayments.enums.ApmEvents.PaymentMethodSelection, paymentProviderData => {
        const { provider } = paymentProviderData;
        console.log('Selected provider: ' + provider);

        if (provider === GlobalPayments.enums.ApmProviders.PayPal) {
            const merchantCustomEventProvideDetails = new CustomEvent(GlobalPayments.enums.ApmEvents.PaymentMethodActionDetail, {
                detail: {
                    provider,
                    redirect_url: "https://fluentlenium.com/",
                }
            });
            window.dispatchEvent(merchantCustomEventProvideDetails);
        }
    });

</script>
</body>
</html>
