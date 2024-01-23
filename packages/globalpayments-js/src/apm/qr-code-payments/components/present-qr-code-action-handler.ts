import { addCurrencyToAmount } from "../../../common/currency";
import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import { bus, options } from "../../../internal";
import { getCountdownCounter } from "./common";
import { getSelectAnotherPaymentMethodButton } from "../../non-card-payments/components/common";
import handleQRCodeExpiredScreen from "./qr-code-expired-handler";
import translations from "../../../internal/lib/translations/translations";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import { translateMessage } from "../../../internal/lib/translate";
import { loadQRCodeLibraryAndGenerate } from "./generate-qr-code";

export default function handlePresentQRCodeAction (content: HTMLDivElement, props: any) {
    const { amount, qrCode, secondsToExpire, onClickSelectAnotherPaymentMethod } = props;
    const lang = getCurrentLanguage();

    const scanQrCodeToPayInAppSpan = createHtmlSpanElement({
        textContent: `<strong>${translateMessage(lang, translations.en?.QR?.scanRqCode)}</strong> ${translateMessage(lang, translations.en?.QR?.payInApp)}`,
    });
    content.append(scanQrCodeToPayInAppSpan);

    const currencyCode = options.apms?.currencyCode || 'USD';
    const paymentAmountSpan = createHtmlSpanElement({
        className: 'payment-amount',
        textContent: addCurrencyToAmount(currencyCode, amount),
        attributes: [
            {'aria-label': translateMessage(lang, translations.en?.QR?.amount['aria-label']) },
            { role: 'region'},
        ],
    });
    content.append(paymentAmountSpan);

    // The wrapper for the QR Code Image that will be generated
    const qrImage = createHtmlDivElement({id: "qr-code-image"});
    content.append(qrImage);

    loadQRCodeLibraryAndGenerate(qrCode)
        .then((dataURL) => {
            // Use the generated QR code data URL
            const qrImageElement = createHtmlImageElement({
                src: dataURL,
                alt: '',
                attributes: [
                    { width: '200' },
                    { height: '200' },
                    { 'aria-hidden': 'true' },
                ],
            });
            qrImage.append(qrImageElement);
        })
        .catch((error) => {
            // Handle any errors during QR code generation or library loading
            bus.emit("error", {
                error: true,
                reasons: [
                    {
                        code: "ERROR",
                        message: error,
                    },
                ],
            });
        });

    // The Countdown Counter will be displayed only if the seconds_to_expire property is provided.
    if (secondsToExpire) {
        content.append(getCountdownCounter(secondsToExpire, () => {
            content.innerHTML = '';
            handleQRCodeExpiredScreen(content, { onClickSelectAnotherPaymentMethod });
        }));
    }

    content.append(getSelectAnotherPaymentMethodButton('select-another-payment-method-button', () => {
        onClickSelectAnotherPaymentMethod();
    }));
}