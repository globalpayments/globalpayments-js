import {IApmConfiguration} from "../non-card-payments/contracts";

export interface IQRCodePaymentsConfiguration extends IApmConfiguration {
  enabled?: boolean;
}

export interface IPaymentMethodConfiguration extends IApmConfiguration {
  provider: {
    brand: string;
  };
  image: string;
}

export interface IPaymentMethodConfigurationNormalized extends Omit<IPaymentMethodConfiguration, 'provider'> {
  provider: string;
}