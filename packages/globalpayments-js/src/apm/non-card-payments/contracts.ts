export interface IApmConfiguration {
  allowedPaymentMethods?: PaymentMethod[];
}

export interface PaymentMethod {
  provider: string;
  category?: string;
  image?: string;
}
