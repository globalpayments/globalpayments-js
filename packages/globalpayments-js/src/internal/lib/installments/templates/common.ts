import { createHtmlImageElement } from "../../../../common/html-element";
import getAssetBaseUrl from "../../asset-base-url";
import { getCurrentLanguage, getTranslationSet } from "../../detectLanguage";
import {
    createHtmlDivElement,
    createHtmlSpanElement,
} from "../helpers/html-element";


export const addInstallmentEligibilityBadge = (): HTMLElement => {

    const lang = getCurrentLanguage();
    const installmentTranslations = getTranslationSet(lang, 'installments');

    const assetUrl = getAssetBaseUrl();
    // Create a badge styled like the provided image
    const content = createHtmlDivElement({
        className: 'installment-eligibility-badge',
    });

    const badge = createHtmlDivElement({
        className: 'installment-badge',
        id: 'installment-badge',
    });

    // SVG checkmark icon (optimized)
    // TODO
    const checkIcon = createHtmlImageElement({
        src: `${assetUrl}images/installment-eligibility-check.svg`,
        alt: 'Checkmark icon',
        className: 'installment-badge-icon',
    });

    const badgeText = createHtmlSpanElement({
        className: 'installment-badge-text',
        textContent: installmentTranslations.eligibleForInstallmentBadgeText,
    });

    badge.append(checkIcon, badgeText);
    content.append(badge);
    return content;
}

export const getInstallmentSection = (): HTMLElement => {
    const content = createHtmlDivElement({
        className: 'installment-option-section',
        id: 'installment-option-section',
    });
    return content;
};