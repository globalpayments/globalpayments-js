import { IframeField } from "../index";
import { InstallmentPaymentData } from "../../../internal/lib/installments/contracts/interfaces";
import InstallmentPlansData from "../../../internal/lib/installments/contracts/installment-plans-data";
export default function addInstallments(iframeField: IframeField | undefined, installmentPlans: InstallmentPlansData, installmentCallback: (installment: InstallmentPaymentData) => void): void;
