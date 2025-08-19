import getAssetBaseUrl from "./asset-base-url";
import {IUIFormOptions} from "../../ui/form";
import {getCurrentLanguage} from "./detectLanguage";
import translations from "./translations/translations";
import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../common/html-element";

/**
 * Adds the branded footer icons:
 *  - SSL Encrypted Logo
 *  - Branded specific Logo
 *  - Security Emblem text ("Securely processed by Global Payments")
 *
 * @param formOptions
 * @param footer
 *
 */
export function addFooterBrandedIcons(
  formOptions: IUIFormOptions,
  footer: HTMLElement
) {
  const assetUrl = getAssetBaseUrl();
  const language = getCurrentLanguage();

  const footerContainerDiv = createHtmlDivElement({
    id: `${formOptions.prefix}footer`,
    className: `${formOptions.prefix}footer`,
  });

  // SSL Encrypted Logo
  const sslEncryptedContainerDiv = createHtmlDivElement({
    className: `${formOptions.prefix}shield`,
  });

  const sslLogoContainerDiv = createHtmlDivElement({
    className: "ssl-text-logo",
  });

  const sslImage = createHtmlImageElement({
    src: `${assetUrl}images/Encrypted_Badge.png.png`,
    alt: translations[language].footer['ssl-msg-alt'],
    className: "ssl-logo_ico",
  });
  sslLogoContainerDiv.appendChild(sslImage);

  const sslEncryptedTextSpan = createHtmlSpanElement({
    textContent: translations[language].footer['ssl-msg'],
    className: "ssl-msg",
  });
  sslLogoContainerDiv.appendChild(sslEncryptedTextSpan);

  sslEncryptedContainerDiv.appendChild(sslLogoContainerDiv);
  footerContainerDiv.appendChild(sslEncryptedContainerDiv);

  // Branded specific Logo
  const brandLogoDiv = createHtmlDivElement({
    id: 'footer-branded-logo-image',
    className: 'footer-branded-logo-image',
    attributes: [
      { role: 'img' },
      { 'aria-label': 'Brand logo image' },
    ],
  });
  footerContainerDiv.appendChild(brandLogoDiv);

  // Security Emblem text
  const securityEmblemLogoContainerDiv = createHtmlDivElement({
    className: `${formOptions.prefix}logo`,
  });
  const securityEmblemTextSpan = createHtmlSpanElement({
    textContent: translations[language].footer['security-msg'],
    className: "security-msg",
  });
  securityEmblemLogoContainerDiv.appendChild(securityEmblemTextSpan);
  footerContainerDiv.appendChild(securityEmblemLogoContainerDiv);

  footer.appendChild(footerContainerDiv);
}