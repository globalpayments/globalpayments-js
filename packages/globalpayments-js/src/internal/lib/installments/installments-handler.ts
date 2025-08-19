import { IframeField } from "../../../ui";
import InstallmentPlansData from "./contracts/installment-plans-data";
import { createHtmlDivElement } from "./helpers/html-element";
import createInstallmentStep0 from "./templates/create-step-0";
import createInstallmentStep1 from "./templates/create-step-1";

export class InstallmentsHandler {
    private readonly iframeField: IframeField | undefined;
    private readonly installmentPlans: InstallmentPlansData;

    private currentStepIndex: number = 0;
    private steps: InstallmentStepDefinition[];
    private context: InstallmentsContext;

    private selectedTermIndex: number = 0;
    private tokenizationCallback: (installment: InstallmentPaymentData) => void

    constructor(
        _iframeField: IframeField | undefined,
        _installmentPlans: InstallmentPlansData,
        _tokenizationCallback: (installment: InstallmentPaymentData) => void,
        ) {
        this.iframeField = _iframeField;
        this.installmentPlans = _installmentPlans;
        this.tokenizationCallback = _tokenizationCallback;

        this.steps = this.getInstallmentSteps();
        this.context = this.getInitialContext();
    }

    public init(): void {
        this.createContainerElement();

        this.updateContainerContent(true);
    }

    private moveNext(): void {
        if ((this.currentStepIndex + 1) >= this.steps.length) return;
        this.currentStepIndex++;
        this.updateContainerContent(true);
    }

    private moveToInitialStep(): void {
        this.currentStepIndex = 0;
        this.selectedTermIndex = 0;
        this.context.selectedTerm = this.selectedTermIndex;

        this.updateContainerContent(true);
    }

    private updateContainerContent(initialize?: boolean): void {
        const step = this.steps[this.currentStepIndex];
        if (!step) return;

        if (initialize && step.initialize) {
            step.initialize(this.context);
        }

        // Update content
        const container = this.iframeField?.container?.querySelector('.installment-step-container');
        if (container) {
            const content = step.contentHandler(this.context);
            container.innerHTML = content.outerHTML;
        }

        // Add events listeners
        if (!step.eventsListeners) return;
        const listeners = step.eventsListeners(this.context) || [];
        listeners.forEach((listener: any) => {
            const element = this.iframeField?.container?.querySelector(listener.elementSelector);
            element?.addEventListener(listener.eventName, listener.eventHandler);
        });
    }

    private createContainerElement(): void {
        const domElement = document.querySelector(`#virgin-money-credit-card-banner`);
        if (domElement) {
            domElement.setAttribute('style', `display: none`);
        }

        this.iframeField?.container?.appendChild(createHtmlDivElement({ className: 'installment-step-container' }));
    }

    private getInstallmentSteps(): InstallmentStepDefinition[] {
        return [
            createInstallmentStep0, // Initial installment option
            createInstallmentStep1, // Confirm Your Plan Details
        ];
    }

    private getInitialContext(): InstallmentsContext {
        return {
            installmentPlans: this.installmentPlans,
            selectedTerm: this.selectedTermIndex,

            explorePlans: () => { this.explorePlansHanlder() },
            selectTerm: (i: number) => { this.selectTermHandler(i) },
            changePaymentMethod: () => { this.changePaymentMethodHandler() },
            pay: () => { this.payHandler() },

            updateContainerContent: () => { this.updateContainerContent() },
        };
    }

    private explorePlansHanlder(): void {
        this.changeCreditCardFormFieldsVisibility(false);

        this.moveNext()
    }

    private selectTermHandler(termIndex: number): void {
        this.selectedTermIndex = termIndex;
        this.context.selectedTerm = this.selectedTermIndex;

        this.updateContainerContent();
    }

    private payHandler(): void {
        const selectedTerm = this.installmentPlans.terms[this.selectedTermIndex];

        this.tokenizationCallback({
            id: this.installmentPlans.id,
            reference: selectedTerm.reference,
        });
    }

    private changePaymentMethodHandler(): void {
        this.changeCreditCardFormFieldsVisibility(true);

        this.moveToInitialStep();
    }

    private changeCreditCardFormFieldsVisibility(visible: boolean): void {
        const fields = [
            // Apm
            '.credit-card-click-to-pay',
            '.credit-card-google-pay',
            '.credit-card-apple-pay',
            '.other-cards-label',
            // Credit card common
            '.credit-card-card-number',
            '.credit-card-card-expiration',
            '.credit-card-card-cvv',
            '.credit-card-card-holder-name',
            '.email',
            '.phone-number',
            '.billing-address',
            '.country',
            '.shipping-address',
            '.shipping-address-country',
            '.credit-card-save-enable',
            '.credit-card-submit',
            '.credit-card-shield',
            '.credit-card-logo',
        ];

        fields.forEach((fieldSelector: any) => {
            const domElement = document.querySelector(`${fieldSelector}`);
            if (domElement) {
                domElement.setAttribute('style', `display: ${ visible ? 'block' : 'none' };`);
            }
        });
    }
}

export interface InstallmentsContext {
    installmentPlans: InstallmentPlansData;
    selectedTerm: number;

    hasIssuerInfo?: boolean;

    explorePlans: () => void;
    selectTerm: (i: number) => void;
    changePaymentMethod: () => void;
    pay: ()=> void;

    updateContainerContent: () => void;
}

export interface InstallmentStepDefinition {
    initialize?: (context: InstallmentsContext) => void;
    contentHandler: (context: InstallmentsContext) => HTMLElement;
    eventsListeners: (context: InstallmentsContext) => InstallmentEventListenerDefinition[];
}

export interface InstallmentEventListenerDefinition {
    elementSelector: string;
    eventName: string;
    eventHandler: (e: Event) => void;
}

export interface InstallmentPaymentData {
    id: string;
    reference: string;
}