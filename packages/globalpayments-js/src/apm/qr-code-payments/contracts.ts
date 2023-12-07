export interface IQRCodePaymentsConfiguration {
  enabled?: boolean,
  allowedPaymentMethods?: IQRCodePaymentsAllowedPaymentMethod[];
}

export interface IQRCodePaymentsAllowedPaymentMethod {
  provider: string;
  image: string;
}

export interface IPaymentMethodConfiguration {
  provider: {
      brand: string;
  };
  image: string;
}

export interface IPaymentMethodConfigurationNormalized extends Omit<IPaymentMethodConfiguration, 'provider'> {
  provider: string;
}