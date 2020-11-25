import { IChallengeWindowOptions } from "./interfaces";

export enum AuthenticationSource {
  Browser = "BROWSER",
  MobileSDK = "MOBILE_SDK",
  StoredRecurring = "STORED_RECURRING",
}

export enum AuthenticationRequestType {
  AddCard = "ADD_CARD",
  CardholderVerification = "CARDHOLDER_VERIFICATION",
  InstalmentTransaction = "INSTALMENT_TRANSACTION",
  MaintainCard = "MAINTAIN_CARD",
  PaymentTransaction = "PAYMENT_TRANSACTION",
  RecurringTransaction = "RECURRING_TRANSACTION",
}

export enum ChallengeRequestIndicator {
  ChallengeMandated = "CHALLENGE_MANDATED",
  ChallengePreferred = "CHALLENGE_PREFERRED",
  NoChallengeRequested = "NO_CHALLENGE_REQUESTED",
  NoPreference = "NO_PREFERENCE",
}

export enum ChallengeWindowSize {
  FullScreen = "FULL_SCREEN",
  Windowed250x400 = "WINDOWED_250X400",
  Windowed390x400 = "WINDOWED_390X400",
  Windowed500x600 = "WINDOWED_500X600",
  Windowed600x400 = "WINDOWED_600X400",
}

export enum MessageCategory {
  NonPayment = "NON_PAYMENT_AUTHENTICATION",
  Payment = "PAYMENT_AUTHENTICATION",
}

export enum MethodUrlCompletion {
  Unavailable = "UNAVAILABLE",
  No = "NO",
  Yes = "YES",
}

export enum TransactionStatus {
  AuthenticationAttemptedButNotSuccessful = "AUTHENTICATION_ATTEMPTED_BUT_NOT_SUCCESSFUL",
  AuthenticationCouldNotBePerformed = "AUTHENTICATION_COULD_NOT_BE_PERFORMED",
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  AuthenticationIssuerRejected = "AUTHENTICATION_ISSUER_REJECTED",
  AuthenticationSuccessful = "AUTHENTICATION_SUCCESSFUL",
  ChallengeRequired = "CHALLENGE_REQUIRED",
}

export enum TransactionStatusReason {
  CardAuthenticationFailed = "CARD_AUTHENTICATION_FAILED",
  UnknownDevice = "UNKNOWN_DEVICE",
  UnsupportedDevice = "UNSUPPORTED_DEVICE",
  ExceedsAuthenticationFrequencyLimit = "EXCEEDS_AUTHENTICATION_FREQUENCY_LIMIT",
  ExpiredCard = "EXPIRED_CARD",
  InvalidCardNumber = "INVALID_CARD_NUMBER",
  InvalidTransaction = "INVALID_TRANSACTION",
  NoCardRecord = "NO_CARD_RECORD",
  SecurityFailure = "SECURITY_FAILURE",
  StolenCard = "STOLEN_CARD",
  SuspectedFraud = "SUSPECTED_FRAUD",
  TransactionNotPermittedToCardholder = "TRANSACTION_NOT_PERMITTED_TO_CARDHOLDER",
  CardholderNotEnrolledInService = "CARDHOLDER_NOT_ENROLLED_IN_SERVICE",
  TransactionTimedOutAtTheAcs = "TRANSACTION_TIMED_OUT_AT_THE_ACS",
  LowConfidence = "LOW_CONFIDENCE",
  MediumConfidence = "MEDIUM_CONFIDENCE",
  HighConfidence = "HIGH_CONFIDENCE",
  VeryHighConfidence = "VERY_HIGH_CONFIDENCE",
  ExceedsAcsMaximumChallenges = "EXCEEDS_ACS_MAXIMUM_CHALLENGES",
  NonPaymentTransactionNotSupported = "NON_PAYMENT_TRANSACTION_NOT_SUPPORTED",
  ThreeriTransactionNotSupported = "THREERI_TRANSACTION_NOT_SUPPORTED",
}

export function colorDepth(value: number) {
  let result = "";
  switch (value) {
    case 1:
      return "ONE_BIT";
    case 2:
      result += "TWO";
      break;
    case 4:
      result += "FOUR";
      break;
    case 8:
      result += "EIGHT";
      break;
    case 15:
      result += "FIFTEEN";
      break;
    case 16:
      result += "SIXTEEN";
      break;
    case 24:
      result += "TWENTY_FOUR";
      break;
    case 32:
      result += "THIRTY_TWO";
      break;
    case 48:
      result += "FORTY_EIGHT";
      break;
    default:
      throw new Error(`Unknown color depth '${value}'`);
  }
  return `${result}_BITS`;
}

export function dimensionsFromChallengeWindowSize(
  options: IChallengeWindowOptions,
) {
  let height = 0;
  let width = 0;

  switch ((options as any).size || options.windowSize) {
    case ChallengeWindowSize.Windowed250x400:
      height = 250;
      width = 400;
      break;
    case ChallengeWindowSize.Windowed390x400:
      height = 390;
      width = 400;
      break;
    case ChallengeWindowSize.Windowed500x600:
      height = 500;
      width = 600;
      break;
    case ChallengeWindowSize.Windowed600x400:
      height = 600;
      width = 400;
      break;
    default:
      break;
  }
  return { height, width };
}

export function messageCategoryFromAuthenticationRequestType(
  authenticationRequestType: AuthenticationRequestType,
) {
  switch (authenticationRequestType) {
    case AuthenticationRequestType.AddCard:
    case AuthenticationRequestType.CardholderVerification:
    case AuthenticationRequestType.MaintainCard:
      return MessageCategory.NonPayment;
    case AuthenticationRequestType.InstalmentTransaction:
    case AuthenticationRequestType.PaymentTransaction:
    case AuthenticationRequestType.RecurringTransaction:
    default:
      return MessageCategory.Payment;
  }
}
