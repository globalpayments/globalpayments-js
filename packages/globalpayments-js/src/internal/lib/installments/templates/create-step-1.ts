import { addCurrencyToAmount } from "../helpers/currency";
import { InstallmentTermModes } from "../contracts/enums";
import InstallmentPlansData from "../contracts/installment-plans-data";
import InstallmentTerm from "../contracts/installment-term";
import {
    createHtmlAnchorElement,
    createHtmlButtonElement,
    createHtmlDivElement,
    createHtmlSpanElement,
    HtmlAnchorTarget,
} from "../helpers/html-element";
import { InstallmentEventListenerDefinition, InstallmentsContext, InstallmentStepDefinition } from "../installments-handler";
import { getProvidedByIssuerTemplate, getChangePaymentMethodTemplate } from "./common";

const contentHandler = (context: InstallmentsContext): HTMLElement => {
    const { installmentPlans, selectedTerm: selectedTermIndex } = context;

    const { terms, providerImageUrl, paymentMethod } = installmentPlans;
    const selectedTerm = terms[selectedTermIndex];
    const { reference, totalTimeUnitCount, totalAmount, currency, timeUnit, termsAndConditionsUrl } = selectedTerm;
    const trimmedTimeUnit = timeUnit ? `${timeUnit.toLowerCase()}s` : '';
    const content = createHtmlDivElement({ className: 'installment-panel' });

    const installmentPanelHeaderDiv = createHtmlDivElement({ className: 'installment-panel-header' });

    const exploreInstallmentPlansTitleSpan = createHtmlSpanElement({ className: 'installment-plans-title', textContent: 'Confirm Your Plan Details' });
    installmentPanelHeaderDiv.append(exploreInstallmentPlansTitleSpan);

    const exploreInstallmentPlansSubtitleSpan = createHtmlSpanElement({ className: 'installment-plans-subtitle', textContent: 'Monthly Repayment:' });
    installmentPanelHeaderDiv.append(exploreInstallmentPlansSubtitleSpan);

    const monthlyAmountSpan = createHtmlSpanElement({
        className: 'installment-plan-monthly-amount',
        textContent: addCurrencyToAmount(currency, selectedTerm.timeUnitAmount),
    });
    installmentPanelHeaderDiv.append(monthlyAmountSpan);
    content.append(installmentPanelHeaderDiv);

    const installmentPanelContentDiv = createHtmlDivElement({ className: 'installment-panel-content' });

    const installmentPlanDetailsDiv = createHtmlDivElement({ className: 'installment-plan-details' });
    const planDetails = getInstallmentPlanDetails(installmentPlans, selectedTerm);
    planDetails.forEach(({ label, value }) => {
        const planDetailItemDiv = createHtmlDivElement({ className: 'installment-field-value-item' });

        const planDetailLabelSpan = createHtmlSpanElement({ textContent: label });
        planDetailItemDiv.append(planDetailLabelSpan);
        const planDetailValueSpan = createHtmlSpanElement({ textContent: value });
        planDetailItemDiv.append(planDetailValueSpan);

        installmentPlanDetailsDiv.append(planDetailItemDiv);
    });
    installmentPanelContentDiv.append(installmentPlanDetailsDiv);

    const installmentTermsDiv = createHtmlDivElement({ className: 'installment-term-selector-title' });
    const howManySpan = createHtmlSpanElement({ textContent: `How many ${trimmedTimeUnit}?` });
    installmentTermsDiv.append(howManySpan);
    installmentPanelContentDiv.append(installmentTermsDiv);

    const installmentTermsSelectorButtonWrapperDiv = createHtmlDivElement({ className: 'installment-base-action-button-wrapper' });
    terms.forEach((term, index) => {
        const termButton = createHtmlButtonElement({
            id: `term-${index}`,
            className: `installment-button-month-term ${index !== selectedTermIndex ? 'installment-unselected' : ''}`,
            textContent: term.totalTimeUnitCount
        });
        installmentTermsSelectorButtonWrapperDiv.append(termButton);
    });
    installmentPanelContentDiv.append(installmentTermsSelectorButtonWrapperDiv);

    installmentPanelContentDiv.append(getIssuerInfoBanner({
        providerName: 'Virgin Money',
        maskedNumberLast4: paymentMethod.card.maskedNumberLast4.slice(-4),
        totalAmount: addCurrencyToAmount(currency, totalAmount),
        totalTimeUnitCount,
        timeUnit: trimmedTimeUnit,
        referencePromorionId: reference,
        termsAndConditionsUrl,
    }));
    content.append(installmentPanelContentDiv);

    const installmentPanelFooterDiv = createHtmlDivElement({ className: 'installment-panel-footer' });
    const payButtonWrapperDiv = createHtmlDivElement({ className: 'installment-base-action-button-wrapper' });
    const payButton = createHtmlButtonElement({
        id: 'pay-with-instalments',
        className:'installment-button-pay',
        textContent: 'Pay with Instalments'
    });
    payButtonWrapperDiv.append(payButton);
    installmentPanelFooterDiv.append(payButtonWrapperDiv);

    const providedByIssuer = getProvidedByIssuerTemplate({ providerImageSrc: providerImageUrl, providerImageAlt: 'Provider Logo' });
    installmentPanelFooterDiv.append(providedByIssuer);

    const changePaymentMethodDiv = createHtmlDivElement();
    const changePaymentMethodButton = getChangePaymentMethodTemplate('change-payment-method');
    changePaymentMethodDiv.append(changePaymentMethodButton);
    installmentPanelFooterDiv.append(changePaymentMethodDiv);

    content.append(installmentPanelFooterDiv);

    return content;
};

