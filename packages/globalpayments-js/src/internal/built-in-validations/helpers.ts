import { HostedFieldValidationEvents } from "../../common/enums";
import { postMessage } from "../lib/post-message";

export const showHostedFieldValidation = (fieldId: string | null, validationMessage: string, target?: string): void => {
    postMessage.post(
        {
          data: {
            validationMessage,
          },
          id: fieldId,
          type: getHostedFieldValidationEventType(true),
        },
        target || 'parent',
      );
}

export const hideHostedFieldValidation = (fieldId: string | null, target?: string): void => {
    postMessage.post(
        {
          data: {},
          id: fieldId,
          type: getHostedFieldValidationEventType(false),
        },
        target || 'parent',
      );
}

const getHostedFieldValidationEventType = (show: boolean): string => `ui:iframe-field:${ show ? HostedFieldValidationEvents.ValidationShow : HostedFieldValidationEvents.ValidationHide }`;