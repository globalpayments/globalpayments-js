import { IframeField } from "../../../ui";
import InstallmentPlansData from "./contracts/installment-plans-data";
export declare class InstallmentsHandler {
    private readonly iframeField;
    private readonly installmentPlans;
    private currentStepIndex;
    private steps;
    private context;
    private selectedTermIndex;
    private tokenizationCallback;
    constructor(_iframeField: IframeField | undefined, _installmentPlans: InstallmentPlansData, _tokenizationCallback: (installment: InstallmentPaymentData) => void);
    init(): void;
    private moveNext;
    private moveToInitialStep;
    private updateContainerContent;
    private createContainerElement;
    private getInstallmentSteps;
    private getInitialContext;
    private explorePlansHanlder;
    private selectTermHandler;
    private payHandler;
    private changePaymentMethodHandler;
    private changeCreditCardFormFieldsVisibility;
}
export interface InstallmentsContext {
    installmentPlans: InstallmentPlansData;
    selectedTerm: number;
    hasIssuerInfo?: boolean;
    explorePlans: () => void;
    selectTerm: (i: number) => void;
    changePaymentMethod: () => void;
    pay: () => void;
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
