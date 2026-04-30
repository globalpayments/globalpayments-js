import { IframeField } from "../index";
import { InstallmentPaymentData, VisaInstallmentPaymentData } from "../../../internal/lib/installments/contracts/interfaces";
import InstallmentPlansData from "../../../internal/lib/installments/contracts/installment-plans-data";
export default function addInstallments(iframeField: IframeField | undefined, installmentPlans: InstallmentPlansData, amount: string | undefined, installmentCallback: (installment: InstallmentPaymentData | VisaInstallmentPaymentData) => void): void;
