export enum InstallmentEvents {
    CardInstallmentsRequestStart = "card-installments-request-start",
    CardInstallmentsRequestCompleted = "card-installments-request-completed",
    CardInstallmentsHide = "card-installments-hide",
}

export enum InstallmentAvailableStatus {
    Available = "AVAILABLE",
    NotAvailable = "NOT_AVAILABLE",
}

export enum InstallmentTermModes {
    APR = "APR",
    FEE = "FEE",
}