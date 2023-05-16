import { createModalComponent, ModalComponent } from "../components/modal/create-modal-component";
import {
    createHtmlButtonElement,
    createHtmlDivElement,
    createHtmlLiElement,
    createHtmlSpanElement,
    createHtmlUlElement,
} from "../helpers/html-element";
import { InstallmentEventListenerDefinition, InstallmentsContext, InstallmentStepDefinition } from "../installments-handler";
import { getProvidedByIssuerTemplate } from "./common";
import { getLearnMoreModalContentTemplate } from "./modals";

let isInstallmentPlansOptionOpen: boolean;

const learnMoreModalCloseButtonId = 'installment-learn-more-modal-close';
const learnMoreModalExplorePlansButtonId = 'installment-learn-more-modal-explore-plans';
let learnMoreModal: ModalComponent | undefined;

const initialize = (context: InstallmentsContext): void => {
    isInstallmentPlansOptionOpen = true;
    const { termsAndConditionsUrl, providerImageUrl} = context.installmentPlans;

    learnMoreModal = createModalComponent({
        id: 'installment-learn-more-modal',
        htmlContent: getLearnMoreModalContentTemplate({
            closeButtonId: learnMoreModalCloseButtonId,
            explorePlansButtonId: learnMoreModalExplorePlansButtonId,
            termsAndConditionsUrl,
            providerImageSrc: providerImageUrl,
        }),
    });
}

const contentHandler = (context: InstallmentsContext): HTMLElement => {
    const { providerImageUrl } = context.installmentPlans;
    const content = createHtmlDivElement({ className: 'installment-panel' });

    if (learnMoreModal) {
        content.append(learnMoreModal.modalElement);
    }

    const installmentOptionsDiv = createHtmlDivElement({ className: 'installment-options' });
    content.append(installmentOptionsDiv);

    const installmentOptionsHeaderDiv = createHtmlDivElement({
        className: 'installment-options-header',
        attributes: [
            { 'aria-expanded': isInstallmentPlansOptionOpen ? 'true' : 'false' },
        ],
    });

    const elegibleForTitleSpan = createHtmlSpanElement({ className: 'installment-plan-options-title', textContent: 'You are eligible for an Instalment Plan' });
    installmentOptionsHeaderDiv.append(elegibleForTitleSpan);

    const toggleOptionsDiv = createHtmlDivElement({ className: 'installment-plans-options' });
    installmentOptionsHeaderDiv.append(toggleOptionsDiv);

    const closeDetailsButton = createHtmlButtonElement({
        id: 'installment-toggle-options',
        className:'installment-button-close',
        attributes: [
            { 'aria-label': 'Collapse installments options details' },
        ],
    });

    const showDetailsButton = createHtmlButtonElement({
        id: 'installment-toggle-options',
        className:'installment-link',
        textContent: 'Show details',
        attributes: [
            { 'aria-label': 'Show installments options details' },
        ],
    });

    toggleOptionsDiv.append(isInstallmentPlansOptionOpen ? closeDetailsButton : showDetailsButton);
    installmentOptionsDiv.append(installmentOptionsHeaderDiv);

    const providedByIssuer = getProvidedByIssuerTemplate({ providerImageSrc: providerImageUrl, providerImageAlt: 'Provider Logo' });
    installmentOptionsDiv.append(providedByIssuer);

    const installmentOptionsContentDiv = createHtmlDivElement({ className: 'installment-options-content' });
    const payThisTransactionSpan = createHtmlSpanElement({ textContent: 'Pay this transaction for a lower overall cost' });
    installmentOptionsContentDiv.append(payThisTransactionSpan);

    const infoListUL = createHtmlUlElement();

    const infoTextItems = [
        'Lower APR than credit card rate',
        'Split the cost over 3 - 24 monthly bills',
        'Helps you manage your finances',
    ].map(infoText => {
        const infoItemLi = createHtmlLiElement();
        infoItemLi.append(createHtmlSpanElement({ textContent: infoText }));
        return infoItemLi;
    });

    infoTextItems.forEach(item => infoListUL.append(item));
    installmentOptionsContentDiv.append(infoListUL);

    const explorePlansButtonWrapperDiv = createHtmlDivElement({ className: 'installment-base-action-button-wrapper' });
    const explorePlansButton = createHtmlButtonElement({
        id: 'explore-plans',
        className:'installment-button-explore-plans',
        textContent: 'Explore plans'
    });
    explorePlansButtonWrapperDiv.append(explorePlansButton);
    installmentOptionsContentDiv.append(explorePlansButtonWrapperDiv);

    const learnMoreButtonWrapperDiv = createHtmlDivElement({ className: 'installment-base-action-button-wrapper' });
    const learnMoreButton = createHtmlButtonElement({
        id: 'learn-more',
        className:'installment-button-learn-more',
        textContent: 'Learn more'
    });
    learnMoreButtonWrapperDiv.append(learnMoreButton);
    installmentOptionsContentDiv.append(learnMoreButtonWrapperDiv);

    if (isInstallmentPlansOptionOpen) installmentOptionsDiv.append(installmentOptionsContentDiv);

    return content;
};

const eventsListeners = (context: InstallmentsContext): InstallmentEventListenerDefinition[] => {
    addLearnMoreModalEventsListeners(context);

    return [
        {
            elementSelector: '#explore-plans',
            eventName: 'click',
            eventHandler: () => {
                context.explorePlans();
            },
        },
        {
            elementSelector: '#learn-more',
            eventName: 'click',
            eventHandler: () => {
                if (!learnMoreModal) return;
                learnMoreModal.open();
            },
        },
        {
            elementSelector: '#installment-toggle-options',
            eventName: 'click',
            eventHandler: () => {
                isInstallmentPlansOptionOpen = !isInstallmentPlansOptionOpen;

                context.updateContainerContent();
            },
        },
    ];
};

export default { initialize, contentHandler, eventsListeners } as InstallmentStepDefinition;

function addLearnMoreModalEventsListeners(context: InstallmentsContext) {
    if (!learnMoreModal) return;

    const closeModalButton = document.getElementById(learnMoreModalCloseButtonId);
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            learnMoreModal?.close();
        });
    }

    const explorePlansButtonId = document.getElementById(learnMoreModalExplorePlansButtonId);
    if (explorePlansButtonId) {
        explorePlansButtonId.addEventListener('click', () => {
            learnMoreModal?.close();

            context.explorePlans();
        });
    }
}