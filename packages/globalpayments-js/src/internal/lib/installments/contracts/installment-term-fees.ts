/**
 * InstallmentTermFees class model.
 */
export default class InstallmentTermFees {
    public currency: string;
    public totalAmount: string;
    public fixedAmount: string;
    public monthlyAmount: string;

    constructor(
        _currency: string,
        _totalAmount: string,
        _fixedAmount: string,
        _monthlyAmount: string
    ) {
        this.currency = _currency;
        this.totalAmount = _totalAmount;
        this.fixedAmount = _fixedAmount;
        this.monthlyAmount = _monthlyAmount;
    }
}

export function installmentTermFeesMapper(origin: {
    currency: string,
    total_amount: string,
    fixed_amount: string,
    monthly_amount: string
}): InstallmentTermFees {
    return {
        currency: origin.currency,
        totalAmount: origin.total_amount,
        fixedAmount: origin.fixed_amount,
        monthlyAmount: origin.monthly_amount,
    };
}