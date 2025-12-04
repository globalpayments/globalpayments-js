import { IframeField } from "../index";
import { bus, options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import { InstallmentPaymentData } from "../../../internal/lib/installments/contracts/interfaces";
import { createInstallmentOptions } from "../../../internal/lib/installments/templates/create-installment-options";
import { InstallmentAvailableStatus, InstallmentEvents } from "../../../internal/lib/installments/contracts/enums";
import InstallmentPlansData from "../../../internal/lib/installments/contracts/installment-plans-data";
import InstallmentAction from "../../../internal/lib/installments/contracts/installment-action";

export default function addInstallments(
  iframeField: IframeField | undefined,
  installmentPlans: InstallmentPlansData,
  installmentCallback: (installment: InstallmentPaymentData) => void,
): void {
  if (!options.installments) return;

  const missingRequiredConfig = getMissingRequiredConfigs();
  if (missingRequiredConfig.length) {
    emitMissingRequiredConfigsError(missingRequiredConfig);

    return;
  }
  if (installmentPlans.status === InstallmentAvailableStatus.Available) {
    const badgeEls = iframeField?.container?.querySelector('.installment-eligibility-badge');
    if (badgeEls) {
      // Enable/show the badge by removing 'hidden' or setting display
      const badge = badgeEls as HTMLElement;
      badge.style.display = 'flex';
      createInstallmentOptions(iframeField, installmentPlans);
    }
  }

  iframeField?.on(InstallmentEvents.CardInstallmentSendValue, (data?: InstallmentPaymentData) : void => {
    const { installmentReference = "", installmentId = "" } = data || {};
    installmentCallback({ installmentReference, installmentId });
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