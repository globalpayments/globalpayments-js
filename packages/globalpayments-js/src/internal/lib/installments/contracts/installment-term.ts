import InstallmentTermFees, { installmentTermFeesMapper } from "./installment-term-fees";

/**
 * InstallmentTerm class model.
 */
export default class InstallmentTerm {
    public reference: string;
    public timeUnitAmount: string;
    public currency: string;
    public mode: string;
    public totalTimeUnitCount: string;
    public interestRate: string;
    public totalAmount?: string;
    public description: string;
    public expirationDate: string;
    public expirationInterestRate: string;
    public timeUnit: string;
    public termsAndConditionsUrl: string;
    public fees?: InstallmentTermFees;

    constructor(
        _reference: string,
        _timeUnitAmount: string,
        _currency: string,
        _mode: string,
        _totalTimeUnitCount: string,
        _interestRate: string,
        _totalAmount: string,
        _description: string,
        _expirationDate: string,
        _expirationInterestRate: string,
        _timeUnit: string,
        _termsAndConditionsUrl: string,
        _fees?: InstallmentTermFees,
    ) {
        this.reference = _reference;
        this.timeUnitAmount = _timeUnitAmount;
        this.currency = _currency;
        this.mode = _mode;
        this.totalTimeUnitCount = _totalTimeUnitCount;
        this.interestRate = _interestRate;
        this.totalAmount = _totalAmount;
        this.description = _description;
        this.expirationDate = _expirationDate;
        this.expirationInterestRate = _expirationInterestRate;
        this.timeUnit = _timeUnit;
        this.termsAndConditionsUrl = _termsAndConditionsUrl;
        this.fees = _fees;
    }
}

export function installmentTermMapper(origin: {
    reference: string,
    time_unit_amount: string,
    currency: string,
    mode: string,
    total_time_unit_count: string,
    interest_rate: string,
    total_amount: string,
    description: string,
    expiration_date: string,
    expiration_interest_rate: string,
    terms_and_conditions_url: string,
    time_unit: string,
    fees?: any,
}): InstallmentTerm {
    return {
        reference: origin.reference,
        timeUnitAmount: origin.time_unit_amount,
        currency: origin.currency,
        mode: origin.mode,
        totalTimeUnitCount: origin.total_time_unit_count,
        interestRate: origin.interest_rate,
        totalAmount: origin.total_amount,
        description: origin.description,
        expirationDate: origin.expiration_date,
        expirationInterestRate: origin.expiration_interest_rate,
        timeUnit: origin.time_unit,
        termsAndConditionsUrl: origin.terms_and_conditions_url,
        fees: origin.fees ? installmentTermFeesMapper(origin.fees) : undefined,
    };
}