import { InstallmentFees } from "./installment-fees";
import InstallmentTermsAndConditions from "./installment-terms-and-conditions";
/**
 * InstallmentTerm class model.
 */
export default class InstallmentTerm {
    reference: string;
    name: string;
    mode: string;
    count: string;
    gracePeriodCount: string;
    costPercentage: string;
    timeUnit: string;
    totalPlanCost: string;
    currency: string;
    totalAmount: string;
    fees?: InstallmentFees;
    termsAndConditions?: InstallmentTermsAndConditions;
    planAmount: string;
    constructor(_reference: string, _name: string, _mode: string, _count: string, _gracePeriodCount: string, _costPercentage: string, _timeUnit: string, _totalPlanCost: string, _currency: string, _totalAmount: string, _fees: InstallmentFees, _termsAndConditions: InstallmentTermsAndConditions, _planAmount: string);
}
export declare function installmentTermMapper(origin: {
    reference: string;
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
}): InstallmentTerm;
