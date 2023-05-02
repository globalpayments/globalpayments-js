import {bus, options} from "../../internal";
import getGateway from "../../internal/lib/get-gateway";
import {IframeField, IUIFormField} from "../iframe-field";
import {IError, ISuccess} from "../../internal/gateways";
import {form} from "../../apm";

export default function addClickToPay(iframeField: IframeField | undefined, field: IUIFormField) {
  const gateway = getGateway();
  if (!options.apms?.clickToPay || gateway?.supports.apm?.clickToPay === false) return;

  const allowedCardNetworks = options.apms?.clickToPay?.allowedCardNetworks ? options.apms?.clickToPay?.allowedCardNetworks : options.apms?.allowedCardNetworks;
  const currencyCode = options.apms?.clickToPay?.currencyCode ? options.apms?.clickToPay?.currencyCode : options.apms?.currencyCode;
  const canadianDebit = options.apms?.clickToPay?.canadianDebit;
  const ctpClientId = options.apms?.clickToPay?.ctpClientId!;
  const subtotal = field.amount;
  const amount = subtotal ? parseFloat(subtotal) : 0;
  const missingConfig = [];

  if (!allowedCardNetworks || allowedCardNetworks.length === 0) {
    missingConfig.push('allowedCardNetworks');
  }
  if (!currencyCode) {
    missingConfig.push('currencyCode');
  }
  if (amount === 0) {
    missingConfig.push('amount');
  }
  if (!ctpClientId) {
    missingConfig.push('ctpClientId');
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

  if (options.apms?.clickToPay?.buttonless === true) {
    addClickToPayCDN();
  } else {
    addCTPButton();
  }

  function addCDN(url: string, onload?: any) {
    const script = document.createElement("script");
    script.onload = onload;
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  }

  function addClickToPayCDN() {
    const url = gateway && gateway.getEnv(options) === "production" ? 'https://ctps-cdn.gpapiservices.com/ctp-element.js' : "https://ctpscert-cdn.gpapiservices.com/ctp-element.js";
    addCDN(url, onClickToPayLoaded);
  }

  function onClickToPayLoaded() {
    addCTPElement();
    addCTPEventsListeners();
  }

  function createHtmlElement(htmlElement: string, className?: string) {
    const htmlDivElement = document.createElement(htmlElement);
    if (className) {
      htmlDivElement.className = className;
    }

    return htmlDivElement;
  }

  function createCTPButton() {
    const btn = createHtmlElement('div', 'ctp-button');
    btn.innerHTML = `
      <div class="ctp-header">
        <div class="heading">Checkout with your <span class="ctp-icon"></span>Click to Pay card(s) </div>
        <div class="subheading">enabled by <span class="card-brands"></span>
          <div class="ctp-info-tooltip">
            <div class="ctp-info-tooltip-content">
              <span class="top-arrow"></span>
              <span class="ctp-icon"></span><strong>Click to Pay</strong>
              <div class="subheading">enabled by <span class="card-brands"></span></div>
              <ul>
                <li class="smart-checkout">For easy and smart checkout, simply click to pay whenever you see the Click to Pay icon <span class="ctp-icon"></span>, and your card is accepted.</li>
                <li class="faster-checkout">You can choose to be remembered on your device and browser for faster checkout.</li>
                <li class="industry-standards">Built on industry standards for online transactions and supported by global payment brands.</li>
              </ul>
            </div>
          </div>
        </div>
        <span class="right-arrow"></span>
      </div>`;

    return btn;
  }

  function addCTPButton() {
    const ctpPanel = createHtmlElement('div', 'ctp-panel');
    const ctpButton = createCTPButton();
    ctpPanel.appendChild(ctpButton);
    iframeField?.container?.appendChild(ctpPanel!);

    ctpButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isCTPLoaded = document.querySelectorAll('ctp-element');
      if(isCTPLoaded.length === 0) {
        addClickToPayCDN();
      }
    });
  }

  function ctpInfoTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = "ctp-info-tooltip";
    tooltip.innerHTML = `<div class="ctp-info-tooltip-content">
        <span class="top-arrow"></span>
        <span class="ctp-icon"></span><strong>Click to Pay</strong>
        <div class="subheading">enabled by <span class="card-brands"></span></div>
        <ul>
          <li class="smart-checkout">For easy and smart checkout, simply click to pay whenever you see the Click to Pay icon <span class="ctp-icon"></span>, and your card is accepted.</li>
          <li class="faster-checkout">You can choose to be remembered on your device and browser for faster checkout.</li>
          <li class="industry-standards">Built on industry standards for online transactions and supported by global payment brands.</li>
        </ul>
      </div>`
    return tooltip;
  }

  function addCtpHeading(parent: Element) {
    const label = document.createElement('div');
    label.className = "ctp-heading";
    label.innerHTML = "Express checkout with Click to Pay";
    const infoTooltip = ctpInfoTooltip();
    label.appendChild(infoTooltip);
    parent.prepend(label);
  }

  function createCTPElement() {
    const ctpElement = createHtmlElement('ctp-element');

    if (options.apms?.clickToPay?.buttonless === false) {
      ctpElement.classList.add('hidden');
    }
    ctpElement.setAttribute('init-prop', ctpClientId);
    if (Array.isArray(allowedCardNetworks)) {
      ctpElement.setAttribute('card-brands', JSON.stringify(allowedCardNetworks));
    }
    if (typeof currencyCode === "string") {
      ctpElement.setAttribute('currency-code', currencyCode);
    }
    if (typeof subtotal === "string") {
      ctpElement.setAttribute('subtotal', subtotal);
    }

    if (canadianDebit) {
      ctpElement.setAttribute('canadian-debit', canadianDebit.toString());
    }

    ctpElement.setAttribute('wrapper', "false");

    return ctpElement;
  }

  function addCTPElement() {
    const ctpElement = createCTPElement();
    if (options.apms?.clickToPay?.buttonless === true) {
      iframeField?.container?.appendChild(ctpElement!);
      addCtpHeading(iframeField?.container!);
    } else {
      iframeField?.container?.querySelector('.ctp-panel')?.appendChild(ctpElement!);
      iframeField?.container?.querySelector('ctp-element')?.classList.remove('hidden');
      iframeField?.container?.parentElement?.classList.add('apm-active');
      const isApmForm = field.target?.split(' ').some(c => c.startsWith('#apm'));
      if (!isApmForm) {
        ctpElement.setAttribute('wrapper', 'true');
      }
    }

    ctpElement.addEventListener('click', (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.tagName === "BUTTON" || element.tagName === "LABEL") {
        e.preventDefault();
        e.stopPropagation();
      }
    }, false);

    ctpElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  function addCTPEventsListeners() {
    window.addEventListener('ctp-callid', async (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt.detail?.callid !== undefined) {
        const response: ISuccess = {
          details: {
            apmProvider: "click-to-pay"
          },
          paymentReference: customEvt.detail?.callid
        };
        iframeField?.emit('token-success', response);
      }
    });

    window.addEventListener('ctp-error', async (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt.detail !== undefined) {
        const error: IError = {
          error: true,
          reasons: [{
            code: customEvt.detail.code,
            message: customEvt.detail.message,
          }],
        };
        iframeField?.emit('token-error', error);
      }
    });

    window.addEventListener('ctp-cancel', async (e: Event) => {
      document.location.reload();
    });
  }
}