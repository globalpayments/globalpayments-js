import {
  AuthenticationRequestType,
  AuthenticationSource,
  ChallengeRequestIndicator,
  ChallengeWindowSize,
  MessageCategory,
  MethodUrlCompletion,
  TransactionStatus,
  TransactionStatusReason,
} from "./enums";
import { IRequestData, IResponseData } from "./lib/make-request";

export type DisplayModeType = "embedded" | "lightbox" | "redirect";

export interface IBrowserData {
  colorDepth: boolean | string;
  javaEnabled: boolean;
  javascriptEnabled: boolean;
  language: boolean | string;
  screenHeight: boolean | number;
  screenWidth: boolean | number;
  time: Date;
  timezoneOffset: number;
  userAgent: boolean | string;
}

export interface IChallengeNotificationData {
  acsTransID?: string;
  challengeCompletionInd?: "Y" | "N";
  messageType?: "CRes";
  messageVersion?: string;
  threeDSServerTransID?: string;
  transStatus?: "Y" | "N";
}

export interface ICheckVersionRequestData extends IRequestData {
  accountId?: string;
  card?: ICreditCardData;
  merchantId?: string;
  methodNotificationUrl?: string;
  methodWindow?: IChallengeWindowOptions;
}

export interface ICheckVersionResponseData extends IResponseData {
  enrolled: boolean;
  methodData?: string;
  methodUrl?: string;
  serverTransactionId?: string;
  versions?: {
    accessControlServer: IMessageVersionRange;
    directoryServer: IMessageVersionRange;
  };
}

export interface IChallengeWindowOptions {
  displayMode?: DisplayModeType;
  encodedChallengeRequest?: string;
  hide?: boolean;
  origin?: string;
  requestUrl?: string;
  response?: IMessageEventData;
  target?: string | Element;
  timeout?: number;
  windowSize?: ChallengeWindowSize;
}

export interface ICreditCardData {
  cardHolderName?: string;
  customerReference?: string;
  cvn?: string;
  expMonth?: string | number;
  expYear?: string | number;
  number?: string;
  reference?: string;
}

export interface IIframeData {
  iframe?: Element;
  origin?: string;
  timeout?: number;
}

export interface IInitiateAuthenticationRequestData extends IRequestData {
  accountId?: string;
  authenticationRequestType?: AuthenticationRequestType;
  authenticationSource?: AuthenticationSource;
  browserData: IBrowserData;
  card?: ICreditCardData;
  challengeNotificationUrl?: string;
  challengeRequestIndicator?: ChallengeRequestIndicator;
  challengeWindow: IChallengeWindowOptions;
  merchantId?: string;
  merchantContactUrl?: string;
  messageCategory?: MessageCategory;
  methodUrlComplete?: MethodUrlCompletion;
  serverTransactionId?: string;
}

export interface IInitiateAuthenticationResponseData extends IResponseData {
  acsTransactionId?: string;
  authenticationSource?: AuthenticationSource;
  authenticationRequestType?: AuthenticationRequestType;
  cardholderResponseInfo?: string;
  challenge?: IChallengeWindowOptions;
  challengeMandated?: string;
  deviceRenderOptions?: string;
  dsTransactionId?: string;
  messageCategory?: string;
  messageExtension?: IMessageExtension[];
  messageVersion?: string;
  mpi?: {
    authenticationValue?: string;
    eci?: string;
  };
  serverTransactionId?: string;
  status?: TransactionStatus;
  statusReason?: TransactionStatusReason;
}

export interface IMessageEventData {
  event: "methodNotification" | "challengeNotification";
  data: IChallengeNotificationData | IMethodNotificationData;
}

export interface IMessageExtension {
  criticalityIndicator?: boolean;
  data?: object;
  id?: string;
  name?: string;
}

export interface IMessageVersionRange {
  end: string;
  start: string;
}

export interface IMethodNotificationData {
  threeDSServerTransID?: string;
}
