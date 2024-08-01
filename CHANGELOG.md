<a href="https://github.com/globalpayments" target="_blank">
    <img src="https://developer.globalpay.com/static/media/logo.dab7811d.svg" alt="Global Payments logo" title="Global Payments" align="right" width="225" />
</a>

# Changelog

## Latest Version - v4.0.19 (08/01/24)
- [Globalpayments-js][4.0.19] Added "sortingCode" and "administrativeArea" fields to the shipping address in the Google Pay response
- [Globalpayments-js][4.0.19] Updated the translations for spanish

## v4.0.17 (07/30/24)
- [Globalpayments-js][4.0.17] Fixed issue with multiple @font-face declarations in custom fonts

## v4.0.16 (07/23/24)
- [Globalpayments-js][4.0.16] Allow a merchant/integrator to add a globalpay environment URL as the target for the environment.

## v4.0.15 (06/25/24)
- [Globalpayments-js][4.0.15] Simplify encoding by focusing on only those characters that are universally dangerous in HTML contexts (like <, >, &, ")

## v4.0.13 (06/18/24)
- [Globalpayments-js][4.0.13] Extends Hosted fields internationalization support
- [Globalpayments-js][4.0.13] Add additional header "X-GP-Library" for GP-API request
- [Globalpayments-js][4.0.13] Add PayPal support

## v4.0.11 (06/06/24)
- [Globalpayments-js][4.0.11] Fixed issue with card number to accept only numeric values and add the formatting with spaces

## v4.0.9 (05/30/24)
- [Globalpayments-js][4.0.9] Add Dynamic Currency Conversion support

## v3.0.12 (03/21/24)
- [Globalpayments-js][3.0.12] Fixed issue with QR codes and env variables

## v3.0.11 (03/12/24)
- [Globalpayments-js][3.0.11] Add custom validation messages for handling errors in GlobalPayments.ui.form validation
- [Globalpayments-js][3.0.11] Fixed issue with the Google Pay autofill Expiry Date
- [Globalpayments-js][3.0.11] Fixed issue with the CSS class name for Cardholder Name field validity
- [Globalpayments-js][3.0.11] Fixed issue with QR codes not being displayed on prod env

## v3.0.8 (02/22/24)
- [Globalpayments-js][3.0.8] Add an event to expose the validation status of the Cardholder Name field.

## v3.0.7 (02/15/24)
- [Globalpayments-js][3.0.7] Expose an event to determine if the form is valid when the "submit" button is clicked
- [Globalpayments-3ds][1.8.8] Fixed issue with z-index of the 3DS lightbox

## v3.0.6 (02/01/24)
- [Globalpayments-js][3.0.6] Fixed issues with the formatting of the Card Number field

## v3.0.3 (1/23/24)
- [Globalpayments-js][3.0.3] Add Open Banking support
- [Globalpayments-js][3.0.3] Add Hosted Fields French support

## v2.1.3 (1/16/24)
- [Globalpayments-js][2.1.3] Add QR Code Payments - Alipay and WeChat

## v2.0.1 (10/19/23)
- [Globalpayments-js][2.0.1] Fixed a bug where the tokenization process would not work with build-in validations when the card holder name was not present

---
## v2.0.0 (10/10/23)
#### Enhancements:
- [Globalpayments-js][2.0.0] Add Card Holder Name & Card Brand Validation

---
## v1.0.20 (09/27/23)
#### Enhancements:
- [Globalpayments-js][1.10.2] Add Hosted fields internationalization support
- [Globalpayments-js][1.10.2] Add Hosted fields built-in validations (not supported in IE)
- [Globalpayments-js][1.10.2] Upgrade GP-API version to 2021-03-22
- [Globalpayments-js][1.10.2] Add french characters as values in the Cardholder Name

---
## v1.0.11 (09/07/23)
#### Enhancements:
- [Globalpayments-js][1.9.29] Pass the cardholder Name for the Google Pay and Apple Pay transactions

---
## v1.0.10 (08/01/23)
#### Bug Fixes:
- [Globalpayments-js][1.9.28] Fixed accessibility issue for card number icon when using custom form

---
## v1.0.7 (07/13/23)
#### Bug Fixes:
- [Globalpayments-js][1.9.25] Fixed autofill expiry year to four digits instead of two in Safari
- [Globalpayments-js][1.9.25] Fixed Autocomplete hidden input fields visibility/detection for accessibility screen readers.

---
## v1.0.6 (06/27/23)
#### Enhancements:
- [Globalpayments-3ds][1.8.7] Add the option to send request headers for the checkVersion and initiateAuthentication methods
- [Globalpayments-3ds][1.8.7] Allow cross-domain communication for the notification endpoints
- [Globalpayments-js][1.9.22] Add the option to send request headers for the merchantValidationURL on Apple Pay

#### Bug Fixes:
- [Globalpayments-js][1.9.22] Fixed gap between label and card number field (when using custom styles)
---
