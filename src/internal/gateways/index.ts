import { IDictionary } from "../lib/util";
import * as genius from "./genius";
import * as globalpayments from "./globalpayments";
import * as heartland from "./heartland";
import * as openedge from "./openedge";
import * as transit from "./transit";

export interface ICapabilitiesList {
  apm?: {
    androidPay?: boolean;
    applePay?: boolean;
  };
  consumerAuthentication?: boolean;
  eCheck?: boolean;
  env?: string;
  gift?: boolean;
  tokenization?: {
    cardNotPresent?: boolean;
    cardPresent?: boolean;
    eCheck?: boolean;
    gift?: boolean;
  };
}

export interface ISuccess {
  details: {
    accountNumber?: string;
    accountLast4?: string;
    billingAddress?: PaymentAddress;
    cardBin?: string;
    cardLast4?: string;
    cardNumber?: string;
    cardSecurityCode?: boolean;
    cardType?: string;
    // matches PaymentRequest spec naming for cardholder name
    cardholderName?: string;
    expiryMonth?: string;
    expiryYear?: string;
    orderId?: string;
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
  setup?: () => any;
  tokenize: (url: string, data: IDictionary) => Promise<any>;
  validateData: (data: IDictionary) => IErrorReason[];
}

export interface IUrlGenerators {
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
  genius,
  globalpayments,
  heartland,
  openedge,
  transit,
};
