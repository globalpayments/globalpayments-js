import { ClientFunction, Selector } from "testcafe";

export const getVersionCheckData = ClientFunction(
  () => (window as any).__versionCheckData,
);
export const getInitiateAuthenticationData = ClientFunction(
  () => (window as any).__initiateAuthenticationData,
);
export const getCurrentDocument = () => Selector("body");
export const getIframe = () =>
  Selector('iframe[id*="GlobalPayments-3DSecure"]');
export const getOverlay = () => Selector('div[id*="GlobalPayments-overlay"]');
