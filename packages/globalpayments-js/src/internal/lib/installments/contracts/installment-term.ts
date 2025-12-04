import InstallmentTermFees, { installmentTermFeesMapper } from "./installment-term-fees";

/**
 * InstallmentTerm class model.
 */
export default class InstallmentTerm {
    public reference: string;
    public name: string;
    public mode: string;
    public count: string;
    public gracePeriodCount: string;

    constructor(
        _reference: string,
        _name: string,
        _mode: string,
        _count: string,
        _gracePeriodCount: string,
    ) {
        this.reference = _reference;
        this.name = _name;
        this.mode = _mode;
        this.count = _count;
        this.gracePeriodCount = _gracePeriodCount;
    }
}

export function installmentTermMapper(origin: {reference: string;
    name: string;
    mode: string;
    count: string;
    grace_period_count: string;
}): InstallmentTerm {
    return {
        reference: origin.reference,
        name: origin.name,
        mode: origin.mode,
        count: origin.count,
        gracePeriodCount: origin.grace_period_count,
    };
}