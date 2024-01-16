import { QRCodePaymentsProviderBrands, QRCodePaymentsWeChatProviderBrands } from "../../internal/lib/enums";
import { IPaymentMethodConfiguration, IPaymentMethodConfigurationNormalized } from "./contracts";

export const normalizePaymentMethodConfigurations = (paymentMethodConfigurations: IPaymentMethodConfiguration): IPaymentMethodConfigurationNormalized => {
  const { provider } = paymentMethodConfigurations;
  return {
      ...paymentMethodConfigurations,
      provider: provider.brand,
  };
}

export const validateProviderBrand = (providerBrand: string): string => {
  return (
    [
      QRCodePaymentsWeChatProviderBrands.WeChatBrand,
      QRCodePaymentsWeChatProviderBrands.WeChatMethodResponse,
      QRCodePaymentsWeChatProviderBrands.WeChatAccountResponse
    ].some(pb => pb.toLocaleLowerCase() === providerBrand.toLocaleLowerCase())
  ) ? QRCodePaymentsProviderBrands.WeChat
  : providerBrand;
}