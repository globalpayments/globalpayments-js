/**
 * InstallmentTermFees class model.
 */
export default class InstallmentTermFees {
    currency: string;
    totalAmount: string;
    fixedAmount: string;
    monthlyAmount: string;
    constructor(_currency: string, _totalAmount: string, _fixedAmount: string, _monthlyAmount: string);
}
export declare function installmentTermFeesMapper(origin: {
    currency: string;
    total_amount: string;
    fixed_amount: string;
    monthly_amount: string;
}): InstallmentTermFees;
