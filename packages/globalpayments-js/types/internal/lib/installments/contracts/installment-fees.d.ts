/**
 * FeeInfo model for each fee_info entry.
 */
export interface FeeInfo {
    type: string;
    interest_rate: string;
    flat_amount: string;
}
/**
 * InstallmentFees model for the fees object from the API.
 */
export interface InstallmentFees {
    fee_info: FeeInfo[];
    total_amount: string;
    total_subsequent_amount: string;
    subsequent_amount: string;
    total_upfront_amount: string;
    upfront_amount: string;
}
