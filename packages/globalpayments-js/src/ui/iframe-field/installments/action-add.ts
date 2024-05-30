import { IframeField } from "../index";
import { bus, options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import { installmentPlansDataMapper } from "../../../internal/lib/installments/contracts/installment-plans-data";
import { InstallmentPaymentData, InstallmentsHandler } from "../../../internal/lib/installments/installments-handler";

export default function addInstallments(
    iframeField: IframeField | undefined,
    installmentPlans: any,
    tokenizationCallback: (installment: InstallmentPaymentData) => void,
  ): void {
  if (!options.installments) return;

  const missingRequiredConfig = getMissingRequiredConfigs();
  if (missingRequiredConfig.length) {
    emitMissingRequiredConfigsError(missingRequiredConfig);

    return;
  }

  new InstallmentsHandler(
    iframeField,
    installmentPlansDataMapper(installmentPlans),
    tokenizationCallback,
  ).init();
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