const eventsListeners = (context: InstallmentsContext): InstallmentEventListenerDefinition[] => {
    const planOptionsListeners = context.installmentPlans.terms.map((x: any, i: number) => {
        return {
            elementSelector: `#term-${i}`,
            eventName: `click`,
            eventHandler: () => {
                context.selectTerm(i);
            },
        };
    });

    return [
        {
            elementSelector: '#pay-with-instalments',
            eventName: 'click',
            eventHandler: (e: Event) => {
                e.preventDefault();
                context.pay();
            },
        },
        {
            elementSelector: '#change-payment-method',
            eventName: 'click',
            eventHandler: () => {
                context.changePaymentMethod();
            },
        },
    ].concat(planOptionsListeners);
};

export default { contentHandler, eventsListeners } as InstallmentStepDefinition;

function getInstallmentPlanDetails(installmentData: InstallmentPlansData, selectedTerm: InstallmentTerm) {
    const {
        mode,
        currency,
        interestRate,
        fees,
        totalAmount,
    } = selectedTerm;

    let planDetails = [
        { label: 'Transaction total amount', value: addCurrencyToAmount(currency, installmentData.amount) },
    ];

    if (mode === InstallmentTermModes.FEE) {
        const { monthlyAmount, totalAmount: feeTotalAmount } = fees || {};
        planDetails = planDetails.concat([
            { label: `Monthy fee (Equivalent ${mode} ${interestRate || 0}%)`, value: addCurrencyToAmount(currency, monthlyAmount) },
            { label: 'Total fees', value: addCurrencyToAmount(currency, feeTotalAmount) },
            { label: 'Total plan cost', value: addCurrencyToAmount(currency, totalAmount) },
        ]);
    } else {
        planDetails = planDetails.concat([
            { label: `Monthy fee (Equivalent ${mode} ${interestRate}%)`, value: addCurrencyToAmount(currency, totalAmount) },
        ]);
    }
    return planDetails;
}

function getIssuerInfoBanner(
    props: {
        providerName: string,
        maskedNumberLast4: string,
        totalAmount: string,
        totalTimeUnitCount: string,
        timeUnit: string,
        referencePromorionId: string,
        termsAndConditionsUrl: string,
    }): HTMLElement {
    const {
        providerName,
        maskedNumberLast4,
        totalAmount,
        totalTimeUnitCount,
        timeUnit,
        referencePromorionId,
        termsAndConditionsUrl
    } = props;

    const issuerInfoBannerDiv = createHtmlDivElement({ className: 'installment-options' });
    const termsAndConditionsTitleSpan = createHtmlSpanElement({
        textContent: 'TERMS & CONDITIONS',
        className: 'term-and-condition-title',
    });
    issuerInfoBannerDiv.append(termsAndConditionsTitleSpan);

    const offerAnchor = createHtmlAnchorElement({
        href: termsAndConditionsUrl,
        target: HtmlAnchorTarget.Blank,
        className: 'term-and-condition-link',
        textContent: '<offerURL>',
        attributes: [
            { 'aria-label': 'Link to see installment plan information' },
        ],
    });

    const textContent = `The payment plan is provided by <b>${providerName}</b> under your existing credit card agreement card ending <b>${maskedNumberLast4}</b> and subject to the terms and conditions as set out in termsAndConditions.`
        + ` The total repayment amount of <b>${totalAmount}</b> will be spread across </b>${totalTimeUnitCount} ${timeUnit}</b> based on the plan you’ve selected.`
        + ` If you have any queries in respect to your plan please refer to ${offerAnchor.outerHTML} and if in doubt contact your card issuer citing the reference <b>${referencePromorionId}</b>.`;

    const paymentPlanDetailsSpan = createHtmlSpanElement();
    paymentPlanDetailsSpan.innerHTML = textContent;
    issuerInfoBannerDiv.append(paymentPlanDetailsSpan);

    return issuerInfoBannerDiv;
}