import { addSandboxAlert } from "../internal/lib/add-sandbox-alert";
import getGateway from "../internal/lib/get-gateway";
import { INSTALLMENTS_KEY } from "../internal/lib/installments/contracts/constants";
import objectAssign from "../internal/lib/object-assign";
import { options } from "../internal";
import { addStylesheet, json2css } from "../internal/lib/styles";
import UIForm, { fieldStyles, IUIFormOptions, parentStyles } from "../ui/form";
import { addFooterIcons } from "../internal/lib/add-footer-icons";
import translations from "../internal/lib/translations/translations";
import { translateObj } from "../internal/lib/translate";
import { getCurrentLanguage } from "../internal/lib/detectLanguage";
import { createHtmlAnchorElement, createHtmlCheckboxElement, createHtmlDivElement, createHtmlElement, createHtmlImageElement, createHtmlSpanElement, createHtmlUlElement, createToolTip, HtmlAnchorTarget } from "../common/html-element";
import {DCC_KEY} from "../internal/lib/currency-conversion/contracts/constants";
import { isBrandTheme, isEserviceThemeApplied } from "../internal/lib/styles/themes/helpers";
import { addFooterBrandedIcons } from "../internal/lib/add-footer-branded-icons";
import addOrderInformation from "../ui/components/order-information/action-add-order-information";
import { isBlikAvailable, isExpressPayAvailable, isOpenBankingAvailable } from "../internal/built-in-validations/helpers";
import { Apm, ApmProviders, HostedFieldFooterLinks } from "../internal/lib/enums";
import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";
import getAssetBaseUrl from "../internal/gateways/gp-api/get-asset-base-url";
import { ExpressPayFieldNames } from "../common/enums";
import { HOSTED_FIELDS_SHIPPING_KEYS } from "../common/constants";

export const defaultOptions: IUIFormOptions = {
  labels: {
    "card-cvv": translations.en.labels['card-cvv'],
    "card-expiration": translations.en.labels['card-expiration'],
    "card-holder-name": translations.en.labels['card-holder-name'],
    "card-number": translations.en.labels['card-number'],
    "email-id": translations.en.labels['email-id'],
    "phone-number": translations.en.labels['phone-number'],
    "billing-address": translations.en.labels['billing-address'],
    "country":translations.en.labels.country,
    "billing-apt":translations.en.labels['billing-apt'],
    "billing-city":translations.en.labels['billing-city'],
    "billing-state":translations.en.labels['billing-state'],
    "billing-postal-code":translations.en.labels['billing-postal-code'],
    "country-code":translations.en.labels['phone-number'],
    "shipping-address":translations.en.labels['shipping-address'],
    "shipping-address-country":translations.en.labels.country,
    "shipping-name":translations.en.labels['shipping-name'],
    "shipping-apt":translations.en.labels['shipping-apt'],
    "shipping-city":translations.en.labels['shipping-city'],
    "shipping-state":translations.en.labels['shipping-state'],
    "shipping-postal-code":translations.en.labels['shipping-postal-code'],
    submit: translations.en.labels.submit,
  },
  placeholders: {
    "card-expiration": "MM / YYYY",
  },
  prefix: "credit-card-",
  style: "default",
  titles: {
    "card-cvv": "Card CVV Input",
    "card-expiration": "Card Expiration Input",
    "card-holder-name": "Card Holder Name Input",
    "card-number": "Card Number Input",
    "email-id":"Email Id Input",
    "phone-number":"Phone number Input",
    "billing-address": "Billing Address Input",
    "country-code":"Country Code Input",
    "billing-apt":"Billing Apt Input",
    "billing-city":"Billing City Input",
    "billing-state":"Billing State Input",
    "billing-postal-code":"Billing Postal Code Input",
    "country":"Country Input",
    "save-enable":"Save to Express Pay",
    "shipping-same-as-billing":"Shipping same as billing",
    "shipping-address":"Shipping Address Input",
    "shipping-address-country":"shipping-address-country",
    "shipping-name":"Shipping Name Input",
    "shipping-apt":"Shipping Apt Input",
    "shipping-city":"Shipping City Input",
    "shipping-state":"Shipping State Input",
    "shipping-postal-code":"Shipping Postal Code Input",
    submit: "Form Submit Button Input",
  },
  values: {
    "card-track": translations.en.values['card-track'],
    submit: translations.en.values.submit,
  },
};

