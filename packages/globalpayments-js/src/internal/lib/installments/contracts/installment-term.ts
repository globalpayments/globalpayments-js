import { InstallmentFees } from "./installment-fees";
import InstallmentTermFees, { installmentTermFeesMapper } from "./installment-term-fees";
import InstallmentTermsAndConditions from "./installment-terms-and-conditions";

/**
 * InstallmentTerm class model.
 */
export default class InstallmentTerm {
    public reference: string;
    public name: string;
    public mode: string;
    public count: string;
    public gracePeriodCount: string;
    public costPercentage: string;
    public timeUnit: string;
    public totalPlanCost: string;
    public currency : string;
    public totalAmount: string;
    public fees?: InstallmentFees;
    public termsAndConditions? : InstallmentTermsAndConditions;
    public planAmount: string;
    constructor(
        _reference: string,
        _name: string,
        _mode: string,
        _count: string,
        _gracePeriodCount: string,
        _costPercentage: string,
        _timeUnit: string,
        _totalPlanCost: string,
        _currency: string,
        _totalAmount: string,
        _fees: InstallmentFees,
        _termsAndConditions: InstallmentTermsAndConditions,
        _planAmount: string
    ) {
        this.reference = _reference;
        this.name = _name;
        this.mode = _mode;
        this.count = _count;
        this.gracePeriodCount = _gracePeriodCount;
        this.costPercentage = _costPercentage;
        this.timeUnit = _timeUnit;
        this.totalPlanCost = _totalPlanCost;
        this.currency = _currency;
        this.totalAmount = _totalAmount;
        this.fees = _fees;
        this.termsAndConditions = _termsAndConditions;
        this.planAmount = _planAmount;
    }
}

export function installmentTermMapper(origin: {reference: string;
    name: string;
    mode: string;
    count: string;
    grace_period_count: string;
    cost_percentage: string;
    time_unit: string;
    total_plan_cost: string;
    currency: string;
    total_amount: string;
    fees?: InstallmentFees;
    terms_and_conditions?: InstallmentTermsAndConditions;
    plan_amount: string;
}): InstallmentTerm {
    return {
        reference: origin.reference,
        name: origin.name,
        mode: origin.mode,
        count: origin.count,
        gracePeriodCount: origin.grace_period_count,
        costPercentage: origin.cost_percentage,
        timeUnit: origin.time_unit,
        totalPlanCost: origin.total_plan_cost,
        currency: origin.currency,
        totalAmount: origin.total_amount,
        fees: origin.fees,
        termsAndConditions: origin.terms_and_conditions,
        planAmount: origin.plan_amount
    };
}