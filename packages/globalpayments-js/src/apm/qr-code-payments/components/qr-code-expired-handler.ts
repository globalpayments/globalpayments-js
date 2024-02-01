import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
import { getSelectAnotherPaymentMethodButton } from "../../non-card-payments/components/common";
import {getCurrentLanguage} from "../../../internal/lib/detectLanguage";
import translations from "../../../internal/lib/translations/translations";
import {translateMessage} from "../../../internal/lib/translate";

export default function handleQRCodeExpiredScreen (content: HTMLDivElement, props: any) {
    const { onClickSelectAnotherPaymentMethod } = props;
    const lang = getCurrentLanguage();

    const qrCodeExpiredAlertDiv = createHtmlDivElement({
        id: 'qr-code-expired-alert',
        className: 'qr-code-expired-alert',
    });

    const qrCodeExpiredAlertImageWapper = createHtmlDivElement({
        id: 'qr-code-expired-alert-icon',
        className: 'qr-code-expired-alert-icon',
    });
    const qrCodeExpiredAlertImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/alert-icon.svg`,
        alt: translateMessage(lang, translations.en?.QR?.expiredScreen?.alt),
        attributes: [
            { width: '24' },
            { height: '22' },
            {'aria-hidden': 'true' },
        ],
    });
    qrCodeExpiredAlertImageWapper.append(qrCodeExpiredAlertImage);
    qrCodeExpiredAlertDiv.append(qrCodeExpiredAlertImageWapper);

    const qrCodeExpiredAlertMessageDiv = createHtmlDivElement({
        id: 'qr-code-expired-alert-message',
        className: 'qr-code-expired-alert-message',
    });

    const qrCodeHasExpiredAlertTitleSpan = createHtmlSpanElement({
        className: 'qr-code-expired-alert-message-title',
        textContent: translateMessage(lang, translations.en?.QR?.expiredScreen?.title),
    });
    qrCodeExpiredAlertMessageDiv.append(qrCodeHasExpiredAlertTitleSpan);

    const qrCodeHasExpiredAlertMessageSpan = createHtmlSpanElement({
        textContent: translateMessage(lang, translations.en?.QR?.expiredScreen?.text),
    });
    qrCodeExpiredAlertMessageDiv.append(qrCodeHasExpiredAlertMessageSpan);

    qrCodeExpiredAlertDiv.append(qrCodeExpiredAlertMessageDiv);
    content.append(qrCodeExpiredAlertDiv);

    const qrCodeExpiredImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/qr-code-expired.png`,
        alt: translateMessage(lang, translations.en?.QR?.expiredScreen?.alt),
        attributes: [
            { width: '434' },
            { height: '284' },
            {'aria-hidden': 'true' },
        ],
    });
    content.append(qrCodeExpiredImage);

    content.append(getSelectAnotherPaymentMethodButton('select-another-payment-method-button', () => {
        onClickSelectAnotherPaymentMethod();
    }));
}