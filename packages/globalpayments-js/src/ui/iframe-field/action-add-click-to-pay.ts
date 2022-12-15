import { options } from "../../internal";
import getGateway from "../../internal/lib/get-gateway";
import { IframeField } from "../iframe-field";
import {IError, ISuccess} from "../../internal/gateways";

export default function addClickToPay(iframeField: IframeField | undefined) {
  const gateway = getGateway();
  if (!options.clickToPay || gateway?.supports.apm?.clickToPay === false) return;

  addClickToPayCDN();

  function addClickToPayCDN() {
    const script = document.createElement("script");
    script.onload = onClickToPayLoaded;
    script.src = gateway && gateway.getEnv(options) === "production" ? 'https://ctps-cdn.gpapiservices.com/ctp-element.js' : "https://ctpscert-cdn.gpapiservices.com/ctp-element.js";
    script.async = true;
    document.body.appendChild(script);
  }

  function onClickToPayLoaded() {
    const ctpPanel = createHtmlElement('div','ctp-panel');
    const ctpButton = createCTPButton();
    ctpPanel.appendChild(ctpButton);
    iframeField?.container?.appendChild(ctpPanel!);

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
        <div class="info-tooltip">
          <div class="info-tooltip-content">
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

  function createCTPElement() {
    const ctpElement = createHtmlElement('ctp-element');
    const allowedCardNetworks = options.clickToPay?.allowedCardNetworks;
    const currencyCode = options.clickToPay?.currencyCode;
    const subtotal = options.clickToPay?.currencyCode;
    const wrapper = options.clickToPay?.wrapper;
    const canadianDebit = options.clickToPay?.canadianDebit;
    const ctpClientId = options.clickToPay?.ctpClientId!;

    if (!allowedCardNetworks || !currencyCode || !subtotal) return;

    ctpElement.classList.add('hidden');
    ctpElement.setAttribute('init-prop', ctpClientId);
    ctpElement.setAttribute('card-brands', JSON.stringify(allowedCardNetworks));
    ctpElement.setAttribute('currency-code', currencyCode);
    ctpElement.setAttribute('subtotal', subtotal);

    if (wrapper) {
      ctpElement.setAttribute('wrapper', wrapper.toString());
    }

    if (canadianDebit) {
      ctpElement.setAttribute('wrapper', canadianDebit.toString());
    }

    return ctpElement;
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
      const ctpElement = createCTPElement();
      iframeField?.container?.querySelector('.ctp-panel')?.appendChild(ctpElement!);
      iframeField?.container?.querySelector('ctp-element')?.classList.remove('hidden');
      iframeField?.container?.parentElement?.classList.add('apm-active');
    });
  }
}