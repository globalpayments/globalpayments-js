import { IPaymentMethodConfiguration, IPaymentMethodConfigurationNormalized } from "./contracts";
export declare const normalizePaymentMethodConfigurations: (paymentMethodConfigurations: IPaymentMethodConfiguration) => IPaymentMethodConfigurationNormalized;
export declare const validateProviderBrand: (providerBrand: string) => string;
