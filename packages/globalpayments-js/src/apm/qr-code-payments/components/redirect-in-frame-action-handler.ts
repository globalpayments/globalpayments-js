import { createHtmlIFrameElement, createHtmlSpanElement } from "../../../common/html-element";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import { translateMessage } from "../../../internal/lib/translate";
import translations from "../../../internal/lib/translations/translations";
import { getSelectAnotherPaymentMethodButton } from "./common";

export default function handleRedirectInFrameAction (content: HTMLDivElement, props: any) {
  const { redirectUrl, onClickSelectAnotherPaymentMethod } = props;
  const lang = getCurrentLanguage();

  // Show a span with a message to let the user know that the iframe is loading the content
  const loadingMessage = `${translateMessage(lang, translations.en?.QR?.loading)}...`;
  const loadingIFrameContentSpan = createHtmlSpanElement({
    id: 'loading-iframe-content',
    textContent: loadingMessage,
    attributes: [
      {'aria-label': loadingMessage },
    ],
  });
  content.append(loadingIFrameContentSpan);

  const qrCodePaymentIFrame = createHtmlIFrameElement({
    src: redirectUrl,
    className: 'qr-code-payment-iframe',
  });
  content.append(qrCodePaymentIFrame);

  // When the iframe loaded the content the span message is removed
  qrCodePaymentIFrame.onload = () => {
    loadingIFrameContentSpan.remove();
  }

  content.append(getSelectAnotherPaymentMethodButton('select-another-payment-method-button', () => {
    onClickSelectAnotherPaymentMethod();
  }));
}