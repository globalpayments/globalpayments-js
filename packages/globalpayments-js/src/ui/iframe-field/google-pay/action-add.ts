import {bus, options} from "../../../internal";
import getGateway from "../../../internal/lib/get-gateway";
import {IframeField, IUIFormField} from "../index";
import {IError} from "../../../internal/gateways";

export default function addGooglePay(iframeField: IframeField | undefined, field: IUIFormField) {
  const gateway = getGateway();
  if (!options.apms?.googlePay || gateway?.supports.apm?.googlePay === false) return;

  const missingConfig = [];

  const amount = field.amount;
  const allowedCardNetworks = options.apms?.googlePay?.allowedCardNetworks ? options.apms?.googlePay?.allowedCardNetworks : options.apms?.allowedCardNetworks;
  const allowedCardAuthMethods = options.apms?.googlePay?.allowedAuthMethods;
  const currencyCode = options.apms?.googlePay?.currencyCode ? options.apms?.googlePay?.currencyCode : options.apms?.currencyCode;

  if(!allowedCardNetworks || allowedCardNetworks.length === 0) {
    missingConfig.push('allowedCardNetworks');
  }
  if(!currencyCode) {
    missingConfig.push('currencyCode');
  }
  if(!amount) {
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

  addGooglePayCDN();

  function addGooglePayCDN() {
    const script = document.createElement("script");
    script.onload = onGooglePayLoaded;
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.async = true;
    document.body.appendChild(script);
  }

  type baseRequest = {
    [key: string]: any;
  };

  /**
   * Define the version of the Google Pay API referenced when creating your configuration
   */
  const baseRequest: baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
  };

  /**
   * Identify site's gateway merchant identifier
   *
   * The Google Pay API response will return an encrypted payment method capable
   * of being charged by a supported gateway after payer authorization
   *
   */
  const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      'gateway': "globalpayments",
      'gatewayMerchantId': options.apms?.googlePay?.globalPaymentsClientID
    }
  };

  /**
   * Describe your site's support for the CARD payment method and its required fields
   */
  const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks,
      billingAddressRequired: true,
      billingAddressParameters: {
        format: 'FULL',
        phoneNumberRequired: true
      }
    }
  };

  /**
   * Describe your site's support for the CARD payment method including optional fields
   */
  const cardPaymentMethod = Object.assign(
      {},
      baseCardPaymentMethod,
      {
        tokenizationSpecification
      }
  );

  /**
   * An initialized google.payments.api.PaymentsClient object or null if not yet set
   *
   */
  let paymentsClient: any = null;

  function getGoogleIsReadyToPayRequest() {
    return Object.assign(
        {},
        baseRequest,
        {
          allowedPaymentMethods: [baseCardPaymentMethod]
        }
    );
  }

  /**
   * Configure support for the Google Pay API
   * @returns {object} PaymentDataRequest fields
   */
  function getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
      merchantName: options.apms?.googlePay?.merchantName,
      merchantId: options.apms?.googlePay?.merchantId
    };
    paymentDataRequest.callbackIntents = ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"];
    paymentDataRequest.shippingAddressRequired = true;
    paymentDataRequest.shippingAddressParameters = getGoogleShippingAddressParameters();
    paymentDataRequest.emailRequired = true;
    return paymentDataRequest;
  }

  /**
   * Return an active PaymentsClient or initialize
   * @returns {google.payments.api.PaymentsClient} Google Pay API client
   */
  function getGooglePaymentsClient() {
    if ( paymentsClient === null ) {
      // @ts-ignore
      paymentsClient = new google.payments.api.PaymentsClient({
        environment: gateway && gateway.getEnv(options) === "production" ? 'PRODUCTION' : 'TEST',
        merchantInfo: {
          merchantName: options.apms?.googlePay?.merchantName,
          merchantId: options.apms?.googlePay?.merchantId
        },
        paymentDataCallbacks: {
          onPaymentAuthorized,
          onPaymentDataChanged
        }
      });
    }
    return paymentsClient;
  }

  function onPaymentAuthorized(paymentData: baseRequest) {
    return new Promise((resolve, reject) => {

      // handle the response
      processPayment(paymentData)
        .then(() => {
          resolve({transactionState: 'SUCCESS'});
        })
        .catch(() => {
          resolve({
            transactionState: 'ERROR',
            error: {
              intent: 'PAYMENT_AUTHORIZATION',
              message: 'Insufficient funds',
              reason: 'PAYMENT_DATA_INVALID'
            }
          });
        });

    });
  }

  /**
   * Process payment data returned by the Google Pay API
   * @param {object} paymentData response from Google Pay API after user approves payment
   */
  function processPayment(paymentData: baseRequest) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        sendTokenPayment(paymentData);
        resolve({});
      }, 3000);
    });
  }

  /**
   * Handles dynamic buy flow shipping address and shipping options callback intents.
   * @param {object} itermediatePaymentData response from Google Pay API a shipping address or shipping option is selected in the payment sheet.
   * @returns Promise<{object}> Promise of PaymentDataRequestUpdate object to update the payment sheet.
   */
  function onPaymentDataChanged(intermediatePaymentData: baseRequest) {
    return new Promise((resolve, reject) => {
      const shippingAddress = intermediatePaymentData.shippingAddress;
      const paymentDataRequestUpdate : baseRequest = {}

      if (intermediatePaymentData.callbackTrigger === "INITIALIZE" || intermediatePaymentData.callbackTrigger === "SHIPPING_ADDRESS") {
        if(shippingAddress.administrativeArea === "NJ") {
          paymentDataRequestUpdate.error = getGoogleUnserviceableAddressError();
        }
      }

      resolve(paymentDataRequestUpdate);
    });
  }

  /**
   * Provide Google Pay API with a payment data error.
   * @returns {object} payment data error, suitable for use as error property of PaymentDataRequestUpdate
   */
  function getGoogleUnserviceableAddressError() {
    return {
      reason: "SHIPPING_ADDRESS_UNSERVICEABLE",
      message: "Cannot ship to the selected address",
      intent: "SHIPPING_ADDRESS"
    };
  }

  /**
   * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
   * Display a Google Pay payment button after confirmation of the viewer's ability to pay.
   */
  function onGooglePayLoaded() {
    const googlePaymentsClient = getGooglePaymentsClient();
    googlePaymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
        .then((response: { result: any; }) => {
          if (response.result) {
            addGooglePayButton();
          }
        })
        .catch((err: any) => {
          const error: IError = {
            error: true,
            reasons: [{
              code: "ERROR",
              message: err,
            }],
          };
          return bus.emit('error', error);
        });
  }

  /**
   * Add a Google Pay purchase button alongside an existing checkout button
   */
  function addGooglePayButton() {
    const payments = getGooglePaymentsClient();
    const button = payments.createButton({
      onClick: onGooglePaymentButtonClicked,
      allowedPaymentMethods: [baseCardPaymentMethod],
      buttonColor: options.apms?.googlePay?.buttonColor ? options.apms?.googlePay?.buttonColor : 'black',
      buttonType: options.apms?.googlePay?.buttonType ? options.apms?.googlePay?.buttonType : 'pay',
      buttonLocale: options.apms?.googlePay?.buttonLocale,
      buttonSizeMode: options.apms?.googlePay?.buttonSizeMode ? options.apms?.googlePay?.buttonSizeMode : 'fill',
    });
    button.setAttribute('id', "googlePay");
    iframeField?.container?.append(button);
  }

  /**
   * Provide Google Pay API with shipping address parameters when using dynamic buy flow.
   * @returns {object} shipping address details, suitable for use as shippingAddressParameters property of PaymentDataRequest
   */
  function getGoogleShippingAddressParameters() {
    return {
      phoneNumberRequired: true
    };
  }

  /**
   * Provide Google Pay API with a payment amount, currency, and amount status
   * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
   */
  function getGoogleTransactionInfo() {
    return {
      countryCode: options.apms?.googlePay?.countryCode,
      currencyCode,
      totalPriceStatus: 'FINAL',
      totalPrice: amount,
    };
  }

  /**
   * Show Google Pay payment sheet when Google Pay payment button is clicked
   */
  function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    const payments: baseRequest = getGooglePaymentsClient();
    payments.loadPaymentData(paymentDataRequest);
  }

  function sendTokenPayment(paymentData: baseRequest) {
    const googleShippingAddress = getGooglePaymentAddress(paymentData.shippingAddress);
    const googleBillingAddress = getGooglePaymentAddress(paymentData.paymentMethodData.info.billingAddress);

    const response: any = {
      details: {
        apmProvider: "PAY_BY_GOOGLE",
      },
      paymentReference: paymentData.paymentMethodData.tokenizationData.token
    };

    if(googleShippingAddress !== '') {
      response.shippingAddress = googleShippingAddress;
    }

    if(googleBillingAddress !== '') {
      response.details.billingAddress = googleBillingAddress;
    }

    if(paymentData.email && paymentData.email !== '') {
      response.payerEmail = paymentData.email;
    }

    if(paymentData.shippingAddress?.phoneNumber && paymentData.shippingAddress?.phoneNumber !== '') {
      response.payerPhone = paymentData.shippingAddress.phoneNumber;
    }

    iframeField?.emit('token-success', response);
  }

  function getGooglePaymentAddress(paymentAddress: baseRequest) {
    if(paymentAddress) {
      const shippingAddressLine = [paymentAddress.address1, paymentAddress.address2, paymentAddress.address3];
      const paymentShippingAddress: any = {
        addressLine: shippingAddressLine.filter(str => str !== ''),
        administrativeArea: paymentAddress.administrativeArea,
        city: paymentAddress.locality,
        country: paymentAddress.countryCode,
        phone: paymentAddress.phoneNumber,
        postalCode: paymentAddress.postalCode,
        name: paymentAddress.name,
        sortingCode: paymentAddress.sortingCode
      }
      return paymentShippingAddress;
    } else return '';
  }
}