/**
 * Allows integrators to create a standard drop-in form for
 * accepting credit card data.
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export function form(
  target: string | HTMLElement,
  formOptions: IUIFormOptions = {},
) {
  if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement;

    if (!el) {
      throw new Error("Credit card form target does not exist");
    }

    target = el;
  }

  target.className = target.className + " secure-payment-form";

  const gateway = getGateway();
  if (gateway && gateway.getEnv(options) !== "production") {
    addSandboxAlert(target);
  }

  formOptions = objectAssign(objectAssign({}, defaultOptions), formOptions);

  // create field targets
  let fieldTypes:string[] = [
    "card-number",
    "card-expiration",
    "card-cvv",
    "card-holder-name",
  ];

  const userDetailsFieldType:string[] = [
    ExpressPayFieldNames.EmailId,
    ExpressPayFieldNames.CountryCode,
    ExpressPayFieldNames.Phone
  ]

  const billingFieldTypes:string[] = [
    ExpressPayFieldNames.BillingAddress,
    ExpressPayFieldNames.Country,
    ExpressPayFieldNames.BillingApt,
    ExpressPayFieldNames.BillingCity,
    ExpressPayFieldNames.BillingState,
    ExpressPayFieldNames.BillingPostalCode,
  ];

  const shippingFieldTypes:string[] = [
    ExpressPayFieldNames.ShippingSameAsBilling,
    ExpressPayFieldNames.ShippingName,
    ExpressPayFieldNames.ShippingAddress,
    ExpressPayFieldNames.ShippingCountry,
    ExpressPayFieldNames.ShippingApt,
    ExpressPayFieldNames.ShippingCity,
    ExpressPayFieldNames.ShippingState,
    ExpressPayFieldNames.ShippingPostalCode,
  ]

  if (options.expressPay?.enabled) {
    if (!options.expressPay?.cancelUri || !options.expressPay?.paymentUri) {
      // tslint:disable-next-line:no-console
      console.error("Error in loading form : PaymentURI and/or cancelURI are mandatory, but missing in the request");
      return;
    }
    if (formOptions?.style !== "gp-default2") {
      // tslint:disable-next-line:no-console
      console.error("Error in loading form : Theme styling should be set to 'gp-default2' for Express Pay");
      return;
    }
    fieldTypes = [...userDetailsFieldType, ...fieldTypes, ...billingFieldTypes,...shippingFieldTypes];
    fieldTypes.push("save-enable");
  }

  fieldTypes.push("submit");

  // If Currency Conversion option is present, insert the field between cardholder and submit button
  if (options.currencyConversion?.enabled) fieldTypes.splice(fieldTypes.length - 1, 0, DCC_KEY);

  // If installments option is present insert the field between card holder and submit button
  if (options.installments) fieldTypes.splice(fieldTypes.length - 1, 0, INSTALLMENTS_KEY);

  const firstFieldCardForm = fieldTypes[0];

  if (formOptions.apms) {
    if (isExpressPayAvailable(options?.apms?.nonCardPayments)) {
      formOptions.apms.splice(1, 0, Apm.ExpressPay);
    }
    if (isBlikAvailable(options?.apms?.countryCode, options?.apms?.currencyCode, options?.apms?.nonCardPayments)) {
      formOptions.apms.push(Apm.Blik);
    }
    if (isOpenBankingAvailable(options?.apms?.countryCode, options?.apms?.acquirer)) {
      formOptions.apms.push(Apm.OpenBankingPayment);
    }
    fieldTypes = [...formOptions.apms.toString().split(','), ...fieldTypes]
  }

  const fields: any = {};

  if (options.language) {
    formOptions.labels = translateObj(options.language, formOptions.labels);
    formOptions.values = translateObj(options.language, formOptions.values);
  }

  // Order Information block
  if (options.orderInformation) {
    if ((options.orderInformation?.enabled) || ((options.orderInformation?.enabled === undefined) && (isEserviceThemeApplied(formOptions?.style)))) {
      addOrderInformation(target, {
        merchantName: options.orderInformation.merchantName,
        orderTotalAmount: `${options.orderInformation.orderTotalAmount || 0}`,
        orderReference: options.orderInformation.orderReference,
        currencyCode: options.orderInformation.currencyCode,
      });
    }
  }

  for (const i in fieldTypes) {
    if (!fieldTypes.hasOwnProperty(i)) {
      continue;
    }

    const type = fieldTypes[i];
    const wrapper = document.createElement("div");
    wrapper.className = formOptions.prefix + type;

    if (type === ExpressPayFieldNames.CountryCode) {
      const phoneNumberWrapper = document.createElement("div");
      phoneNumberWrapper.className = 'phone-number-wrapper';
      phoneNumberWrapper.id = 'phone-number-container';
      phoneNumberWrapper.appendChild(wrapper);
      target.appendChild(phoneNumberWrapper);
    } else if (type === ExpressPayFieldNames.BillingAddress) {
      const billingAddressWrapper = document.createElement("div");
      billingAddressWrapper.className = 'billing-address-wrapper';
      billingAddressWrapper.id = 'billing-address-wrapper';
      billingAddressWrapper.appendChild(wrapper);
      target.appendChild(billingAddressWrapper);
    } else if (type === ExpressPayFieldNames.ShippingName) {
      const shippingAddressWrapper = document.createElement("div");
      shippingAddressWrapper.className = 'shipping-address-wrapper';
      shippingAddressWrapper.id = 'shipping-address-wrapper';
      shippingAddressWrapper.style.display = "none";
      shippingAddressWrapper.appendChild(wrapper);
      target.appendChild(shippingAddressWrapper);

      const encryptedBadgeImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/Encrypted_Badge.svg`,
        alt: 'encrypted-badge',
        "className": "encrypted",
        "id": "encrypted"
      })

      encryptedBadgeImage.style.display = "none";

      target.appendChild(encryptedBadgeImage);
    }
    else {
      target.appendChild(wrapper);
    }

    if (type === ExpressPayFieldNames.BillingCity) {
      const billingLocationWrapper = createHtmlDivElement({
        "id": "billing-location-wrapper",
        "className": "billing-location-wrapper"
      });
      billingLocationWrapper.appendChild(wrapper);
      target.appendChild(billingLocationWrapper);
    } if (type === ExpressPayFieldNames.ShippingCity) {
      const shippingLocationWrapper = createHtmlDivElement({
        "id": "shipping-location-wrapper",
        "className": "shipping-location-wrapper"
      });
      const containerElement = document.getElementById('shipping-address-wrapper');
      shippingLocationWrapper.appendChild(wrapper);
      containerElement?.appendChild(shippingLocationWrapper);
    }

    if (type === ExpressPayFieldNames.Phone) {
      const containerElement = document.getElementById('phone-number-container');
      containerElement?.appendChild(wrapper);
    }
    if (type === ExpressPayFieldNames.Country) {
      const containerElement = document.getElementById('billing-address-wrapper');
      containerElement?.appendChild(wrapper);
    }
    if (type === ExpressPayFieldNames.BillingState || type === ExpressPayFieldNames.BillingPostalCode) {
      const containerElement = document.getElementById('billing-location-wrapper');
      containerElement?.appendChild(wrapper);
    }
    if (type === ExpressPayFieldNames.ShippingState || type === ExpressPayFieldNames.ShippingPostalCode) {
      const containerElement = document.getElementById('shipping-location-wrapper');
      containerElement?.appendChild(wrapper);
    }

    if (type === ExpressPayFieldNames.ShippingApt) {
      const containerElement = document.getElementById('shipping-address-wrapper');
      containerElement?.appendChild(wrapper);
    }

    if (type === ExpressPayFieldNames.ShippingAddress) {
      const shippingDetailsWrapper = document.createElement("div");
      shippingDetailsWrapper.className = 'shipping-details-wrapper';
      shippingDetailsWrapper.id = 'shipping-details-wrapper';
      const containerElement = document.getElementById('shipping-address-wrapper');
      shippingDetailsWrapper?.appendChild(wrapper);
      containerElement?.appendChild(shippingDetailsWrapper)
    }

    if (type === ExpressPayFieldNames.ShippingCountry) {
      const containerElement = document.getElementById('shipping-details-wrapper');
      containerElement?.appendChild(wrapper);
    }

    const lang = getCurrentLanguage();

    if (type === "save-enable") {
      const checkbox = createHtmlCheckboxElement({
        "checked": false,
        "className": "save-to-express-pay",
        "id": "save-card-checkbox",
        "name": "save-to-express-pay",
      });
      const checkBoxText = createHtmlSpanElement({
        "textContent": "Save card to Express Pay for faster checkouts "
      });
      const learnMoreLink = createHtmlAnchorElement({
        "href": HostedFieldFooterLinks.LearnMore,
        "textContent": "Learn More",
        "target": HtmlAnchorTarget.Blank,
        "className": "learn-more"
      });
      const footerText = document.createElement("p");
      footerText.className = "terms-and-conditions";
      footerText.innerHTML = `By continuing you agree to Global Payments Express Pay <a href=${HostedFieldFooterLinks.Terms} target='_blank'> Terms </a> and <a href=${HostedFieldFooterLinks.PrivacyPolicy} target='_blank'>Privacy Policy</a>. Cell phone data rates may apply.`
      wrapper.appendChild(checkbox);
      wrapper.appendChild(checkBoxText);
      wrapper.appendChild(learnMoreLink);
      wrapper.appendChild(footerText)
    }
    if (type === ExpressPayFieldNames.ShippingSameAsBilling) {
      localStorage.setItem("shippingSameAsBilling", "true");
      const checkbox = createHtmlCheckboxElement({
        "checked": true,
        "className": "shipping-as-billing",
        "id": "shipping-as-billing-checkbox",
        "name": "shipping-as-billing",
      });
      const checkBoxText = createHtmlSpanElement({
        "textContent": "Shipping same as Billing"
      });
      wrapper.appendChild(checkbox);
      wrapper.appendChild(checkBoxText);

      const encryptedBadgeImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/Encrypted_Badge.svg`,
        alt: 'encrypted-badge',
        "className": "encrypted-shipping",
        "id": "encrypted-shipping"
      })

      wrapper.appendChild(encryptedBadgeImage);
      checkbox.addEventListener('change', (event: any) => {
        const shippingWrapper: any = document.getElementById('shipping-address-wrapper');
        const encryptedText: any = document.getElementById('encrypted');
        const encryptedTextShipping: any = document.getElementById('encrypted-shipping');
        localStorage.setItem("shippingSameAsBilling", event?.target?.checked);
        if (!event?.target?.checked) {
          shippingWrapper.style.display = "block";
          encryptedText.style.display = "block";
          encryptedTextShipping.style.display = "none"
        } else {
          shippingWrapper.style.display = "none";
          encryptedText.style.display = "none";
          encryptedTextShipping.style.display = "block"
        }
      });
    }
    if (type !== "submit" && formOptions.labels && formOptions.labels[type]) {
      const labelEl = createHtmlDivElement({
        className: "label-div"
      });
      const label = document.createElement("label");
      label.appendChild(document.createTextNode(formOptions.labels[type]));
      const shippingTypes: string[] = HOSTED_FIELDS_SHIPPING_KEYS.map(x => x);
      const isShippingRequired: any = options.expressPay?.enabled && (options.expressPay?.isShippingRequired !== false);
      const span = document.createElement("span");
      span.textContent = " *"
      span.className = "required";
      if (((shippingTypes.indexOf(type) === -1) || (shippingTypes.indexOf(type) > -1 && isShippingRequired)) && type !== ExpressPayFieldNames.BillingApt && type !== ExpressPayFieldNames.ShippingApt) {
        label.appendChild(span);
      }
      labelEl.appendChild(label);
      if (type === "card-cvv" && formOptions.style === "gp-default2") {
        const tooltip = createToolTip({
          title: translations[lang].tooltip.title,
          htmlContent: translations[lang].tooltip.text,
          attributes: [{
            'aria-label': translations[lang].tooltip['aria-label']
          }]
        });
        labelEl.appendChild(tooltip);
      }
      wrapper.appendChild(labelEl);
    }

    const el = createHtmlDivElement({
      className: formOptions.prefix + type + "-target"
    });
    wrapper.appendChild(el);

    if (
      type === "card-cvv" &&
      formOptions.style &&
      formOptions.style !== "blank" && formOptions.style !== "gp-default2"
    ) {
      const tooltip = createToolTip({
        title: translations[lang].tooltip.title,
        htmlContent: translations[lang].tooltip.text,
        attributes: [{
          'aria-label': translations[lang].tooltip['aria-label']
        }]
      });
      el.append(tooltip);
    }

    const countryArray = CountryList.getAll();
    const countryDialCodes = countryArray.map(item => {
      const obj = {
        "code": item.code,
        "countryCode": item.countryCode,
        "countryName": item.name,
        "dial_code": item.dial_code,
        "flag": CountryFlagSvg[item.code]
      }
      return obj;
    });
    // // tslint:disable-next-line:no-console
    // console.log("countryDialCodes",countryDialCodes)
    if (type === ExpressPayFieldNames.CountryCode) {
      const ul = document.createElement('ul');
      ul.className = 'options';
      ul.id = `${type}-options`;
      ul.style.display = 'none';
      countryDialCodes.forEach(element => {
        const li = document.createElement("li");
        li.innerHTML = element.flag + element.dial_code;
        ul.appendChild(li);
      });
      el.appendChild(ul);
    }

    fields[type] = {} as any;
    fields[type].target = ".secure-payment-form ." + formOptions.prefix + type + "-target";
    if (formOptions.placeholders && formOptions.placeholders[type]) {
      fields[type].placeholder =
        type === "card-expiration" && options.enableTwoDigitExpirationYear
          ? "MM / YY"
          : formOptions.placeholders[type];
    }
    if (formOptions.values && formOptions.values[type]) {
      fields[type].value = formOptions.values[type];
    }
    if (formOptions.labels && formOptions.labels[type]) {
      fields[type].label = formOptions.labels[type];
    }
    if (formOptions.titles && formOptions.titles[type]) {
      fields[type].title = formOptions.titles[type];
    }
    if (formOptions.amount) {
      fields[type].amount = formOptions.amount;
    }

    fields[type].fieldOptions = {
      styleType: formOptions.style,
    };
  }

  const language = getCurrentLanguage();
  if (formOptions.apms) {
    const firstField = target.querySelector(`[class$="${firstFieldCardForm}"]`);
    const divider = document.createElement('div');
    divider.classList.add('other-cards-label');
    divider.innerHTML = `<span>${translations[language]['other-cards-label']}</span>`;
    target.insertBefore(divider, firstField);
  }

  // add any styles for the parent window
  if (formOptions.style) {
    addStylesheet(
      json2css(parentStyles()[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  if (isBrandTheme(formOptions.style)) {
    addFooterBrandedIcons(formOptions, target);
  } else {
    addFooterIcons(formOptions, target);
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles()[formOptions.style] : {},
    formOptions?.fields
  );
}

/**
 * Allows integrators to create a drop-in form for accepting
 * track data from a human interface device (HID).
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export function trackReaderForm(
  target: string | HTMLElement,
  formOptions: IUIFormOptions = {},
) {
  if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement;

    if (!el) {
      throw new Error("Credit card track reader form target does not exist");
    }

    target = el;
  }

  target.className = target.className + " secure-payment-form";

  const gateway = getGateway();

  if (gateway && gateway.getEnv(options) !== "production") {
    addSandboxAlert(target);
  }

  formOptions = objectAssign(objectAssign({}, defaultOptions), formOptions);
  formOptions.prefix = "track-reader-";

  // create field targets
  const fieldTypes = ["card-track"];
  const fields: any = {};

  for (const i in fieldTypes) {
    if (!fieldTypes.hasOwnProperty(i)) {
      continue;
    }

    const type = fieldTypes[i];

    if (formOptions.labels && formOptions.labels[type]) {
      const label = document.createElement("label");
      label.setAttribute("for", formOptions.prefix + type);
      label.appendChild(document.createTextNode(formOptions.labels[type]));
      target.appendChild(label);
    }

    const el = document.createElement("div");
    el.id = formOptions.prefix + type;
    target.appendChild(el);

    fields[type] = {} as any;
    fields[type].target = "#" + formOptions.prefix + type;

    if (formOptions.placeholders && formOptions.placeholders[type]) {
      fields[type].placeholder = formOptions.placeholders[type];
    }
    if (formOptions.values && formOptions.values[type]) {
      fields[type].value = formOptions.values[type];
    }
  }

  // add any styles for the parent window
  if (formOptions.style) {
    addStylesheet(
      json2css(parentStyles()[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles()[formOptions.style] : {},
  );
}