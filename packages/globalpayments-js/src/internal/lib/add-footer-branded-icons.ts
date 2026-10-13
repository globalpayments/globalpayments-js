import getAssetBaseUrl from "./asset-base-url";
import {IUIFormOptions} from "../../ui/form";
import {getCurrentLanguage} from "./detectLanguage";
import translations from "./translations/translations";
import { createHtmlAnchorElement, createHtmlDivElement, createHtmlImageElement, HtmlAnchorTarget } from "../../common/html-element";
import { isEserviceThemeApplied } from "./styles/themes/helpers";

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
  const isEserviceTheme = isEserviceThemeApplied(formOptions.style);

  if (isEserviceTheme) {
    const regulationsPlaceholder = "{{regulations}}";
    const eServiceTermsTemplate = translations[language].footer['e-service-terms-template'];
    const eServiceTermsStart = translations[language].footer['e-service-terms-start'] || "";
    const eServiceTermsEnd = translations[language].footer['e-service-terms-end'] || ".";

    const eServiceInfoContainer = createHtmlDivElement({
      className: `${formOptions.prefix}eservice-info`,
      id: `${formOptions.prefix}eservice-info`,
    });

    const eServiceText = createHtmlDivElement({
      className: `${formOptions.prefix}eservice-text`,
      id: `${formOptions.prefix}eservice-text`,
    });
    const createRegulationsLink = () => createHtmlAnchorElement({
      href: "https://www.eservice.pl/regulamin-pojedynczej-transakcji-p%C5%82atniczej?hs_preview=exdPZbbn-215036431569",
      textContent: translations[language].footer['regulations-text'],
      className: `${formOptions.prefix}eservice-link`,
      id: `${formOptions.prefix}eservice-link`,
      target: HtmlAnchorTarget.Blank,
    });

    if (eServiceTermsTemplate && eServiceTermsTemplate.indexOf(regulationsPlaceholder) !== -1) {
      const templateParts = eServiceTermsTemplate.split(regulationsPlaceholder);
      templateParts.forEach((part: string, index: number) => {
        if (part) {
          eServiceText.appendChild(document.createTextNode(part));
        }
        if (index < templateParts.length - 1) {
          eServiceText.appendChild(createRegulationsLink());
        }
      });
    } else {
      // Backward-compatible fallback for locales still using start/end keys.
      eServiceText.appendChild(document.createTextNode(eServiceTermsStart));
      eServiceText.appendChild(document.createTextNode(eServiceTermsEnd));
      eServiceText.appendChild(createRegulationsLink());
    }

    eServiceInfoContainer.appendChild(eServiceText);

    const eServiceBrandRow = createHtmlDivElement({
      className: `${formOptions.prefix}eservice-brand-row`,
      id: `${formOptions.prefix}eservice-brand-row`,
      attributes: [
        { style: "display:flex;justify-content:space-between;align-items:center;" },
      ],
    });

    const eServiceBrandLeftWrapper = createHtmlDivElement({
      className: `${formOptions.prefix}shield`,
      id: `${formOptions.prefix}shield`,
    });
    const eServiceBrandLeftLogoContainer = createHtmlDivElement({
      className: "footer-branded-logo-image-1",
      id: "footer-branded-logo-image-1",
      // attributes: [
      //   { role: 'img' },
      //   { 'aria-label': 'Brand logo image' },
      // ],
    });
    const eServiceBrandLeftImage = createHtmlImageElement({
      src: `${assetUrl}images/eservice-logo-1.svg`,
      alt: "eService brand logo left",
      className: "ssl-logo_ico",
      id: "ssl-logo_ico",
    });
    eServiceBrandLeftLogoContainer.appendChild(eServiceBrandLeftImage);
    eServiceBrandLeftWrapper.appendChild(eServiceBrandLeftLogoContainer);

    const eServiceBrandRightWrapper = createHtmlDivElement({
      className: `${formOptions.prefix}logo`,
      id: `${formOptions.prefix}logo`,
    });
    const eServiceBrandRightImage = createHtmlImageElement({
      src: `${assetUrl}images/eservice-logo-2.svg`,
      alt: "eService brand logo right",
    });
    eServiceBrandRightWrapper.appendChild(eServiceBrandRightImage);

    eServiceBrandRow.appendChild(eServiceBrandLeftWrapper);
    eServiceBrandRow.appendChild(eServiceBrandRightWrapper);
    eServiceInfoContainer.appendChild(eServiceBrandRow);

    const divider = document.createElement("hr");
    divider.style.margin = "2rem 0 2rem 0";
    eServiceInfoContainer.appendChild(divider);

    footer.appendChild(eServiceInfoContainer);
  }

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
    src: `${assetUrl}images/Encrypted_Badge_New.svg`,
    alt: translations[language].footer['ssl-msg-alt'],
    className: "ssl-logo_ico",
  });
  sslLogoContainerDiv.appendChild(sslImage);

  // const sslEncryptedTextSpan = createHtmlSpanElement({
  //   textContent: translations[language].footer['ssl-msg'],
  //   className: "ssl-msg",
  // });
  // sslLogoContainerDiv.appendChild(sslEncryptedTextSpan);

  sslEncryptedContainerDiv.appendChild(sslLogoContainerDiv);
  footerContainerDiv.appendChild(sslEncryptedContainerDiv);

  // Branded specific Logo
  if (!isEserviceTheme) {
    const brandLogoDiv = createHtmlDivElement({
      id: 'footer-branded-logo-image',
      className: 'footer-branded-logo-image',
      attributes: [
        { role: 'img' },
        { 'aria-label': 'Brand logo image' },
      ],
    });
    footerContainerDiv.appendChild(brandLogoDiv);
  }

  // Security Emblem text
  // const securityEmblemLogoContainerDiv = createHtmlDivElement({
  //   className: `${formOptions.prefix}logo`,
  // });
  // const securityEmblemTextSpan = createHtmlSpanElement({
  //   textContent: translations[language].footer['security-msg'],
  //   className: "security-msg",
  // });
  // securityEmblemLogoContainerDiv.appendChild(securityEmblemTextSpan);
  const securityEmblemLogoContainerDiv = createHtmlDivElement({
    className: `${formOptions.prefix}logo`,
  });

  const securityEmblemImage = createHtmlImageElement({
    src: `${assetUrl}images/Secured_By_GP_Badge.svg`,
    alt: translations[language].footer['security-msg-alt'],
  });

  securityEmblemLogoContainerDiv.appendChild(securityEmblemImage);
  footerContainerDiv.appendChild(securityEmblemLogoContainerDiv);

  footer.appendChild(footerContainerDiv);
}