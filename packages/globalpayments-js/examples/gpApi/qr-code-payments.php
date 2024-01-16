<?php

// QA standalone merchant
//$appId = 'ib34ZA3X4R6Gg7ueRb1nJ9GiA9wSoUel';
//$appKey = 'wQLna0jYLB24meCz';
//$account = 'TRA_f7841da9308d4bd89ff51f8f4bf7de5f';

///* sandbox standalone merchant */
$appId = 'bvKLJsu6vYC9zxX2BpOgNK95kbboP3Uw';
$appKey = '7aH9QlA3yVFwpESQ';
$account = 'TRA_1366cd0db8c14fffb130ab49be84d944';
//
///* QA single MMA */
//$appId = 'nSEJ8Gx0DWdG6qSMzJV7Gd6FOp5QaZwI';
//$appKey = 'fFOgPSN3GCP7sLls';
//$account = 'TRA_f7841da9308d4bd89ff51f8f4bf7de5f';
//$merchant_id = 'MER_7a20bd695b6c4ca8b5cedb8300b40e66';

/* Sandbox single MMA */
//$appId = 'gYLpOwjMRpfQSoMZAPdA4adwp0HbvK7u';
//$appKey = 'Mx66UqG2RQ16LhiT';
//$account = 'TRA_c7fdc03bc9354fd3b674dddb22583553';
//$merchant_id = 'MER_48054b882b1847c8a11214e3ad6b5f02';

$nonce = date(DateTime::ISO8601);
$secret = hash('sha512', sprintf('%s%s', $nonce, $appKey));

$curl = include '../transit/curl.php';

$request = json_encode([
  'app_id' => $appId,
  'secret' => $secret,
  'grant_type' => 'client_credentials',
  'nonce' => $nonce,
  'interval_to_expire' => '1_HOUR',
//  'permissions' => ['PMT_POST_Create_Single', 'ACC_GET_Single']
]);

$headers = [ 'X-GP-Version' => '2021-03-22' ];

// NOTE: Temp change since the Sandbox endpoint is not working. Pointing to QA api
//[$response,,] = $curl('https://apis-qa.globalpay.com', '/ucp/accesstoken', '', $headers, $request);
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
            currencyCode: "USD",
            clickToPay: {
                buttonless: false,
                canadianDebit: true,
                cardForm: false,
                ctpClientId: "d83e8615-9d0a-46fe-9677-8040887e27fa",
                currencyCode: "EUR",
                wrapper: false
            },

            qrCodePayments: {
              enabled: true,
             /* this will manually configure what providers you want to enable for QR code payments*/
              // allowedPaymentMethods: [
              //   {
              //     provider: GlobalPayments.enums.QRCodePaymentsProviderBrands.AlipayHK,
              //     image: "https://hk1rbd-prod-bucket.s3.ap-northeast-1.amazonaws.com/apilogo/ALIPAY_HK.svg",
              //   },
              //   {
              //     provider: GlobalPayments.enums.QRCodePaymentsProviderBrands.Alipay,
              //     image: "https://hk1rbd-prod-bucket.s3.ap-northeast-1.amazonaws.com/apilogo/Alipay.svg",
              //   },
              //   {
              //     provider: GlobalPayments.enums.QRCodePaymentsProviderBrands.WeChat,
              //     image: "https://hk1rbd-prod-bucket.s3.ap-northeast-1.amazonaws.com/apilogo/WeChat_Pay.svg",
              //   },
              // ],
            },
        },
      });

      GlobalPayments.on("error", function (error) {
        console.error(error);
      });
      /*
      // APM form for CTP Standalone
      var apmForm = GlobalPayments.apm.form('#digital-wallet-form',
      { amount: "3.4",
        style: "gp-default",
        apms: [GlobalPayments.enums.Apm.ApplePay]
      });
      apmForm.setSubtotalAmount("4.57");
         apmForm.on("token-success", function (resp) { console.log(resp); });
         apmForm.on("token-error", function (resp) { console.log(resp); });
      */
      var cardForm = GlobalPayments.creditCard.form(
        '#credit-card-form',
        {
          amount: "800",
          style: "gp-default",
          apms: [
            GlobalPayments.enums.Apm.QRCodePayments,
          ],
        });
      cardForm.on("token-success", function (resp) { console.log(resp); });
      cardForm.on("token-error", function (resp) { console.log(resp); });

      cardForm.on(GlobalPayments.enums.QRCodePaymentsMerchantInteractionEvents.PaymentMethodSelection, function (qrCodePaymentProviderData) {
        const { provider } = qrCodePaymentProviderData;
        console.log('Selected provider: ' + provider);
        // Integration with the Merchant side:
        // By getting the provider selected, the Merchant will do the request to GP-API to initiate the QR code payment
        // Based on the response of that process, the merchant will emit an event to let the SDK know the APM info with the next ACTION to do

        // Merchant emits an event to communicate with the SDK lib the QR Code data details from the GP-API payment response
        // Using Mock a mock object based on the documentation
          let nextAction, fieldName, fieldValue;
          if (provider === GlobalPayments.enums.QRCodePaymentsProviderBrands.WeChat) {
              nextAction = "PRESENT_QR_CODE";
              fieldName = "qr_code";
              fieldValue = "weixin://wxpay/bizpayurl?pr=0gWQb9Zzz";
          } else {
              nextAction = "REDIRECT_IN_FRAME";
              fieldName = "redirect_url";
              fieldValue = "https://intlmapi.alipay.com/gateway.do?_input_charset=UTF-8&body=%5B%5D&currency=HKD&notify_url=https%3A%2F%2Fhkg-online-uat.everonet.com%2FpspNotify%2FALP1.0%2Fpayment%2FALP%2F2088021966388155%2F3ca995441e9643bb9a55b920b028a063&out_trade_no=TRN_RIEkYbVnoI420240111121832171&partner=2088021966388155&payment_inst=ALIPAYCN&product_code=NEW_WAP_OVERSEAS_SELLER&qr_pay_mode=4&qrcode_width=200&refer_url=https%3A%2F%2Fglobalpayment.com&return_url=https%3A%2F%2Fapis.sandbox.globalpay.com%2Fucp%2Fpostback%2Ftransactions%2FTRN_RIEkYbVnoI420240111121832171%2Freturn%2FeyJpZCI6IlRSTl9SSUVrWWJWbm9JNDIwMjQwMTExMTIxODMyMTcxIiwieGciOiIyMDIxLTAzLTIyIiwic3JjIjoiQ0lMIn0%3D&secondary_merchant_id=88016818600&secondary_merchant_industry=5499&secondary_merchant_name=GPHK+UCP-test&service=create_forex_trade&sign=38d9c88631aad3eb93ef86b20e5536a2&sign_type=MD5&subject=GPHK+UCP+Online-Test&total_fee=19.99&trade_information=%7B%22business_type%22%3A%225%22%2C%22other_business_type%22%3A%22Miscellaneous+food+shops+-+convenience+and+speciality+retail+outlets%22%7D";
          }
        const merchantCustomEventProvideDetails = new CustomEvent(GlobalPayments.enums.QRCodePaymentsMerchantInteractionEvents.ProvideQRCodeDetailsMerchantEvent, {
          detail: {
            "seconds_to_expire": "900",
            "next_action": nextAction,
            "provider": provider,
            [fieldName] : fieldValue,
          }
        });
        window.dispatchEvent(merchantCustomEventProvideDetails);
      });
    </script>
  </body>
</html>
