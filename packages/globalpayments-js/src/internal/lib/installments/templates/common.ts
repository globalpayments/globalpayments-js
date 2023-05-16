import getAssetBaseUrl from "../../../gateways/gp-api/get-asset-base-url";
import {
    createHtmlButtonElement,
    createHtmlDivElement,
    createHtmlImageElement,
    createHtmlSpanElement,
} from "../helpers/html-element";

export const getProvidedByIssuerTemplate = (props: { providerImageSrc: string, providerImageAlt: string }): HTMLElement => {
    const { providerImageSrc, providerImageAlt } = props;
    const providedBySpan = createHtmlSpanElement({ className: 'provided-by', textContent: 'Provided by ' });
    const providerImage = createHtmlImageElement({
        src: providerImageSrc,
        alt: providerImageAlt,
        attributes: [
            { width: '64' },
            { height: '13' },
        ],
    });
    providedBySpan.append(providerImage);

    return providedBySpan;
};

export const getChangePaymentMethodTemplate = (buttonId: string): HTMLElement => {
    return createHtmlButtonElement({
        id: buttonId,
        className: 'installment-link',
        textContent: 'Or choose another payment method',
        attributes: [
            { 'aria-label': 'Change the payment method' },
        ],
    });
};

export const getHaveVirginMoneyCreditCardBannerTemplate = (): HTMLElement => {
    const content = createHtmlDivElement({
        id: 'virgin-money-credit-card-banner',
        attributes: [
            { style: 'display: flex; justify-content: center; width: 100%;' },
        ],
    });

    const issuerPanelBannerDiv = createHtmlDivElement({ className: 'installment-issuer-panel' });

    const haveVirginMoneyCreditCardBannerHeaderDiv = createHtmlDivElement({
        className: 'installment-issuer-panel-header',
    });

    const haveVirginCreditCardTitleSpan = createHtmlSpanElement({
        className: 'installment-issuer-panel-title',
        textContent: 'Have a Virgin Money credit card?'
    });
    haveVirginMoneyCreditCardBannerHeaderDiv.append(haveVirginCreditCardTitleSpan);

    const virginMoneyLogoImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/virgin-money-logo.png` ,
        alt: 'Virgin Money logo',
        attributes: [
            { width: '64' },
            { height: '13' },
        ],
    });
    haveVirginMoneyCreditCardBannerHeaderDiv.append(virginMoneyLogoImage);

    // Missing Virgin Money Image

    issuerPanelBannerDiv.append(haveVirginMoneyCreditCardBannerHeaderDiv);

    const haveVirginMoneyCreditCardBannerContentDiv = createHtmlDivElement({ className: 'installment-options-content' });
    const enterYourCreditCardDetailsSpan = createHtmlSpanElement({
        className: 'installment-issuer-panel-content',
        textContent: 'Enter your card details to check for flexible instalment payment plans and spread the cost over multiple bills.',
    });
    haveVirginMoneyCreditCardBannerContentDiv.append(enterYourCreditCardDetailsSpan);
    issuerPanelBannerDiv.append(haveVirginMoneyCreditCardBannerContentDiv);

    content.append(issuerPanelBannerDiv);

    return content;
}