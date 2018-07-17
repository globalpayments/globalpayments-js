import { availableGateways } from "../gateways";
import { options } from "./options";

const configHasAllRequiredSettings = (settings: string[]) => {
  const totalSettings = settings.length;
  let count = 0;

  for (let i = 0; i < totalSettings; i++) {
    const setting = settings[i];
    if (options.hasOwnProperty(setting) && options[setting] !== undefined) {
      count++;
    }
  }

  return count === totalSettings;
};

export default () => {
  for (const key in availableGateways) {
    if (!availableGateways.hasOwnProperty(key)) {
      continue;
    }

    const gateway = availableGateways[key];

    if (configHasAllRequiredSettings(gateway.requiredSettings)) {
      return gateway;
    }
  }

  return undefined;
};
