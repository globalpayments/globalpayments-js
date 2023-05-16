import { InstallmentAvailableStatus } from "./enums";
import InstallmentAction, { installmentActionMapper } from "./installment-action";
import InstallmentPaymentMethod, { installmentPaymentMethodMapper } from "./installment-payment-method";
import InstallmentTerm, { installmentTermMapper } from "./installment-term";

/**
 * InstallmentPlansData class models the data returned from the server with the installment plans and terms.
 */
export default class InstallmentPlansData {
    public id: string;
    public timeCreated: string;
    public type: string;
    public status: string;
    public channel: string;
    public amount: string;
    public currency: string;
    public country: string;
    public merchantId: string;
    public merchantName: string;
    public accountId: string;
    public accountName: string;
    public reference: string;
    public termsAndConditionsUrl: string;
    public providerImageUrl: string;
    public terms: InstallmentTerm[];
    public paymentMethod: InstallmentPaymentMethod;
    public action: InstallmentAction;

    constructor(
        _id: string,
        _timeCreated: string,
        _type: string,
        _status: string,
        _channel: string,
        _amount: string,
        _currency: string,
        _country: string,
        _merchantId: string,
        _merchantName: string,
        _accountId: string,
        _accountName: string,
        _reference: string,
        _termsAndConditionsUrl: string,
        _providerImageUrl: string,

        _terms: InstallmentTerm[],
        _paymentMethod: InstallmentPaymentMethod,
        _action: InstallmentAction,
        ) {
            this.id = _id;
            this.timeCreated = _timeCreated;
            this.type = _type;
            this.status = _status;
            this.channel = _channel;
            this.amount = _amount;
            this.currency = _currency;
            this.country = _country;
            this.merchantId = _merchantId;
            this.merchantName = _merchantName;
            this.accountId = _accountId;
            this.accountName = _accountName;
            this.reference = _reference;
            this.termsAndConditionsUrl = _termsAndConditionsUrl;
            this.providerImageUrl = _providerImageUrl;
            this.paymentMethod = _paymentMethod;
            this.terms = _terms;
            this.action = _action;
    }
}

export function installmentPlansDataMapper(origin: {
    id: string,
    time_created: string,
    type: string,
    status: string,
    channel: string,
    amount: string,
    currency: string,
    country: string,
    merchant_id: string,
    merchant_name: string,
    account_id: string,
    account_name: string,
    reference: string,
    terms_and_conditions_url: string,
    provider_image_url: string,
    terms: any[],
    payment_method: any,
    action: any,
}): InstallmentPlansData {
    const compareTerms = (x: { totalTimeUnitCount: string }, y: { totalTimeUnitCount: string }) => (+x.totalTimeUnitCount > +y.totalTimeUnitCount) ? 1 : ((+y.totalTimeUnitCount > +x.totalTimeUnitCount) ? -1 : 0);

    return {
        id: origin.id,
        timeCreated: origin.time_created,
        type: origin.type,
        status: origin.status,
        channel: origin.channel,
        amount: origin.amount,
        currency: origin.currency,
        country: origin.country,
        merchantId: origin.merchant_id,
        merchantName: origin.merchant_name,
        accountId: origin.account_id,
        accountName: origin.account_name,
        reference: origin.reference,
        termsAndConditionsUrl: origin.terms_and_conditions_url,
        providerImageUrl: origin.provider_image_url,
        paymentMethod: installmentPaymentMethodMapper(origin.payment_method),
        terms: origin.terms.map(x => installmentTermMapper(x)).sort(compareTerms),
        action: installmentActionMapper(origin.action),
    };
}

export function verifyInstallmentAvailability(installmentPlansData: { status: string }): boolean {
    return installmentPlansData.status === InstallmentAvailableStatus.Available;
}