/**
 * InstallmentTerm class model.
 */
export default class InstallmentTerm {
    reference: string;
    name: string;
    mode: string;
    count: string;
    gracePeriodCount: string;
    constructor(_reference: string, _name: string, _mode: string, _count: string, _gracePeriodCount: string);
}
export declare function installmentTermMapper(origin: {
    reference: string;
    name: string;
    mode: string;
    count: string;
    grace_period_count: string;
}): InstallmentTerm;
