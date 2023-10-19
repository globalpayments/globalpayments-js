<a href="https://github.com/globalpayments" target="_blank">
    <img src="https://developer.globalpay.com/static/media/logo.dab7811d.svg" alt="Global Payments logo" title="Global Payments" align="right" width="225" />
</a>

# Changelog

## Latest Version - v2.0.1 (19/10/2023)
- [Globalpayments-js][2.0.1] Fixed a bug where the tokenization process would not work with build-in validations when the card holder name was not present

---
## v2.0.0 (10/10/2023)
#### Enhancements:
- [Globalpayments-js][2.0.0] Add Card Holder Name & Card Brand Validation

---
## v1.0.20 (27/09/2023)
#### Enhancements:
- [Globalpayments-js][1.10.2] Add Hosted fields internationalization support
- [Globalpayments-js][1.10.2] Add Hosted fields built-in validations (not supported in IE)
- [Globalpayments-js][1.10.2] Upgrade GP-API version to 2021-03-22
- [Globalpayments-js][1.10.2] Add french characters as values in the Cardholder Name

---
## v1.0.11 (09/07/2023)
#### Enhancements:
- [Globalpayments-js][1.9.29] Pass the cardholder Name for the Google Pay and Apple Pay transactions

---
## v1.0.10 (08/01/2023)
#### Bug Fixes:
- [Globalpayments-js][1.9.28] Fixed accessibility issue for card number icon when using custom form

---
## v1.0.6 (07/13/2023)
#### Bug Fixes:
- [Globalpayments-js][1.9.25] Fixed autofill expiry year to four digits instead of two in Safari
- [Globalpayments-js][1.9.25] Fixed Autocomplete hidden input fields visibility/detection for accessibility screen readers.

---
## v1.0.6 (06/27/2023)
#### Enhancements:
- [Globalpayments-3ds][1.8.7] Add the option to send request headers for the checkVersion and initiateAuthentication methods
- [Globalpayments-3ds][1.8.7] Allow cross-domain communication for the notification endpoints
- [Globalpayments-js][1.9.22] Add the option to send request headers for the merchantValidationURL on Apple Pay

#### Bug Fixes:
- [Globalpayments-js][1.9.22] Fixed gap between label and card number field (when using custom styles)
---
