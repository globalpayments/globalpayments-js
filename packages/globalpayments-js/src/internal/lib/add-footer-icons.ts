import getAssetBaseUrl from "./asset-base-url";
import {IUIFormOptions} from "../../ui/form";
import {getCurrentLanguage} from "./detectLanguage";
import translations from "./translations/translations";
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
  const language = getCurrentLanguage();

  const shield = document.createElement("div");
  shield.className = formOptions.prefix + "shield";

  const sslLogo = document.createElement('div');
  sslLogo.className = "ssl-text-logo";

  const sslImage = document.createElement("img");
  sslImage.setAttribute('src', `${assetUrl}images/ssl_logo_ico.svg`);
  sslImage.setAttribute('alt', translations[language].footer['ssl-msg-alt']);
  sslImage.className = "ssl-logo_ico";

  const text = document.createElement('span');
  text.innerHTML = translations[language].footer['ssl-msg'];
  text.className = "ssl-msg";

  sslLogo.appendChild(sslImage);
  sslLogo.appendChild(text);
  shield.appendChild(sslLogo);
  target.appendChild(shield);

  const logo = document.createElement("div");
  logo.className = formOptions.prefix + "logo";

  const securityMsg = document.createElement('span');
  securityMsg.className = "security-msg";
  securityMsg.innerHTML = translations[language].footer['security-msg'];

  const securityImage = document.createElement("img");
  securityImage.setAttribute('src', `${assetUrl}images/realex-grey.png`);
  securityImage.setAttribute('alt', translations[language].footer['security-msg-alt']);

  logo.appendChild(securityMsg);
  logo.appendChild(securityImage);
  target.appendChild(logo);
}