<?php

return function (
  $serviceUrl, 
  $endpoint, 
  $queryString, 
  $requestHeaders, 
  $data = null, 
  $verb = 'POST', 
  $contentType = 'application/json', 
  $timeout = 65000
) {
  $request = curl_init($serviceUrl . $endpoint . $queryString);
  $requestHeaders = array_merge($requestHeaders, [
      'Content-Type' => sprintf('%s', $contentType),
      'Content-Length' => $data === null ? 0 : strlen($data),
  ]);
  $headers = [];
  foreach ($requestHeaders as $key => $value) {
      $headers[] = $key . ': '. $value;
  }
  curl_setopt($request, CURLOPT_CONNECTTIMEOUT, $timeout);
  curl_setopt($request, CURLOPT_TIMEOUT, $timeout);
  curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false); //true,);
  curl_setopt($request, CURLOPT_SSL_VERIFYHOST, false); //2,);
  curl_setopt($request, CURLOPT_CUSTOMREQUEST, strtoupper($verb));
  curl_setopt($request, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
  curl_setopt($request, CURLOPT_POSTFIELDS, $data);
  curl_setopt($request, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($request, CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
  curl_setopt($request, CURLOPT_VERBOSE, false);
  curl_setopt($request, CURLOPT_ENCODING, '');
  
  $curlResponse = curl_exec($request);
  $curlInfo = curl_getinfo($request);
  $curlError = curl_errno($request);

  return [$curlResponse, $curlInfo, $curlError];
};
