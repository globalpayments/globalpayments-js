import getAssetBaseUrl from "./asset-base-url";
import {IUIFormOptions} from "../../ui/form";
/**
 * Adds the icons for "256-bit SSL encrypted" and "Securely processed by Global Payments"
 *
 * @param formOptions
 * @param target
 *
 */
export function addFooterIcons(
  formOptions: IUIFormOptions,
  target: HTMLElement
) {
  const assetUrl = getAssetBaseUrl();

  const shield = document.createElement("div");
  shield.className = formOptions.prefix + "shield";

  const sslLogo = document.createElement('div');
  sslLogo.className = "ssl-text-logo";

  const sslImage = document.createElement("img");
  sslImage.setAttribute('src', `${assetUrl}images/ssl_logo_ico.svg`);
  sslImage.setAttribute('alt', '256-bit SSL encrypted logo');
  sslImage.className = "ssl-logo_ico";

  const text = document.createElement('span');
  text.innerHTML = "256-bit SSL<br>encrypted";
  text.className = "ssl-msg";

  sslLogo.appendChild(sslImage);
  sslLogo.appendChild(text);
  shield.appendChild(sslLogo);
  target.appendChild(shield);

  const logo = document.createElement("div");
  logo.className = formOptions.prefix + "logo";

  const securityMsg = document.createElement('span');
  securityMsg.className = "security-msg";
  securityMsg.innerHTML = "Securely processed by<br>Global Payments";

  const securityImage = document.createElement("img");
  securityImage.setAttribute('src', `${assetUrl}images/realex-grey.png`);
  securityImage.setAttribute('alt', "Secured by Global Payments");

  logo.appendChild(securityMsg);
  logo.appendChild(securityImage);
  target.appendChild(logo);
}