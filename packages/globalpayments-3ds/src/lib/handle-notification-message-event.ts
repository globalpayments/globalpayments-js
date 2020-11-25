import {
  IChallengeNotificationData,
  IMethodNotificationData,
} from "../interfaces";

export function handleNotificationMessageEvent(
  event: string,
  data: IChallengeNotificationData | IMethodNotificationData,
  origin?: string,
) {
  if (window.parent !== window) {
    window.parent.postMessage(
      { data, event },
      origin || window.location.origin,
    );
  }
}
