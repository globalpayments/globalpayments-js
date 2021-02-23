<?php

$request = json_decode(file_get_contents('php://input'));

$globalpaymentsSharedSecret = 'secret';

$toHash = [
    isset($request->TIMESTAMP) ? $request->TIMESTAMP : '',
    isset($request->MERCHANT_ID) ? $request->MERCHANT_ID : '',
    isset($request->ORDER_ID) ? $request->ORDER_ID : '',
    '',
    isset($request->CURRENCY) ? $request->CURRENCY : '',
    isset($request->PAYER_REF) ? $request->PAYER_REF : '',
    isset($request->PMT_REF) ? $request->PMT_REF : '',
];

$request->SHA1HASH = sha1(sha1(implode('.', $toHash)) . '.' . $globalpaymentsSharedSecret);

echo json_encode($request);
