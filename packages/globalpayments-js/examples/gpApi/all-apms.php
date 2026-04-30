<?php

// Installments
$appId = 'hkjrcsGDhWiDt8GEhoDMKy3pzFz5R0Bo';
$appKey = 'cQOKHoAAvNIcEN8s';

// DCC
// $appId = '4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs';
// $appKey = 'FQyJA5VuEQfcji2M';

$account = 'TRA_89e47e02d3954f4c9999006e23b22375';

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
    'permissions' => ['PMT_POST_Create_Single', 'INS_POST_Query','CCS_POST_DCC']
]);

$headers = [ 'X-GP-Version' => '2021-03-22' ];

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

<!-- <script src="https://js-cert.globalpay.com/<?= $version ?>/globalpayments.js"></script> -->
<script src="../../dist/globalpayments.js"></script>
<script>
    GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "local",
        apiVersion: "2021-03-22",
        language: "en",
        account: "<?= $account ?>",
        //merchantId: "<?//= $merchant_id ?>//",
        apms: {
            currencyCode: "EUR",
            countryCode: "US",
            acquirer: "erste",
            allowedCardNetworks: [GlobalPayments.enums.CardNetwork.Visa, GlobalPayments.enums.CardNetwork.Mastercard, GlobalPayments.enums.CardNetwork.Amex, GlobalPayments.enums.CardNetwork.Discover],
            applePay: {
                applePayVersionNumber: 3,
                currencyCode: "USD",
                countryCode: "US",
                buttonStyle: "black",
                buttonType: "pay",
                merchantName: 'GP Store',
                merchantIdentifier: "merchant.com.gpapi.sandbox",
                merchantCapabilities: ['supports3DS'],
                merchantSessionUrl: "https://gptestcarts.swedencentral.cloudapp.azure.com/jslib/apple-pay/validate-merchant.php",
                globalPaymentsClientID: "gpapiqa1",
                validateMerchantHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'gp-authorization': 'as124sdas3cf5gd9*123'
                }
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
            qrCodePayments: {
                enabled: true,
                /*allowedPaymentMethods: [{
                    provider: GlobalPayments.enums.QRCodePaymentsProviderBrands.AlipayHK,
                    image: "https://hk1rbd-prod-bucket.s3.ap-northeast-1.amazonaws.com/apilogo/ALIPAY_HK.svg",
                },
                    {
                        provider: GlobalPayments.enums.QRCodePaymentsProviderBrands.Alipay,
                        image: "https://hk1rbd-prod-bucket.s3.ap-northeast-1.amazonaws.com/apilogo/Alipay.svg",
                    },
                ]*/

            },
            nonCardPayments: {
                allowedPaymentMethods: [{
                    provider: GlobalPayments.enums.ApmProviders.OpenBanking,
                    category: "TBD"
                },
                {
                    provider: GlobalPayments.enums.ApmProviders.Blik,
                    enabled:  false
                },
                {
                    provider: GlobalPayments.enums.ApmProviders.Affirm,
                    enabled:  false
                },
                {
                    provider: GlobalPayments.enums.ApmProviders.Klarna,
                    enabled:  false
                },
                {
                    provider: GlobalPayments.enums.ApmProviders.Sezzle,
                    enabled:  false
                },
                {
                    provider: GlobalPayments.enums.ApmProviders.Zip,
                    enabled:  false
                }
            ]
            }
        },
        fieldValidation: {
            enabled: true
        },
        currencyConversion: {
            enabled: true,
            accountName: "dcc",
            currency: "EUR",
            country: "GB",
        },
        // merchantId: "MER_20c2b3fcfedd484e9c3723347db56b71",
        installments: {
            program: GlobalPayments.enums.Program.LATAM,
            country: GlobalPayments.enums.EligibleCountries.MX,
            currency: GlobalPayments.enums.EligibleCurrencies,
            // accountName: "Portico_VISA_IPP_CNP_CERT" // CA,
            accountName: "GPECOM_Installments_Processing", // UK,
            // config:{
            //     funding_mode: GlobalPayments.enums.FundingMode.MERCHANT_FUNDED,
            //     max_time_unit_number: 32,
            //     max_amount: 10000
            // },
        }
    });

    GlobalPayments.on("error", error => {
        console.error(error);
    });
    const cardForm = GlobalPayments.creditCard.form('#credit-card-form', {
        amount: "60000",
        style: "gp-default",
        apms: [
            GlobalPayments.enums.Apm.ClickToPay,
            GlobalPayments.enums.Apm.GooglePay,
            GlobalPayments.enums.Apm.ApplePay,
            GlobalPayments.enums.Apm.QRCodePayments
        ],
        fields: {
            "submit": "Pay"
        }
    });

    cardForm.on(GlobalPayments.enums.ApmEvents.PaymentMethodSelection, paymentProviderData => {
        const {
            provider, 
            countryCode,
            currencyCode,
            bankName,
            acquirer,
            redirectUrl } = paymentProviderData;
        console.log('Selected provider: ' + provider);

        let detail = {};

        switch (provider) {
            case GlobalPayments.enums.ApmProviders.OpenBanking:
                if(!bankName){
                    detail = {
                    provider,
                    redirect_url: "https://fluentlenium.com/",
                    countryCode,
                    currencyCode,
                }
                }else {
                    detail = {
                    provider,
                    redirect_url: "https://google.com/",
                    bankName,
                    acquirer
                }
                }
                break;
            case GlobalPayments.enums.ApmProviders.Blik:
                detail = {
                    provider,
                    redirect_url: "https://www.blik.com/en",
                };
                break;
            case GlobalPayments.enums.ApmProviders.WeChat:
                detail = {
                    seconds_to_expire: "900",
                    next_action: "PRESENT_QR_CODE",
                    provider,
                    qr_code: "weixin://wxpay/bizpayurl?pr=0gWQb9Zzz",
                };
                break;
            case GlobalPayments.enums.ApmProviders.Affirm:
                detail = {
                    provider,
                    redirect_url: "https://www.affirm.com/",
                };
                break;
            case GlobalPayments.enums.ApmProviders.Klarna:
                detail = {
                    provider,
                    redirect_url: "https://www.klarna.com/",
                };
                break;
            case GlobalPayments.enums.ApmProviders.Sezzle:
                detail = {
                    provider,
                    redirect_url: "https://www.sezzle.com/",
                };
                break;
            case GlobalPayments.enums.ApmProviders.Zip:
                detail = {
                    provider,
                    redirect_url: "https://zip.co"
                };
                break;
            case GlobalPayments.enums.ApmProviders.ExpressPay: {
                    const merchantCustomEventProvideDetails = new CustomEvent(GlobalPayments.enums.ExpressPayEvents.ExpressPayActionDetail, {
                    detail : {
                        redirectUrl,
                        provider
                    }
                    });
                    window.dispatchEvent(merchantCustomEventProvideDetails);
                    return;
                }
            break;
            default:
                detail = {
                    seconds_to_expire: "900",
                    next_action: "REDIRECT_IN_FRAME",
                    provider,
                    redirect_url: "https://caniuse.com/",
                };
                break;
        }

        const merchantCustomEventProvideDetails = new CustomEvent(GlobalPayments.enums.ApmEvents.PaymentMethodActionDetail, {
            detail: detail
        });
        console.log(merchantCustomEventProvideDetails)
        window.dispatchEvent(merchantCustomEventProvideDetails);
    });
    cardForm?.on("token-success", resp => {
        console.log(resp);
    });
    cardForm?.on("token-error", resp => { console.log(resp); });
</script>
</body>
</html>


