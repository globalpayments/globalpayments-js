export enum InstallmentEvents {
    CardInstallmentsFieldValidated = "card-installments-field-validated",

    CardInstallmentsRequestStart = "card-installments-request-start",
    CardInstallmentsRequestCompleted = "card-installments-request-completed",
    CardInstallmentsRequestFailed = "card-installments-request-failed",
    CardInstallmentsHide = "card-installments-hide",

    CardInstallmentsRequestData = 'card-installments-request-data',
    CardInstallmentsPassData = 'card-installments-pass-data',
    CardInstallmentsAccumulateData = 'card-installments-accumulate-data',
}

export enum InstallmentAvailableStatus {
    Available = "AVAILABLE",
    NotAvailable = "NOT_AVAILABLE",
}

export enum InstallmentTermModes {
    APR = "APR",
    FEE = "FEE",
}