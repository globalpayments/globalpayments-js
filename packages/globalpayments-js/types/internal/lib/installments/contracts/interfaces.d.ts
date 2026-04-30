export interface InstallmentPaymentData {
    installmentId: string;
    installmentReference: string;
}
export interface IInstallmentAdditionalConfig {
    funding_mode: string;
    max_time_unit_number: number;
    max_amount: number;
}
export interface VisaInstallmentPaymentData {
    installmentName: string;
    installmentReference: string;
}
