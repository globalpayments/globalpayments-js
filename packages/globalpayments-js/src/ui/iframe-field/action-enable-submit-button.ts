import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { loadedFrames, postMessage } from "../../internal";

export default function actionEnableSubmitButton(data: any): void {
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

    const validationState = windowObject.enableSubmitButtonIfValid;
    const allFieldsValid = validationState[CardFormFieldNames.CardNumber] &&
        validationState[CardFormFieldNames.CardExpiration] &&
        validationState[CardFormFieldNames.CardCvv] &&
        validationState[CardFormFieldNames.CardHolderName];

    let submitButtonFrameId: string | null = null;
    for (const frameId in loadedFrames) {
        if (loadedFrames[frameId]?.frame?.name === "submit") {
            submitButtonFrameId = frameId;
            break;
        }
    }

    if (!submitButtonFrameId) return;

    // Send message to submit button iframe to toggle the disabled class
    postMessage.post(
        {
            data: {
                shouldEnable: allFieldsValid
            },
            id: submitButtonFrameId,
            type: `ui:iframe-field:${HostedFieldValidationEvents.EnableSubmitButton}`,
        },
        submitButtonFrameId,
    );
}
