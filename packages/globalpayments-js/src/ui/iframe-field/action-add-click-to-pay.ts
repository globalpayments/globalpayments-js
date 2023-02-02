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
  const wrapper = options.apms?.clickToPay?.wrapper;
  const canadianDebit = options.apms?.clickToPay?.canadianDebit;
  const ctpClientId = options.apms?.clickToPay?.ctpClientId!;
  const subtotal = field.amount;
  const amount = subtotal ? parseFloat(subtotal) : 0;
  const missingConfig = [];

  if(!allowedCardNetworks || allowedCardNetworks.length === 0) {
    missingConfig.push('allowedCardNetworks');
  }
  if(!currencyCode) {
    missingConfig.push('currencyCode');
  }
  if(amount === 0) {
    missingConfig.push('amount');
  }
  if(!ctpClientId) {
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

  addClickToPayCDN();

  function addClickToPayCDN() {
    const script = document.createElement("script");
    script.onload = onClickToPayLoaded;
    script.src = gateway && gateway.getEnv(options) === "production" ? 'https://ctps-cdn.gpapiservices.com/ctp-element.js' : "https://ctpscert-cdn.gpapiservices.com/ctp-element.js";
    script.async = true;
    document.body.appendChild(script);
  }

  function onClickToPayLoaded() {
    if(options.apms?.clickToPay?.buttonless === true) {
      addCTPElement();
    } else {
      const ctpPanel = createHtmlElement('div','ctp-panel');
      const ctpButton = createCTPButton();
      ctpPanel.appendChild(ctpButton);
      iframeField?.container?.appendChild(ctpPanel!);
    }
    addEventsListeners();
  }

  function createHtmlElement(htmlElement: string, className?: string) {
    const htmlDivElement = document.createElement(htmlElement);
    if(className) {
      htmlDivElement.className = className;
    }

    return htmlDivElement;
  }

  function createCTPButton() {
    const btn = createHtmlElement('div', 'ctp-button');
    btn.innerHTML = `
      <div>Checkout with your <span class="ctp-icon"></span>Click to Pay card(s) <br>
        <span class="card-brands">enabled by </span>
        <div class="ctp-info-tooltip">
          <div class="ctp-info-tooltip-content">
            <span class="top-arrow"></span>
            <span class="ctp-icon"></span><strong>Click to Pay</strong><br>
            <span class="card-brands">enabled by </span>
            <ul>
              <li class="smart-checkout">For easy and smart checkout, simply click to pay whenever you see the Click to Pay icon <span class="ctp-icon"></span>, and your card is accepted.</li>
              <li class="faster-checkout">You can choose to be remembered on your device and browser for faster checkout.</li>
              <li class="industry-standards">Built on industry standards for online transactions and supported by global payment brands.</li>
            </ul>
          </div>
        </div>
        <span class="right-arrow"></span>
      </div>`;

    return btn;
  }

  function CtpInfoTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = "ctp-info-tooltip";
    tooltip.innerHTML = `<div class="ctp-info-tooltip-content">
        <span class="top-arrow"></span>
        <span class="ctp-icon"></span><strong>Click to Pay</strong><br>
        <span class="card-brands">enabled by </span>
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
    const infoTooltip = CtpInfoTooltip();
    label.appendChild(infoTooltip);
    parent.prepend(label);
  }

  function createCTPElement() {
    const ctpElement = createHtmlElement('ctp-element');

    if(options.apms?.clickToPay?.buttonless === false) {
      ctpElement.classList.add('hidden');
    }
    ctpElement.setAttribute('init-prop', ctpClientId);
    if(Array.isArray(allowedCardNetworks)) {
      ctpElement.setAttribute('card-brands', JSON.stringify(allowedCardNetworks));
    }
    if (typeof currencyCode === "string") {
      ctpElement.setAttribute('currency-code', currencyCode);
    }
    if (typeof subtotal === "string") {
      ctpElement.setAttribute('subtotal', subtotal);
    }

    if (wrapper) {
      ctpElement.setAttribute('wrapper', wrapper.toString());
    }

    if (canadianDebit) {
      ctpElement.setAttribute('wrapper', canadianDebit.toString());
    }

    return ctpElement;
  }

  function addCTPElement() {
    const ctpElement = createCTPElement();
    if (options.apms?.clickToPay?.buttonless === true) {
      iframeField?.container?.appendChild(ctpElement!);
      hideCancelLink(ctpElement);
      addCtpHeading(iframeField?.container!);
    } else {
      iframeField?.container?.querySelector('.ctp-panel')?.appendChild(ctpElement!);
      iframeField?.container?.querySelector('ctp-element')?.classList.remove('hidden');
      iframeField?.container?.parentElement?.classList.add('apm-active');
      const isCardForm = field.target?.split(' ').some(c => c.startsWith('.credit-card'));
      if(!isCardForm) {
        hideCancelLink(ctpElement);
      }
    }
  }

  function hideCancelLink(ctpElement: Element) {
    ctpElement.querySelector("#cancel-link")?.classList.add('hidden');
  }

  function addEventsListeners() {
    const ctpButton = iframeField?.container?.querySelector('.ctp-button');
    window.addEventListener('ctp-callid',  async (e: Event) => {
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

    ctpButton?.addEventListener('click', () => {
      addCTPElement();
    });
  }
}