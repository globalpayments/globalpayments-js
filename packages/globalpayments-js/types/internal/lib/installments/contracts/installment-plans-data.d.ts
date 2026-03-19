import InstallmentAction from "./installment-action";
import InstallmentPaymentMethod from "./installment-payment-method";
import InstallmentTerm from "./installment-term";
/**
 * InstallmentPlansData class models the data returned from the server with the installment plans and terms.
 */
export default class InstallmentPlansData {
    id: string;
    timeCreated: string;
    type: string;
    status: string;
    channel: string;
    amount: string;
    currency: string;
    country: string;
    merchantId: string;
    merchantName: string;
    accountId: string;
    accountName: string;
    reference: string;
    terms: InstallmentTerm[];
    paymentMethod: InstallmentPaymentMethod;
    action: InstallmentAction;
    constructor(_id: string, _timeCreated: string, _type: string, _status: string, _channel: string, _amount: string, _currency: string, _country: string, _merchantId: string, _merchantName: string, _accountId: string, _accountName: string, _reference: string, _terms: InstallmentTerm[], _paymentMethod: InstallmentPaymentMethod, _action: InstallmentAction);
}
export declare function installmentPlansDataMapper(origin: {
    id: string;
    time_created: string;
    type: string;
    status: string;
    channel: string;
    amount: string;
    currency: string;
    country: string;
    merchant_id: string;
    merchant_name: string;
    account_id: string;
    account_name: string;
    reference: string;
    terms: any[];
    payment_method: any;
    action: any;
}): InstallmentPlansData;
export declare function verifyInstallmentAvailability(installmentPlansData: {
    status: string;
}): boolean;
