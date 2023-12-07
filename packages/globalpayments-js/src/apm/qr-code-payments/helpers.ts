import { IPaymentMethodConfiguration, IPaymentMethodConfigurationNormalized } from "./contracts";

export const normalizePaymentMethodConfigurations = (paymentMethodConfigurations: IPaymentMethodConfiguration): IPaymentMethodConfigurationNormalized => {
  const { provider } = paymentMethodConfigurations;
  return {
      ...paymentMethodConfigurations,
      provider: provider.brand,
  };
}
