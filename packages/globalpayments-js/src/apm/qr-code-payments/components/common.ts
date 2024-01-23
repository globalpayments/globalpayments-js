import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
import { ApmInternalEvents } from "../../enums";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import translations from "../../../internal/lib/translations/translations";
import { translateMessage } from "../../../internal/lib/translate";

export function getCountdownCounter(secondsToExpire: string, onFinishCallback: any) {
  const lang = getCurrentLanguage();

  const content = createHtmlDivElement({
    id: 'qr-code-payment-countdown-timer',
  });

  const thisQRCodeWillExpireInSpan = createHtmlSpanElement({
    className: 'qr-code-payment-countdown-timer-message',
    textContent: translateMessage(lang, translations.en.QR?.timer?.text),
  });
  content.append(thisQRCodeWillExpireInSpan);

  const countdownTimerDiv = createHtmlDivElement({
    className: 'qr-code-payment-countdown-timer-clock',
  });
  const clockTimerImage = createHtmlImageElement({
    src: `${getAssetBaseUrl('')}images/clock-timer.svg`,
    alt: translateMessage(lang, translations.en.QR?.timer["icon-alt"]),
    attributes: [
      { width: '20' },
      { height: '20' },
      { 'aria-hidden': 'true' },
    ],
  });
  countdownTimerDiv.append(clockTimerImage);

  const _secondsToExpireNumeric = isNaN(+secondsToExpire) ? 0 : +secondsToExpire;
  const countdownTimeSpan = createHtmlSpanElement({
    id: 'qr-code-payment-countdown-timer-time',
    textContent: formatFromSeconds(_secondsToExpireNumeric),
  });
  countdownTimerDiv.append(countdownTimeSpan);
  content.append(countdownTimerDiv);

  let _secondsToExpire = _secondsToExpireNumeric;
  const countdownIntervalReference = setInterval(() => {
    const secondsLeft = --_secondsToExpire;

    countdownTimeSpan.textContent = formatFromSeconds(secondsLeft);

    if (secondsLeft === 0) {
      onFinishCallback();

      clearInterval(countdownIntervalReference);
    }
  }, 1000);

  // If the user navigates back from PresentQRCodeAction case, the countdown clock interval needs to be clear
  window.addEventListener(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, (_event: any) => {
    if (countdownIntervalReference) clearInterval(countdownIntervalReference);
  });

  return content;
}

function formatFromSeconds(totalSeconds: number): string {
  const lang = getCurrentLanguage();

  if (totalSeconds < 1) return `00${translateMessage(lang, translations.en.QR?.timer?.minutes)} 00${translateMessage(lang, translations.en.QR?.timer?.seconds)}`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}${translateMessage(lang, translations.en.QR?.timer?.minutes)} ${formattedSeconds}${translateMessage(lang, translations.en.QR?.timer?.seconds)}`;
}
