import { createHtmlRadioButtonElement } from "../../../../common/html-element";
import { createHtmlDivElement } from "../helpers/html-element";
import { createInstallmentSection } from "./create-installment-section";
import { postMessage } from "../../post-message";
import { InstallmentEvents, InstallmentTermModes } from "../contracts/enums";
import { getCurrentLanguage, getTranslationSet } from "../../detectLanguage";
import { InstallmentLabels } from "./enum";
import { IframeField } from "../../../../ui/iframe-field/index";
import InstallmentPlansData from "../contracts/installment-plans-data";
import InstallmentTerm from "../contracts/installment-term";
import { InstallmentPaymentData } from "../contracts/interfaces";

export function createInstallmentOptions(iFrameField: IframeField | undefined, installmentPlans: InstallmentPlansData): HTMLElement | undefined {

  const lang = getCurrentLanguage();
  const installmentTranslations = getTranslationSet(lang, 'installments');
  const container = document.getElementById('installment-option-section') as HTMLElement;
  container.setAttribute('style', 'display: flex');

  if (document.getElementsByClassName("payment-options").length > 0) return;

  const paymentContent = createHtmlDivElement({
    className: 'payment-options',
    id: 'payment-options'
  });

  // Add text to choose payment option
  const paymentOptionText = createHtmlDivElement({
    className: 'payment-option-text',
  })
  paymentOptionText.textContent = installmentTranslations.choosePaymentOption;
  paymentContent.appendChild(paymentOptionText);

  // Pay in Full radio
  const payInFullDiv = createHtmlRadioButtonElement({
    id: InstallmentLabels.INSTALLMENT_DEFAULT_PAYMENT_OPTION,
    name: InstallmentLabels.INSTALLMENT_PAYMENT_OPTION_NAME,
    value: 'full',
    checked: true,
    labelText: installmentTranslations.payInFull,
    radioButtonClassList: "pay-in-full-option"
  })
  paymentContent.appendChild(payInFullDiv);

  const refinedPlans = refineInstallmentPlans(installmentPlans.terms);
  // Installment sections
  if (refinedPlans.MWI.length > 0) {
    const monthsSection = createInstallmentSection(
      installmentTranslations.monthsWithoutInterest,
      refinedPlans.MWI,
      installmentTranslations.months
    );
    paymentContent.appendChild(monthsSection);
  }
  if (refinedPlans.BNPL.length > 0) {
    const buyNowSection = createInstallmentSection(
      installmentTranslations.buyNowPayLater,
      refinedPlans.BNPL,
      installmentTranslations.months
    );
    paymentContent.appendChild(buyNowSection);
  }
  container.appendChild(paymentContent);

  // Attach change event directly to each radio button
  setInstallmentEventsToInstallmentOptions(iFrameField, installmentPlans);

  iFrameField?.container?.append(container);
}

function setInstallmentEventsToInstallmentOptions(iFrameField: IframeField | undefined, installmentPlans: InstallmentPlansData) {
  const radioButtons = iFrameField?.container?.querySelectorAll('input[type="radio"][name="payment-type"]');
  radioButtons?.forEach((radio) => {
    radio.addEventListener("click", (event) => {
      let installmentData : InstallmentPaymentData | null = null;
      const target = event.target as HTMLInputElement;
      if (target && target.name === InstallmentLabels.INSTALLMENT_PAYMENT_OPTION_NAME) {
        radioButtons.forEach((button) => {
          const isChecked = button === target;
          const parent = button.parentElement;
          parent?.classList.toggle('checked', isChecked);
        });
      }
      if(target && target.id !== InstallmentLabels.INSTALLMENT_DEFAULT_PAYMENT_OPTION) {
        installmentData = {
          installmentId : installmentPlans.id,
          installmentReference: target.value,
        }
      } else {
        installmentData = {
          installmentId : "",
          installmentReference: "",
        };
      }
      postMessage.post(
        {
          data: installmentData,
          id: iFrameField ? iFrameField.id : '',
          type: `ui:iframe-field:${InstallmentEvents.CardInstallmentSendValue}`,
        },
        iFrameField && iFrameField.id ? iFrameField.id : '',
      );
    });
  });
}


function refineInstallmentPlans(termPlans: InstallmentTerm[]) {
  let termPlansMWI: InstallmentTerm[] = [];
  let termPlansBNPL: InstallmentTerm[] = [];
  termPlans.forEach((term: InstallmentTerm) => {
    if (term.mode === InstallmentTermModes.MWI) {
      termPlansMWI.push(term)
    } else if (term.mode === InstallmentTermModes.BNPL) {
      termPlansBNPL.push(term)
    }
  })
  if (termPlansMWI.length > 4) {
    termPlansMWI = filterCountAndGrace(termPlansMWI);
  }
  if (termPlansBNPL.length > 4) {
    termPlansBNPL = filterCountAndGrace(termPlansBNPL);
  }

  return { MWI: termPlansMWI, BNPL: termPlansBNPL };
}

function filterCountAndGrace(termPlans: InstallmentTerm[]) {
  termPlans.sort((a: InstallmentTerm, b: InstallmentTerm) => {
    if (a.count !== b.count) {
      return +a.count - +b.count;
    }
    // return +a.gracePeriodCount - +b.gracePeriodCount;
    if (+a.gracePeriodCount !== +b.gracePeriodCount) {
      return +a.gracePeriodCount - +b.gracePeriodCount;
    }
    // Alphabetical sort by 'name' if count and gracePeriodCount are equal
    return String(a.name).localeCompare(String(b.name));
  })
  if (termPlans.length > 4) {
    termPlans.splice(4);
  }
  return termPlans;
}