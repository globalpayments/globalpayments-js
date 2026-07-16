<?php

// Installments
$appId = 'cXlj8KVAF1xlr8wYAhQDLgRpmdxEUwa2';
$appKey = 'GR7iVxV9N2ngvnIf';

/* Sandbox single MMA */
//$appId = 'gYLpOwjMRpfQSoMZAPdA4adwp0HbvK7u';
//$appKey = 'Mx66UqG2RQ16LhiT';
//$account = 'TRA_c7fdc03bc9354fd3b674dddb22583553';
//$merchant_id = 'MER_48054b882b1847c8a11214e3ad6b5f02';

// $appId = 'cXlj8KVAF1xlr8wYAhQDLgRpmdxEUwa2';
// $appKey = 'GR7iVxV9N2ngvnIf';
// $account = 'TRA_89e47e02d3954f4c9999006e23b22375';

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
    // 'permissions' => ['PMT_POST_Create_Single','INS_POST_Query','CCS_POST_DCC']
    'permissions' => ['CON_POST_Create']
]);

$headers = ['X-GP-Version' => '2021-03-22'];

[$response, ,] = $curl('https://apis.sandbox.globalpay.com', '/ucp/accesstoken', '', $headers, $request);

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
            env: "sandbox",
            apiVersion: "2021-03-22",
            language: "en",
            // language: "en",
            reference: "",
            //merchantId: "<?//= $merchant_id ?>//",
            apms: {
                currencyCode: "EUR",
                countryCode: "UK",
                acquirer: "erste",
                allowedCardNetworks: [GlobalPayments.enums.CardNetwork.Visa, GlobalPayments.enums.CardNetwork.Mastercard, GlobalPayments.enums.CardNetwork.Amex, GlobalPayments.enums.CardNetwork.Discover],
                applePay: {
                    applePayVersionNumber: 3,
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
                    wrapper: false
                },
                googlePay: {
                    merchantName: 'Merchant Name',
                    allowedAuthMethods: ["PAN_ONLY"],
                    allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"],
                    buttonColor: "blue",
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
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Affirm,
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Klarna,
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Sezzle,
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Zip,
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Konek,
                            enabled: true
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Cashpresso3Installments,
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.Cashpresso30Days,
                        },
                        {
                            provider: GlobalPayments.enums.ApmProviders.CashpressoInstallments,
                        }
                    ]
                },
                konek: {
                    "enabled": true,
                    "buttonLocale": GlobalPayments.enums.KonekLocal.en,
                    "buttonColor": GlobalPayments.enums.KonekButtonColor.BlackYellow,
                    "accountName": "transaction_processing",
                    "channel": "cnp",
                    "mcc": "5921",
                    "reference": "REF987655",
                    "requested_info": {
                        "payer": [
                            "NAME",
                            "EMAIL",
                            "MOBILE_PHONE",
                            "SHIPPING_ADDRESS"
                        ]
                    },
                    "addresses": [
                        {
                            "functions": [
                                "business"
                            ],
                            "reference": "Store_id123ydjiew111",
                            "buildingName": "Store_Acme Headquarters",
                            "line1": "24",
                            "line2": "210",
                            "line3": "MILL ROAD",
                            "city": "TIGNISH",
                            "state": "PE",
                            "postalCode": "C0B 2B0",
                            "country": "CA",
                            "poBoxNumber": "PO BOX 4001 STN A",
                            "contactPhone": {
                                "countryCode": "+1",
                                "subscriberNumber": "6474567890"
                            }
                        }
                    ],
                    "order": {
                        "reference": "ORD20251125",
                        "deliveryTimeframe": " express ",
                        "shippingType": "SINGLE",
                        "shippingCost": "0",
                        "amount": "700",
                        "currency": " CAD ",
                        "taxAmount": "0",
                        "itemAmount": "700",
                        "items": [
                            {
                                "label": "Wireless Headphones",
                                "reference": "ITEm123",
                                "type": " Top_up ",
                                "amount": "700",
                                "quantity": "1",
                                "description": "Noise-cancelling Bluetooth headphones",
                                "paymentType": "RECURRING",
                                "recurring": {
                                    "type": "SUBSCRIPTION",
                                    "amount_capped": "7000",
                                    "amount_variance": "10",
                                    "interval": "MONTH",
                                    "interval_count": 1,
                                    "day_of_month": 5,
                                    "day_of_week": "MON",
                                    "week_of_month": "FIRST",
                                    "start_date": "2026-06-23T01:34:08Z",
                                    "end_date": "2026-09-03T13:34:08Z",
                                    "max_count": "6"
                                }
                            }
                        ]
                    },
                    "fees": [
                        {
                            "name": "Processing Fee ",
                            "amount": "0"
                        },
                        {
                            "name": "Service Fee",
                            "amount": "0"
                        }
                    ],
                    "paymentMethod": {
                        "digitalWallet": {
                            "provider": " Konek "
                        }
                    },
                    "supportedPaymentMethods": [
                        " mASTERCARD_CREDIT ",
                        " mASTERCARD_DEBIT ",
                        " vISA_CREDIT ",
                        " vISA_DEBIT ",
                        " aMEX_CREDIT ",
                        " BANK_TRANSFER_SAVINGs ",
                        " BANK_TRANSFER_CHECKINg ",
                        " BAnK_TRANSFER_LINE_OF_CREDIT "
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
                program: GlobalPayments.enums.Program.VIS,
                country: GlobalPayments.enums.EligibleCountries.UK,
                currency: GlobalPayments.enums.EligibleCurrencies.UK,
                // accountName: "Portico_VISA_IPP_CNP_CERT" // CA,
                accountName: "GPECOM_Installments_Processing", // UK,
                config:{
                    funding_mode: GlobalPayments.enums.FundingMode.MERCHANT_FUNDED,
                    max_time_unit_number: 32,
                    max_amount: 10000
                },
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
                GlobalPayments.enums.Apm.QRCodePayments,
                GlobalPayments.enums.Apm.Konek,
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
                    if (!bankName) {
                        detail = {
                            provider,
                            redirect_url: "https://fluentlenium.com/",
                            countryCode,
                            currencyCode,
                        }
                    } else {
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
                case GlobalPayments.enums.Apm.Cashpresso30Days:
                    detail = {
                        provider,
                        redirect_url: "https://my.cashpresso.com/",
                    };
                break;
                case GlobalPayments.enums.Apm.Cashpresso3Installments:
                    detail = {
                        provider,
                        redirect_url: "https://my.cashpresso.com/",
                    };
                break;
                case GlobalPayments.enums.Apm.CashpressoInstallments:
                    detail = {
                        provider,
                        redirect_url: "https://www.eu-startups.com/directory/cashpresso/",
                    };
                break;
                case GlobalPayments.enums.ApmProviders.ExpressPay: {
                    const merchantCustomEventProvideDetails = new CustomEvent(GlobalPayments.enums.ExpressPayEvents.ExpressPayActionDetail, {
                        detail: {
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