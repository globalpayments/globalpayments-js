<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$appId = 'q3HGIFtHPt6ivl7JXGNBsXLFpDdsFHoN';
$appKey = 'wJUd4vJQfN23sVxG';

$nonce = date(DateTime::ISO8601);
$secret = hash('sha512', sprintf('%s%s', $nonce, $appKey));

$curl = include '../transit/curl.php';

$request = json_encode([
    'app_id' => $appId,
    'secret' => $secret,
    'grant_type' => 'client_credentials',
    'nonce' => $nonce,
    'interval_to_expire' => '1_HOUR',
    'permissions' => [ 'PMT_POST_Create_Single' ]
]);

$headers = [ 'X-GP-Version' => '2021-03-22' ];

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


    <form id="payment-form" method="post" action="process.php">
        <div id="hfCardHolderName"></div>
        <div id="hfCardNumber"></div>
        <div id="hfCardCVV"></div>
        <div id="hfCardExpiry"></div>
        <div id="hfCardSubmit"></div>
    </form>


</main>

<script src="/dist/globalpayments.js"></script>
<script>
    GlobalPayments.configure({
        accessToken: "<?= $accessToken ?>",
        env: "local",
        apiVersion: "2021-03-22",
    });

    const cardForm = GlobalPayments.ui.form({
        fields: {
            "card-holder-name": {
                placeholder: "",
                title: "Name on card",
                target: "#hfCardHolderName"
            },
            "card-number": {
                placeholder: "Card number",
                title: "Card number",
                target: "#hfCardNumber"
            },
            "card-expiration": {
                placeholder: "",
                title: "Expiry date",
                target: "#hfCardExpiry"
            },
            "card-cvv": {
                placeholder: "",
                title: "CVV",
                target: "#hfCardCVV"
            },
            "submit": {
                value: "Next",
                target: "#hfCardSubmit",
                text: "Next"
            }
        },
        styles: {
            /*reset */
            " html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video": {"margin": "0", "padding": "0", "border": "0", "font-size": "100%", "font": "inherit"},
            /* cross-browser box-sizing */

            " *, *:before, *:after ": {"-moz-box-sizing": "border-box", "-webkit-box-sizing": "border-box", "box-sizing": "border-box"},
            /* frame doesn't inherit Roboto variants without explicit ref */

            "@font-face": {"font-family": "'Roboto'", "font-style": "normal", "font-weight": "500", "font-display": "swap", "src": "url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2')", "unicode-range": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"},
            " #secure-payment-field-body": {"font": "normal 16pt 'Roboto', Arial, Helvetica, sans-serif", "color": "#324458"},

            /* prevent stretch from flex */
            " #secure-payment-field-wrapper": {"display": "block !important"},

            /* equivalent to "textInputField form-control fieldSpacing (plus width and margin-left adjustment for focus outline, and max-width for large font control)" */
            " .card-holder-name, .card-number, .card-expiration, .card-cvv":
                {"display": "block", "font-weight": "400",

                    "transition": "none", "line-height": "normal",

                    "padding": "0.875rem", "color": "#324458", "background-color": "#ffffff",

                    "border": "1px solid #999999", "border-radius": "4px", "font-size": "1.125rem",

                    "-webkit-appearance": "none", "background-clip": "padding-box",

                    "width": "calc(100% - 6px) !important", "margin-top": "0.625rem !important",

                    "margin-left": "2px !important", "margin-bottom": "2px !important"},

            " @media(min-width:430px)": {".card-holder-name, .card-number": {"width": "20.5rem !important", "max-width": "calc(100% - 6px)"}},

            /* add focus to prevent browser defaults which can truncate in frame */
            " .card-holder-name:focus, .card-number:focus, .card-expiration:focus, .card-cvv:focus":
                {"outline-style": "none", "box-shadow": "none", "border-color": "#999999",

                    "box-shadow": "0 0 0 2px #10273A"},
            /* Note: need extra space below after 430x  to ensure diff json keys. */
            " @media(min-width:430px )": {".card-expiration, .card-cvv": {"width": "6.5rem !important"}},
            " .submit": {"cursor": "pointer", "margin": "0 !important",
                "font-family": "inherit", "line-height": "inherit",
                "text-transform": "none", "background": "#007AB4", "border": "2px solid #007AB4",
                "border-radius": "4px", "box-shadow": "2px 2px 4px rgb(0 0 0 / 15%)",
                "width": "calc(100% - 6px) !important", "padding": "1rem", "font-size": "1.125rem", "font-weight": "500",
                "color": "#fff", "-webkit-appearance": "none", "margin-top": "4rem !important", "margin-left": "2px !important",
                "margin-bottom": "2px !important"},

            /* Note: need double extra space below after 430px '  to ensure diff json keys. */
            " @media(min-width:430px  )": {".submit": {"width": "auto !important", "padding": "1rem 2rem"}},
            /* add focus to prevent browser defaults which can truncate in frame */
            " .submit:focus":

                {"outline-style": "none", "box-shadow": "none", "border-color": "#999999",
                    "box-shadow": "0 0 0 2px #10273A"}
        }
    });

    // cardForm.on("token-error", hfTokenErrors);
    // cardForm.on("token-success", hfTokenSuccess);


</script>
</body>
</html>
