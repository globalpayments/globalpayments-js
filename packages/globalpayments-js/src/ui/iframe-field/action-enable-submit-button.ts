import { CardFormFieldNames } from "../../common/enums";

export default function actionEnableSubmitButton(data: any): void {
    // Implementation for enabling the submit button
    const { fieldName, isValid } = data.data;
    const windowObject = window as any;
    // Initialize only once
    if (!windowObject.enableSubmitButtonIfValid) {
        windowObject.enableSubmitButtonIfValid = {
            [CardFormFieldNames.CardNumber]: false,
            [CardFormFieldNames.CardHolderName]: false,
            [CardFormFieldNames.CardExpiration]: false,
            [CardFormFieldNames.CardCvv]: false,
        };
    }

    windowObject.enableSubmitButtonIfValid[fieldName] = isValid;
    // More efficient validation check - early exit on first false
    const validationState = windowObject.enableSubmitButtonIfValid;
    let allFieldsValid = true;
    for (const key in validationState) {
        if (!validationState[key]) {
            allFieldsValid = false;
            break;
        }
    }
    const submitButtonIframe = document.querySelector('iframe[name="submit"]') as HTMLIFrameElement;
    if (!submitButtonIframe) return;

    const updateButtonState = () => {
        const submitButtonContentDoc = submitButtonIframe.contentDocument;
        if (!submitButtonContentDoc) return;
        const submitButton = submitButtonContentDoc.querySelector("button") as HTMLButtonElement | null;
        if (!submitButton) return;
        submitButton.classList.toggle('disabled-submit-button', !allFieldsValid);
    };

    if (submitButtonIframe.contentDocument?.readyState === 'complete') {
        updateButtonState();
    } else {
        submitButtonIframe.addEventListener('load', updateButtonState, { once: true });
    }
}
