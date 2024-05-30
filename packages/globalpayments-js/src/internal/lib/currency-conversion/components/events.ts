import { IframeField } from "../../../../ui";
import paymentFieldId from "../../payment-field-id";
import { DCC_KEY } from "../contracts/constants";
import { postMessage } from "../../post-message";
import { CurrencyConversionEvents } from "../contracts/enums";

/**
 * Sets event listeners for radio buttons within a radio group.
 * This method handles click events on radio buttons to toggle their state.
 * @param iframeField The iframe field associated with the radio group.
 * @param fieldset The fieldset element containing the radio buttons.
 */
export const setRadioGroupEvents = (iframeField: IframeField, fieldset: HTMLElement): void => {
  fieldset.addEventListener('click', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.tagName === 'INPUT' && target.type === 'radio') {
      const groupName = target.name;
      const radioButtons = fieldset.querySelectorAll(`input[type="radio"][name="${groupName}"]`);
      radioButtons.forEach(radioButton => {
        const isChecked = radioButton === target;
        const parent = radioButton.parentElement;
        radioButton.setAttribute('aria-checked', isChecked ? 'true' : 'false');
        parent?.classList.toggle('checked', isChecked);
        fieldset.classList.add('no-focus-outline');
        iframeField.validate();
        iframeField.setValue(target.value);
      });

      // Hide all target elements
      const targetElements = document.querySelectorAll('.visible');
      targetElements.forEach(element => {
        element.classList.remove('visible');
      });

      // Get the data-target value of the clicked radio button's parent
      const dataTarget = target.parentElement?.getAttribute('data-target');

      // Show the target element corresponding to the clicked radio button
      if (dataTarget) {
        const targetElementToShow = document.querySelector(`.${dataTarget}`);
        if (targetElementToShow) {
          targetElementToShow.classList.add('visible');
        }
      }

      postMessage.post(
        {
          data: {
            value: target.value,
            selectedCurrency: target.id,
          },
          id: iframeField.id,
          type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionSendValue}`,
        },
        iframeField.id,
      );
    }
  });

  fieldset.addEventListener('blur', (event) => {
    if (!fieldset.contains(event.relatedTarget as Node)) {
      const iframe = document.querySelector(`iframe[name=${DCC_KEY}]`) as HTMLIFrameElement;
      if (iframe) {
        const fieldInsideIframe = iframe.contentDocument?.getElementById(paymentFieldId) as HTMLInputElement;
        if (fieldInsideIframe) {
          if (fieldInsideIframe.value.trim() !== '') return;
          iframeField.validate();
          fieldInsideIframe.hidden = true;
        }
      }
    }
  }, true)
};