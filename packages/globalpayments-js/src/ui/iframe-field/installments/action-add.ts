import { IframeField } from "../index";
import { bus, options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import { InstallmentPaymentData, VisaInstallmentPaymentData } from "../../../internal/lib/installments/contracts/interfaces";
import { createInstallmentOptions } from "../../../internal/lib/installments/templates/create-installment-options";
import { InstallmentAvailableStatus, InstallmentEvents } from "../../../internal/lib/installments/contracts/enums";
import InstallmentPlansData from "../../../internal/lib/installments/contracts/installment-plans-data";
import InstallmentAction from "../../../internal/lib/installments/contracts/installment-action";
import { Program } from "../../../internal/lib/enums";

export default function addInstallments(
  iframeField: IframeField | undefined,
  installmentPlans: InstallmentPlansData,
  amount: string | undefined,
  installmentCallback: (installment: InstallmentPaymentData | VisaInstallmentPaymentData) => void,
): void {
  if (!options.installments) return;

  const missingRequiredConfig = getMissingRequiredConfigs();
  if (missingRequiredConfig.length) {
    emitMissingRequiredConfigsError(missingRequiredConfig);

    return;
  }
  if (installmentPlans.status === InstallmentAvailableStatus.Available) {
    // const badgeEls = iframeField?.container?.querySelector('.installment-eligibility-badge');
    const badgeEls = document.querySelector('.installment-eligibility-badge');
    if (badgeEls) {
      // Enable/show the badge by removing 'hidden' or setting display
      const badge = badgeEls as HTMLElement;
      badge.style.display = 'flex';
      createInstallmentOptions(iframeField, installmentPlans, amount);
    }
  }

  iframeField?.on(InstallmentEvents.CardInstallmentSendValue, (data?: InstallmentPaymentData | VisaInstallmentPaymentData): void => {
    if (options.installments?.program === Program.LATAM) {
      const { installmentReference = "", installmentId = "" } = data as InstallmentPaymentData || {};
      installmentCallback({ installmentReference, installmentId } as InstallmentPaymentData);
    } else if (options.installments?.program === Program.VIS) {
      const { installmentReference = "", installmentName = "" } = data as VisaInstallmentPaymentData || {};
      installmentCallback({ installmentReference, installmentName } as VisaInstallmentPaymentData);
    }
  });
}
function getMissingRequiredConfigs(): string[] {
  const missingConfig: string[] = [];
  const requiredConfigs = [
    'country',
    'currency',
  ];

  const installmentConfigs = options.installments || {};
  const actualConfigFields = Object.keys(installmentConfigs);
  const actualConfigValues = Object.values(installmentConfigs);

  requiredConfigs.forEach(requiredConfig => {
    const configIndex = actualConfigFields.indexOf(requiredConfig);
    if (configIndex === -1 || !actualConfigValues[configIndex]) {
      missingConfig.push(requiredConfig);
    }
  });

  return missingConfig;
}

function emitMissingRequiredConfigsError(missingConfigs: string[]) {
  const error: IError = {
    error: true,
    reasons: [{
      code: "ERROR",
      message: `Missing required configs: ${missingConfigs.toString()}`,
    }],
  };

  bus.emit('error', error);
}