import { HostedFieldValidationEvents } from "../../common/enums";
import { postMessage } from "../lib/post-message";
import { BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY } from "./constants";

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

export const resetValidationRoundCounter = (): void => {
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, "1");
}

export const getValidationRoundCounter = (): number => +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);

export const increaseValidationRoundCounter = (): void => {
  const counter = +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, `${counter + 1}`);
}

export const removeValidationRoundCounter = (): void => localStorage.removeItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY);