import "globalpayments-lib/polyfills";

// re-exports
export * from "./enums";
export * from "./interfaces";

// local imports
import {
  AuthenticationRequestType,
  AuthenticationSource,
  ChallengeRequestIndicator,
  TransactionStatus,
  colorDepth,
  messageCategoryFromAuthenticationRequestType,
} from "./enums";
import {
  IBrowserData,
  IChallengeNotificationData,
  IChallengeWindowOptions,
  ICheckVersionRequestData,
  ICheckVersionResponseData,
  IInitiateAuthenticationRequestData,
  IInitiateAuthenticationResponseData,
  IMethodNotificationData,
} from "./interfaces";
import { GPError } from "./lib/gp-error";
import { handleNotificationMessageEvent } from "./lib/handle-notification-message-event";
import { makeRequest } from "./lib/make-request";
import { postToIframe } from "./lib/post-to-iframe";

/**
 * Retrieves client browser runtime data.
 */
export function getBrowserData(): IBrowserData {
  const now = new Date();
  return {
    colorDepth: screen && colorDepth(screen.colorDepth),
    javaEnabled: navigator && navigator.javaEnabled(),
    javascriptEnabled: true, // if this is running, js is enabled
    language: navigator && navigator.language,
    screenHeight: screen && screen.height,
    screenWidth: screen && screen.width,
    time: now,
    timezoneOffset: now.getTimezoneOffset() / 60,
    userAgent: navigator && navigator.userAgent,
  };
}

/**
 * Facilitates backend request to merchant integration to check the enrolled 3DS version for the consumer's card.
 *
 * @param endpoint Merchant integration endpoint responsible for performing the version check
 * @param data Request data to aid in version check request
 * @throws When an error occurred during the request
 */
export async function checkVersion(
  endpoint: string,
  data?: ICheckVersionRequestData,
): Promise<ICheckVersionResponseData> {
  data = data || {};

  try {
    const response = (await makeRequest(
      endpoint,
      data,
    )) as ICheckVersionResponseData;

    return await handle3dsVersionCheck(response, data.methodWindow);
  } catch (e) {
    let reasons = [{ code: e.name, message: e.message }];
    if (e.reasons) {
      reasons = reasons.concat(e.reasons);
    }
    throw new GPError(reasons);
  }
}

/**
 * Facilitates backend request to merchant integration to initiate 3DS 2.0 authentication workflows with the consumer.
 *
 * @param endpoint Merchant integration endpoint responsible for initiating the authentication request
 * @param data Request data to aid in initiating authentication
 * @throws When an error occurred during the request
 */
export async function initiateAuthentication(
  endpoint: string,
  data: IInitiateAuthenticationRequestData,
): Promise<IInitiateAuthenticationResponseData> {
  try {
    data.authenticationSource =
      data.authenticationSource || AuthenticationSource.Browser;
    data.authenticationRequestType =
      data.authenticationRequestType ||
      AuthenticationRequestType.PaymentTransaction;
    data.messageCategory =
      data.messageCategory ||
      messageCategoryFromAuthenticationRequestType(
        data.authenticationRequestType,
      );
    data.challengeRequestIndicator =
      data.challengeRequestIndicator || ChallengeRequestIndicator.NoPreference;
    // still needs ip address and accept header from server-side
    data.browserData = data.browserData || getBrowserData();

    const response = (await makeRequest(
      endpoint,
      data,
    )) as IInitiateAuthenticationResponseData;

    return await handleInitiateAuthentication(response, data.challengeWindow);
  } catch (e) {
    let reasons = [{ code: e.name, message: e.message }];
    if (e.reasons) {
      reasons = reasons.concat(e.reasons);
    }
    throw new GPError(reasons);
  }
}

/**
 * Handles response from merchant integration endpoint for the version check request. When a card is enrolled and a
 * method URL is present, a hidden iframe to the method URL will be created to handle device fingerprinting
 * requirements.
 *
 * @param data Version check data from merchant integration endpoint
 * @param options Configuration options for the method window
 * @throws When a card is not enrolled
 */
export async function handle3dsVersionCheck(
  data: ICheckVersionResponseData,
  options?: IChallengeWindowOptions,
) {
  if (!data.enrolled) {
    throw new Error("Card not enrolled");
  }

  options = options || {};
  options.hide = typeof options.hide === "undefined" ? true : options.hide;
  options.timeout =
    typeof options.timeout === "undefined" ? 30 * 1000 : options.timeout;

  if (data.methodUrl) {
    await postToIframe(
      data.methodUrl,
      [{ name: "threeDSMethodData", value: data.methodData }],
      options,
    );
  }

  return data;
}
/**
 * Handles response from merchant integration endpoint for initiating 3DS 2.0 authentication flows with consumer. If a
 * challenge is mandated, an iframe will be created for the issuer's necessary challenge URL.
 *
 * @param data Initiate authentication data from merchant integration endpoint
 * @param options Configuration options for the challenge window
 * @throws When a challenge is mandated but no challenge URL was supplied
 * @throws When an error occurred during the challenge request
 */
export async function handleInitiateAuthentication(
  data: IInitiateAuthenticationResponseData,
  options: IChallengeWindowOptions,
) {
  if (
    data.challengeMandated ||
    data.status === TransactionStatus.ChallengeRequired
  ) {
    data.challenge = data.challenge || {};

    if (!data.challenge.requestUrl) {
      throw new Error("Invalid challenge state. Missing challenge URL");
    }

    const response = await postToIframe(
      data.challenge.requestUrl,
      [
        { name: "creq", value: data.challenge.encodedChallengeRequest },
        // TODO: support session data
      ],
      options,
    );

    data.challenge.response = response;
  }

  return data;
}

/**
 * Assists with notifying the parent window of challenge status
 *
 * @param data Raw data from the challenge notification
 * @param origin Target origin for the message. Default is `window.location.origin`.
 */
export function handleChallengeNotification(
  data: IChallengeNotificationData,
  origin?: string,
) {
  handleNotificationMessageEvent("challengeNotification", data, origin);
}

/**
 * Assists with notifying the parent window of method status
 *
 * @param data Raw data from the method notification
 * @param origin Target origin for the message. Default is `window.location.origin`.
 */
export function handleMethodNotification(
  data: IMethodNotificationData,
  origin?: string,
) {
  handleNotificationMessageEvent("methodNotification", data, origin);
}
