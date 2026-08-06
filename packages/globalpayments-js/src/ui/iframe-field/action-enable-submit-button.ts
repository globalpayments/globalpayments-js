import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { loadedFrames, options, postMessage } from "../../internal";
import { CardCvvOption } from "../../internal/lib/enums";

export default function actionEnableSubmitButton(data: any): void {
    const { fieldName, isValid } = data.data;
    const windowObject = window as any;
    const cvvPreValid =
    options.cardCvvOption === CardCvvOption.NotDisplayed ||
    options.cardCvvOption === CardCvvOption.Optional;
    // Initialize only once
    if (!windowObject.enableSubmitButtonIfValid) {
        windowObject.enableSubmitButtonIfValid = {
            [CardFormFieldNames.CardNumber]: false,
            [CardFormFieldNames.CardHolderName]: false,
            [CardFormFieldNames.CardExpiration]: false,
            [CardFormFieldNames.CardCvv]: cvvPreValid,
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
