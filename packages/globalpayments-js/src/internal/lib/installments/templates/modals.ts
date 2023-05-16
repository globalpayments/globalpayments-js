import {
    createHtmlAnchorElement,
    createHtmlButtonElement,
    createHtmlDivElement,
    createHtmlLiElement,
    createHtmlSpanElement,
    createHtmlUlElement,
    HtmlAnchorTarget,
} from "../helpers/html-element";
import { getProvidedByIssuerTemplate } from "./common";

export const getLearnMoreModalContentTemplate = (
    buttonIds: {
        closeButtonId: string,
        explorePlansButtonId: string,
        termsAndConditionsUrl: string,
        providerImageSrc: string,
    }): HTMLElement => {
    const {
        closeButtonId,
        explorePlansButtonId,
        termsAndConditionsUrl,
        providerImageSrc,
    } = buttonIds;

    const content = createHtmlDivElement({ className: 'installment-learn-more-content' });

    const modalHeader = createHtmlDivElement({ className: 'installment-learn-more-header' });
    const payOffCreditCardsSpan = createHtmlSpanElement({
        className: 'installment-learn-more-header-title',
        textContent: 'Pay off credit cards purchases for less money with an Instalment Plan',
    });
    modalHeader.append(payOffCreditCardsSpan);

    const closeModalButton = createHtmlButtonElement({
        id: closeButtonId,
        className:'installment-button-close',
        attributes: [
            { 'aria-label': 'Close Pay off credit cards modal' },
        ],
    });
    modalHeader.append(closeModalButton);
    content.append(modalHeader);

    const modalBody = createHtmlDivElement({ className: 'installment-learn-more-body' });
    const infoListUL = createHtmlUlElement();
    const infoTextItems = [
        'Spread the cost of payment over multiple monthly bills with a flexible plan to suit you',
        'No hidden costs and no charge for missed payments',
        'No up front payment required',
        'Cancel and repay balance in full at any time with no penalty',
    ].map(infoText => {
        const infoItemLi = createHtmlLiElement();
        infoItemLi.append(createHtmlSpanElement({ textContent: infoText }));
        return infoItemLi;
    });

    infoTextItems.forEach(item => infoListUL.append(item));
    modalBody.append(infoListUL);

    const explorePlansButtonWrapperDiv = createHtmlDivElement({ className: 'installment-base-action-button-wrapper' });
    const explorePlansButton = createHtmlButtonElement({
        id: explorePlansButtonId,
        className:'installment-button-explore-plans',
        textContent: 'Explore plan options'
    });
    explorePlansButtonWrapperDiv.append(explorePlansButton);
    modalBody.append(explorePlansButtonWrapperDiv);

    const linkToVirginWebsiteAnchor = createHtmlAnchorElement({
        href: termsAndConditionsUrl,
        target: HtmlAnchorTarget.Blank,
        className: 'installment-learn-more-link',
        textContent: 'Read more on the Virgin Slyce Website',
        attributes: [
            { 'aria-label': 'Link to Virgin Slyce Website' },
        ],
    });
    modalBody.append(linkToVirginWebsiteAnchor);

    const providedByIssuer = getProvidedByIssuerTemplate({ providerImageSrc, providerImageAlt: 'Provider Logo' });
    modalBody.append(providedByIssuer);

    content.append(modalBody);

    return content;
}