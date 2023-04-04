import {bus, options} from "../../internal";
import getGateway from "../../internal/lib/get-gateway";
import {IframeField, IUIFormField} from "../iframe-field";
import {IError, ISuccess} from "../../internal/gateways";

export default function addApplePay(iframeField: IframeField | undefined, field: IUIFormField) {
  const gateway = getGateway();
  if (!options.apms?.applePay || gateway?.supports.apm?.applePay === false) return;

  const missingConfig = [];

  const total = field.amount;
  const allowedCardNetworks = options.apms?.applePay?.allowedCardNetworks ? options.apms?.applePay?.allowedCardNetworks : options.apms?.allowedCardNetworks;
  const currencyCode = options.apms?.applePay?.currencyCode ? options.apms?.applePay?.currencyCode : options.apms?.currencyCode;

  if (!allowedCardNetworks || allowedCardNetworks.length === 0) {
    missingConfig.push('allowedCardNetworks');
  }
  if (!currencyCode) {
    missingConfig.push('currencyCode');
  }
  if (!total) {
    missingConfig.push('amount');
  }

  if (missingConfig.length) {
    const error: IError = {
      error: true,
      reasons: [{
        code: "ERROR",
        message: `Missing ${missingConfig.toString()}`,
      }],
    };
    return bus.emit('error', error);
  }

  addApplePayCDN();

  function addApplePayCDN() {
    const script = document.createElement("script");
    script.onload = onApplePayLoaded;
    script.src = "https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js";
    document.body.appendChild(script);
  }

  type baseRequest = {
    [key: string]: any;
  };

  function onApplePayLoaded() {
    // @ts-ignore
    if (window.ApplePaySession && ApplePaySession.supportsVersion(options.apms?.applePay?.applePayVersionNumber) && ApplePaySession.canMakePayments()) {
      addApplePayButton();
    }
  }

  function addApplePayButton() {
    const ctpElement = createApplePayElement();
    iframeField?.container?.appendChild(ctpElement);
  }

  function createHtmlElement(htmlElement: string, className?: string) {
    const htmlDivElement = document.createElement(htmlElement);
    if (className) {
      htmlDivElement.className = className;
    }

    return htmlDivElement;
  }

  function createApplePayElement() {
    const applePayBtn = createHtmlElement('apple-pay-button');
    applePayBtn.setAttribute('class', 'apple-pay-button');
    applePayBtn.setAttribute('buttonstyle', options.apms?.applePay?.buttonStyle ? options.apms?.applePay.buttonStyle : 'black');
    applePayBtn.setAttribute('type', options.apms?.applePay?.buttonType ? options.apms?.applePay.buttonType : 'pay');
    applePayBtn.setAttribute('locale', options.apms?.applePay?.buttonLocale ? options.apms?.applePay?.buttonLocale : 'en-US');
    applePayBtn.addEventListener('click', () => {
      onApplePayButtonClicked();
    });
    return applePayBtn;
  }


  /**
   * Apple Pay Logic
   * Our entry point for Apple Pay interactions.
   * Triggered when the Apple Pay button is pressed
   */
  // session is an instance of the Session object, which is the main entry point for the SDK
  function onApplePayButtonClicked() {
    // Initialise the Apple Pay Payment Request
    const applePayPaymentRequest = {
      countryCode: options.apms?.applePay?.countryCode,
      currencyCode: options.apms?.applePay?.currencyCode,
      merchantCapabilities: options.apms?.applePay?.merchantCapabilities,
      requiredBillingContactFields: ['postalAddress', 'name', 'phone', 'email'],
      requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
      supportedNetworks: allowedCardNetworks,
      total: {
        label: options.apms?.applePay?.merchantName,
        amount: total,
        type: 'final'
      }
    };

    // @ts-ignore
    const applePaySession = new ApplePaySession(options.apms?.applePay?.applePayVersionNumber, applePayPaymentRequest);

    handleApplePayEvents(applePaySession);
    // Start Apple Pay
    applePaySession.begin();
  }

  /**
   * Get the Apple Payment Address from AddressLine payment data
   *
   * @param {object} Apple Payment Address
   *
   */
  function getApplePaymentAddress(paymentAddress: baseRequest) {
    if (paymentAddress) {
      const shippingAddressLine = paymentAddress.addressLines;
      const paymentShippingAddress: any = {
        addressLine: shippingAddressLine.filter((str: string) => str !== ''),
        city: paymentAddress.locality,
        country: paymentAddress.countryCode,
        phone: paymentAddress.phoneNumber,
        postalCode: paymentAddress.postalCode,
      }
      return paymentShippingAddress;
    } else return '';
  }

  /**
   * Handle the Apple Pay events. Here you are able to populate your shipping methods, react to  shipping methods
   * changes, and many other interaction that the user has with the Apple Pay pup-up.
   *
   * @param {object} Apple Pay Session (the one generate on the button click)
   *
   */
  function handleApplePayEvents(applePaySession: any) {
    if (applePaySession) {

      // This is the first event that Apple triggers.
      // Here you need to validate the Apple Pay Session from your Back-End
      applePaySession.onvalidatemerchant = (event: any) => {
        const merchantSessionUrl = 'https://gptestcarts.swedencentral.cloudapp.azure.com/jslib/apple-pay/validate-merchant.php';
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };
        const body = {
          initiative_context: window.location.hostname,
          merchantIdentifier: options.apms?.applePay?.merchantIdentifier,
          merchantName: options.apms?.applePay?.merchantName,
          validation_url: event.validationURL
        };

        try {
          fetch(merchantSessionUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
          }).then((response) => {
            return response.json();
          }).then((json) => {
            applePaySession.completeMerchantValidation(json)
          });
        } catch (err) {
          const error: IError = {
            error: true,
            reasons: [{
              code: "ERROR",
              message: err,
            }],
          };
          return bus.emit('error', error);
        }
      }

      // This method is triggered when a user select one of the shipping options.
      // Here you generally want to keep track of the transaction amount
      applePaySession.onshippingmethodselected = (event: any) => {
        const update = {
          newTotal: {
            label: options.apms?.applePay?.merchantName,
            type: "final",
            amount: total
          }
        }
        // @ts-ignore
        applePaySession.completeShippingMethodSelection(update);
      };

      // This method is triggered before populating the shipping methods.
      // This is the perfect place inject your shipping methods
      applePaySession.onshippingcontactselected = (event: any) => {
        const update = {
          newTotal: {
            label: options.apms?.applePay?.merchantName,
            type: "final",
            amount: total
          }
        }
        // @ts-ignore
        applePaySession.completeShippingContactSelection(update);
      };

      // This method is triggered after the user has confirmed the transaction with the Touch ID or Face ID.
      // Besides getting all the details about the customer (email, address ...) you also get the Apple Pay payload
      // needed to perform a payment
      applePaySession.onpaymentauthorized = (event: any) => {
        try {
          const paymentData = event.payment;
          const paymentToken = JSON.stringify(paymentData.token.paymentData);
          const appleShippingAddress = getApplePaymentAddress(paymentData.shippingContact);
          const appleBillingAddress = getApplePaymentAddress(paymentData.billingContact);

          if (paymentToken) {
            const response: ISuccess = {
              details: {
                apmProvider: "apple-pay"
              },
              paymentReference: JSON.stringify(event.payment.token.paymentData)
            };

            if (appleShippingAddress !== '') {
              response.shippingAddress = appleShippingAddress;
            }

            if (appleBillingAddress !== '') {
              response.details.billingAddress = appleBillingAddress;
            }

            if (paymentData.shippingContact.emailAddress && paymentData.shippingContact.emailAddress !== '') {
              response.payerEmail = paymentData.shippingContact.emailAddress;
            }

            if (paymentData.shippingContact?.phoneNumber && paymentData.shippingContact?.phoneNumber !== '') {
              response.payerPhone = paymentData.shippingContact.phoneNumber;
            }

            iframeField?.emit('token-success', response);
            // @ts-ignore
            applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS);
          } else {
            const error: IError = {
              error: true,
              reasons: [{
                code: event.detail.code,
                message: event.detail.message,
              }],
            };
            iframeField?.emit('token-error', error);
            // @ts-ignore
            applePaySession.completePayment(ApplePaySession.STATUS_FAILURE);
          }
        } catch (err) {
          const error: IError = {
            error: true,
            reasons: [{
              code: "ERROR",
              message: err,
            }],
          };
          return bus.emit('error', error);
        }
      }
    }
  }
}