import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import { translateMessage } from "../../../internal/lib/translate";
import translations from "../../../internal/lib/translations/translations";
import { REDIRECT_ACTION_DELAY_IN_SECONDS } from "./constants";
import { ApmInternalEvents } from "../../enums";
import {getSelectAnotherPaymentMethodButton} from "./common";

export default function handleRedirectAction (content: HTMLDivElement, props: any) {
  const { redirectUrl, onClickSelectAnotherPaymentMethod } = props;
  const lang = getCurrentLanguage();

  const redirectingToPaymentPageDiv = createHtmlDivElement({
    id: 'apms-redirecting-to-page',
    className: 'apms-redirecting-to-page',
  });

  const redirectingToPaymentPageImage = createHtmlImageElement({
    src: `${getAssetBaseUrl('')}images/qr-code-redirect-logo.png`,
    alt: translateMessage(lang, translations.en.QR?.redirectScreen?.redirectingToPaymentPageMessage),
    attributes: [
        { width: '64' },
        { height: '64' },
        {'aria-hidden': 'true' },
        { style: 'margin-bottom: 30px;' },
    ],
  });
  redirectingToPaymentPageDiv.append(redirectingToPaymentPageImage);

  const redirectingToPaymentPageSpan = createHtmlSpanElement({
    className: 'apms-redirecting-to-page-message',
    textContent: `${translateMessage(lang, translations.en.QR?.redirectScreen?.redirectingToPaymentPageMessage)}...`,
  });
  redirectingToPaymentPageDiv.append(redirectingToPaymentPageSpan);

  content.append(redirectingToPaymentPageDiv);

  content.append(getSelectAnotherPaymentMethodButton('select-another-payment-method-button', () => {
    onClickSelectAnotherPaymentMethod();
  }));

  const redirectionTimeoutReference = setTimeout(() => {
    window.location = redirectUrl;
  }, REDIRECT_ACTION_DELAY_IN_SECONDS);

  // If the user navigates back from RedirectAction case, the redirection timeout needs to be clear
  window.addEventListener(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, (_event: any) => {
    if (redirectionTimeoutReference) clearInterval(redirectionTimeoutReference);
  });
}