<?php

function asPaddedAtEndString($inString, $toLength, $padChar) {
  $padStr = "";
  if(empty($inString)) {
    return "";
  }
  if ($toLength === strlen($inString)) {
    return $inString;
  }
  if ($toLength < strlen($inString)) {
    return substr($inString, 0, $toLength);
  }
  $padStr = str_repeat($padChar, $toLength - strlen($inString));
  return $inString . $padStr;
}

function asPaddedAtFrontString($inString, $toLength, $padChar) {
  $padStr = "";
  if(empty($inString)) {
    return "";
  }
  if ($toLength === strlen($inString)) {
    return $inString;
  }
  if ($toLength < strlen($inString)) {
    return substr($inString, 0, $toLength);
  }
  $padStr = str_repeat($padChar, $toLength - strlen($inString));
  return $padStr . $inString;
}

function getTransactionKey($merchantId, $userId, $password) {
  $curl = require('curl.php');
  $url = 'https://stagegw.transnox.com';
  $endpoint = '/servlets/TransNox_API_Server';

  $generateKeyRequest = json_encode(['GenerateKey' => [
    'mid' => $merchantId,
    'userID' => $userId,
    'password' => $password,
  ]]);

  $generateKeyResponse = json_decode(($curl($url, $endpoint, '', ['User-Agent' => 'infonox'], $generateKeyRequest))[0])->GenerateKeyResponse;

  // error_log('$generateKeyResponse:' . print_r($generateKeyResponse, true));
  return $generateKeyResponse->transactionKey;
}

function encryptManifest($merchantId, $deviceId, $amount, $transactionKey) {
  $sEncryptedData = "";
  $now = new \DateTime();
  $dateFormatString = $now->format('mdY');
  $plainText =
      asPaddedAtEndString($merchantId, 20 ,' ')
    . asPaddedAtEndString($deviceId, 24 ,' ')
    // . asPaddedAtFrontString($amount, 12 ,'0')
    . '000000000000'
    . asPaddedAtEndString($dateFormatString, 8, ' ');
  $tempTransactionKey = substr($transactionKey, 0, 16);
  $encrypted = openssl_encrypt($plainText, 'aes-128-cbc', $tempTransactionKey, OPENSSL_ZERO_PADDING, $tempTransactionKey);
  $sEncryptedData = bin2hex(base64_decode($encrypted));
  $hashKey = hash_hmac('md5', $transactionKey, $transactionKey);
  return substr($hashKey, 0, 4) . $sEncryptedData . substr($hashKey, -4, 4);
}

return function () {
  $merchantId = '887000003226';
  $userId = 'TA5622118';
  $password = 'f8mapGqWrE^rVaA9';
  $deviceId = '88700000322602';
  $amount = '0';

  $transactionKey = getTransactionKey($merchantId, $userId, $password);
  error_log('transactionKey: ' . $transactionKey);
  $manifest = encryptManifest($merchantId, $deviceId, $amount, $transactionKey);
  error_log('manifest: ' . $manifest);

  return $manifest;
};
