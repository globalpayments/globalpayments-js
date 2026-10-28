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

    const submitButtonFrameIds: string[] = [];
    for (const frameId in loadedFrames) {
        if (loadedFrames[frameId]?.frame?.name === "submit" || loadedFrames[frameId]?.frame?.name === "submit-dcc") {
            submitButtonFrameIds.push(frameId);
        }
    }

    if (submitButtonFrameIds.length === 0) return;

    // Send message to each submit button iframe to toggle the disabled class.
    submitButtonFrameIds.forEach((submitButtonFrameId) => {
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
    });
}
