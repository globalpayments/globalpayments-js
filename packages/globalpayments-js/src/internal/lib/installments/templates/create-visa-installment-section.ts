import { createHtmlAnchorElement, HtmlAnchorTarget } from "../../../../common/html-element";
import { getCurrentLanguage } from "../../detectLanguage";
import { InstallmentPaymentData, VisaInstallmentPaymentData } from "../contracts/interfaces";
import { createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../helpers/html-element";
import { IframeField } from "../../../../ui/iframe-field/index";
import InstallmentTerm from "../contracts/installment-term";
import { InstallmentEvents } from "../contracts/enums";
import { postMessage } from "../../post-message";
import { options } from "../../options";
import { EligibleCountries } from "../../enums";
import getAssetBaseUrl from "../../../gateways/gp-api/get-asset-base-url";
import { getLearnMoreLink } from "../helpers/currency";
import { InstallmentLabels } from "./enum";
import { formatAmount } from "../../../../common/currency";

export function createVisaInstallmentSection(
    installmentId:string,
    installmentOptions: any[],
    iFrameField: IframeField | undefined,
    installmentTranslations:any
): HTMLElement | null{
        // Remove any option with missing required fields (except the default payment option)
        const requiredKeys: string[] = [
            'reference', 'count', 'planAmount', 'currency', 'timeUnit',
            'termsAndConditions', 'costPercentage', 'totalPlanCost', 'name', 'fees'
        ];
        installmentOptions = installmentOptions.filter((option: any) => {
            if (option.count === InstallmentLabels.INSTALLMENT_DEFAULT_PAYMENT_OPTION) return true;
            const missingKeys = requiredKeys.filter(key => option[key] === undefined);
            if (missingKeys.length > 0) {
                // tslint:disable-next-line:no-console
                console.warn('Removing invalid installment option. Missing keys:', missingKeys, 'in option:', option);
                return false;
            }
            return true;
        });

    const section = createHtmlDivElement({
        className: 'visa-installment-section',
    })

    const contentDiv = createHtmlDivElement({
        className: "installment-content-visa",
    })
    section.appendChild(contentDiv);
    installmentOptions.forEach((option) => {
        const detailsContainerDiv = createHtmlDivElement({
            className: "installment-details-container",
            id: `installment-details-container-${option.reference}`,
        })
        const payInDiv = createHtmlDivElement({
            className: "installment-pay-in-visa-option",
            id: `installment-option-${option.reference}`,
        });
        const installmentDetailsDiv = createHtmlDivElement({
            className: "installment-option-details",
        });
        payInDiv.textContent = `${installmentTranslations.payInInstallmentsText} ${option.count}`;

        if (!option.reference) {
            payInDiv.textContent = `${options.installments?.country === EligibleCountries.CA ? installmentTranslations.payInFullLatam : installmentTranslations.payInFullVisa}`;
            installmentDetailsDiv.style.setProperty("display", "flex", "important");
            installmentDetailsDiv.style.setProperty("align-items", "center", "important");
            payInDiv.style.backgroundColor = "#0074C7";
            payInDiv.style.color = "#FFFFFF";
            detailsContainerDiv.style.borderColor = "#0074C7";
            detailsContainerDiv.style.borderWidth = "2px";
        }

        let amountToDisplay:any = Number(option.fees?.total_upfront_amount) + Number(option.fees?.subsequent_amount) + Number(option.planAmount);
        if(amountToDisplay > 0) {
            amountToDisplay = formatAmount((Number(amountToDisplay)),option.currency);
        }
        const span = createHtmlSpanElement({
            textContent: option.reference && amountToDisplay
                ? `${amountToDisplay} ${option.currency}/${installmentTranslations[option.timeUnit.toLowerCase()]} ${options.installments?.country === EligibleCountries.UK ? ` (${installmentTranslations.includeFees})` : ''}`
                : `${formatAmount(Number(option.planAmount),option.currency)} ${option.currency}`,
            className: "installment-option-details-span",
            id: `installment-option-details-${option.reference ? option.reference : "pay-in-full"}`,
        });

        const flexContainer = createHtmlDivElement({
            className: "installment-terms-conditions-flex",
            id: `installment-terms-conditions-flex-${option.reference}`
        });

        const termsAndConditionsDiv = createHtmlDivElement({
            className: "installment-terms-conditions",
            id: `installment-terms-conditions-${option.reference}`
        });

        const checkbox = document.createElement("input");

        installmentDetailsDiv.appendChild(span);

        const getTermsAndConditionsObject =
            option.termsAndConditions?.find((term: any) => term?.language === getCurrentLanguage())
            ?? option.termsAndConditions?.find((term: any) => term?.language === 'en');

        if (option.reference) {
            const additionalDetailsDiv = createHtmlDivElement({
                className: "installment-option-additional-details",
                id: `installment-option-additional-details-${option.reference}`
            });

            if(options.installments?.country === "CA"){
                const costPercentageSpan = createHtmlSpanElement({
                    textContent: `${installmentTranslations.apr}: ${formatCostPercentage(option.costPercentage)}%`,
                    className: "installment-option-details-span",
                    id: `installment-option-details-${option.reference}`,
                });
                additionalDetailsDiv.appendChild(costPercentageSpan);
            }

            if(options.installments?.country === EligibleCountries.UK){
                const additionalDetailsFeesDiv = createHtmlDivElement({
                    className: "installment-option-additional-fee-details",
                    id: `installment-option-additional-fee-details-${option.reference}`
                });

                const totalAmountFeesSpan = createHtmlSpanElement({
                    textContent: `${installmentTranslations.fees}: ${formatAmount(Number(option.fees?.subsequent_amount), option.currency)} ${option.currency}/${installmentTranslations[option.timeUnit.toLowerCase()]} (${installmentTranslations.apr}: ${formatCostPercentage(option.costPercentage)}%)`,
                    className: "installment-option-fee-details-span",
                    id: `installment-option-fee-details-${option.reference}`,
                });

                additionalDetailsFeesDiv.appendChild(totalAmountFeesSpan);
                additionalDetailsDiv.appendChild(additionalDetailsFeesDiv);
            }

            const totalAmountSpan = createHtmlSpanElement({
                textContent: `${installmentTranslations.total}: ${formatAmount((Number(option.totalPlanCost)),option.currency)} ${option.currency}
                ${options.installments?.country === EligibleCountries.UK ? `(${installmentTranslations.include} ${(formatAmount(Number(option.fees?.total_amount), option.currency))} ${option.currency} ${installmentTranslations.fees.toLowerCase()})` : ''}`,
                className: "installment-option-details-span",
                id: `installment-option-details-${option.reference}`,
            });

            additionalDetailsDiv.appendChild(totalAmountSpan);

            installmentDetailsDiv.appendChild(additionalDetailsDiv)

            // Create the checkbox
            checkbox.type = "checkbox";
            checkbox.id = `installment-terms-checkbox-${option.reference}`;
            checkbox.className = "installment-terms-checkbox";

            // Add change event handler to checkbox
            checkbox.addEventListener("change", (event) => {
                if ((event.target as HTMLInputElement).checked) {
                    // Remove error styles if checked
                    checkbox.classList.remove("checkbox-error");
                    const removeErrorElement: HTMLElement | null = document.getElementById(`installment-terms-error-${option.reference}`);
                    if(removeErrorElement) removeErrorElement.style.display = "none";
                }
            });

            // Create the label (just for description and link, not for checkbox)
            const label = createHtmlSpanElement({
                className: "installment-terms-label",
                id: `installment-terms-label-${option.reference}`
            });

            // Add description and link to label
            if (getTermsAndConditionsObject?.description) {
                // Add red asterisk before description
                const asterisk = createHtmlSpanElement({
                    className: "mandatory-asterisk"
                });
                asterisk.textContent = "*";
                label.appendChild(asterisk);
                label.appendChild(document.createTextNode(getTermsAndConditionsObject.description.trim()));
                if (!getTermsAndConditionsObject.description.trim().endsWith(".")) {
                    label.appendChild(document.createTextNode("."));
                }
                label.appendChild(document.createTextNode(" "));
            }
            const additionalTermsLink = createHtmlAnchorElement({
                "href": `${getTermsAndConditionsObject?.url}`,
                "textContent": `${options.installments?.country === EligibleCountries.CA ? installmentTranslations.additionalTerms : installmentTranslations.furtherInfoText}`,
                "target": HtmlAnchorTarget.Blank,
                "className": "additional-terms"
            });
            label.appendChild(additionalTermsLink);

            // Append checkbox and label to flex container
            flexContainer.appendChild(checkbox);
            flexContainer.appendChild(label);

            const errorSpan = createHtmlSpanElement({
                className: "installment-terms-error",
                id: `installment-terms-error-${option.reference}`,
                textContent: `${installmentTranslations.mandatoryError}`
            });

            // Append flex container to termsAndConditionsDiv
            termsAndConditionsDiv.appendChild(flexContainer);
            termsAndConditionsDiv.appendChild(errorSpan);
        }

        detailsContainerDiv.addEventListener("click", (event) => {
            handleInstallmentOptionClick(installmentId,flexContainer, payInDiv, detailsContainerDiv, checkbox,option,iFrameField,getTermsAndConditionsObject);
            event.stopPropagation();
        });
        detailsContainerDiv.appendChild(payInDiv);
        detailsContainerDiv.appendChild(installmentDetailsDiv);
        detailsContainerDiv.appendChild(termsAndConditionsDiv);
        contentDiv.appendChild(detailsContainerDiv);
    });
    const footerSection = createHtmlDivElement({
        className: "installment-footer-section",
        id: "installment-footer-section"
    });
    const visaSpanStart = createHtmlSpanElement({
        className: "installment-visa-text",
        textContent: `${installmentTranslations.footerInstallmentsTextStart}`
    });
    const visaLogo =  createHtmlImageElement({
        className: "installment-visa-logo",
        src: `${getAssetBaseUrl('')}images/visa.svg`,
        alt: "Visa Logo"
    });
    const visaSpanEnd = createHtmlSpanElement({
        className: "installment-visa-text",
        textContent: `${installmentTranslations.footerInstallmentsTextEnd}`
    });
    const learnMoreLink = createHtmlAnchorElement({
        href: `${getLearnMoreLink(options.installments?.country)}`,
        textContent: `${installmentTranslations.learnMoreText}`,
        className: "installment-visa-learn-more",
        target: HtmlAnchorTarget.Blank
    });
    footerSection.appendChild(visaSpanStart);
    footerSection.appendChild(visaLogo);
    footerSection.appendChild(visaSpanEnd);
    footerSection.appendChild(learnMoreLink);
    section.appendChild(footerSection);
    return section;
}

function handleInstallmentOptionClick(
    installmentId: string,
    flexContainer: HTMLElement,
    payInDiv: HTMLElement,
    detailsContainerDiv: HTMLElement,
    checkbox: HTMLInputElement,
    installmentPlan: InstallmentTerm,
    iFrameField: IframeField | undefined,
    getTermsAndConditionsObject: any
) {

    // If the error is present (red border) and the checkbox is still unchecked, do not reset styles
    const isError = detailsContainerDiv.style.borderColor === "red" || detailsContainerDiv.style.border === "2px solid red";
    if (isError && !checkbox.checked) {
        // Do not reset border or error if clicking the same div with unresolved error
        return;
    }

    document.querySelectorAll(".installment-terms-conditions-flex").forEach((el) => {
        (el as HTMLElement).style.display = "none";
    });
    // Show only this one
    flexContainer.style.display = "flex";

    // Set color of all other pay in divs to grey
    document.querySelectorAll(".installment-pay-in-visa-option").forEach((el) => {
        (el as HTMLElement).style.backgroundColor = "#F1F2F4";
        (el as HTMLElement).style.color = "#394046";
    });
    // change color of only this one
    payInDiv.style.backgroundColor = "#0074C7";
    payInDiv.style.color = "#FFFFFF";
    // Set color of all other borders to grey
    document.querySelectorAll(".installment-details-container").forEach((el) => {
        (el as HTMLElement).style.borderColor = "#BCBFC8";
    });
    // change color of only this one
    detailsContainerDiv.style.borderColor = "#0074C7";
    detailsContainerDiv.style.borderWidth = "2px";

    document.querySelectorAll(".installment-terms-checkbox").forEach((el) => {
        checkbox.classList.remove("checkbox-error");
        const removeErrorElement: HTMLElement | null = document.getElementById(`installment-terms-error-${installmentPlan.reference}`);
        if(removeErrorElement) removeErrorElement.style.display = "none";
        if (el !== checkbox) {
            (el as HTMLInputElement).checked = false;
        }
    });

    document.querySelectorAll(".installment-terms-error").forEach((el) => {
        (el as HTMLElement).style.display = "none";
    });

    let installmentData : InstallmentPaymentData | VisaInstallmentPaymentData | null = null;
    if (installmentPlan.reference) {
        installmentData = {
            installmentReference: installmentPlan.reference,
            installmentId,
            language: getTermsAndConditionsObject.language,
            version: getTermsAndConditionsObject.version
        }
    } else {
        installmentData = {
            installmentReference: "",
            installmentId: "",
            language: "",
            version: ""
        }
    }

    postMessage.post(
        {
            data: installmentData,
            id: iFrameField ? iFrameField.id : '',
            type: `ui:iframe-field:${InstallmentEvents.CardInstallmentSendValue}`,
        },
        iFrameField && iFrameField.id ? iFrameField.id : '',
    );
}

function formatCostPercentage(costPercentage: string | number): string {
    const num = Number(costPercentage);
    if (isNaN(num)) return String(costPercentage);
    return num % 1 === 0 ? num.toFixed(0) : String(costPercentage);
}
