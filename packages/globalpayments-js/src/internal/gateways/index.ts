import { IDictionary } from "../lib/util";
import * as billpay from "./billpay";
import * as genius from "./genius";
import * as globalpayments from "./globalpayments";
import * as gpApi from "./gp-api";
import * as heartland from "./heartland";
import * as openedge from "./openedge";
import * as transit from "./transit";

export interface ICapabilitiesList {
  apm?: {
    applePay?: boolean;
    googlePay?: boolean;
    clickToPay?: boolean;
  };
  binCheck?: {
    hsaFsa?: boolean;
    surcharge?: boolean;
  };
  consumerAuthentication?: boolean;
  env?: string;
  tokenization?: {
    cardNotPresent?: boolean;
    cardPresent?: boolean;
    eCheck?: boolean;
    gift?: boolean;
  };
}

export interface ISuccess {
  details: {
    accountId?: string;
    accountName?: string;
    accountNumber?: string;
    accountLast4?: string;
    billingAddress?: PaymentAddress;
    canSurcharge?: boolean;
    cardBin?: string;
    cardLast4?: string;
    cardNumber?: string;
    cardSecurityCode?: boolean;
    cardType?: string;
    // matches PaymentRequest spec naming for cardholder name
    cardholderName?: string;
    expiryMonth?: string;
    expiryYear?: string;
    fingerprint?: string;
    fingerprintPresenceIndicator?: string;
    isHsaFsa?: boolean;
    merchantId?: string;
    merchantName?: string;
    orderId?: string;
    reference?: string;
    apmProvider?: string;
  };
  methodName?: string;
  payerEmail?: string;
  payerName?: string;
  payerPhone?: string;
  paymentReference: string;
  requestId?: string;
  shippingAddress?: PaymentAddress;
  shippingOptions?: PaymentShippingOption[];
}

export interface IError {
  error: boolean;
  reasons?: IErrorReason[];
}

export interface IErrorReason {
  code: string;
  message: string;
}

export interface IActions {
  normalizeResponse: (data: IDictionary) => ISuccess | IError;
  // Some gateway implementations need to perform specific
  // window setup to aid functionality.
  setup?: () => any;
  tokenize: (url: string, env: string, data: IDictionary) => Promise<any>;
  validateData: (data: IDictionary) => IErrorReason[];
}

export interface IUrlGenerators {
  assetBaseUrl?: (result: string) => string;
  tokenization: (prod: boolean) => string;
}

export interface IGatewayModule {
  [key: string]: any;
  actions: IActions;
  getEnv: (options: object) => string;
  requiredSettings: string[];
  supports: ICapabilitiesList;
  urls: IUrlGenerators;
}

export interface IGatewayList {
  [key: string]: IGatewayModule;
}

export const availableGateways: IGatewayList = {
  billpay,
  genius,
  globalpayments,
  gpApi,
  heartland,
  openedge,
  transit,
};
