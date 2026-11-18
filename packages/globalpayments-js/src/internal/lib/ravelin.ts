import { IConfiguration } from "../../tools/configure";
import { options } from "./options";
import getAssetBaseUrl from "../../internal/gateways/gp-api/get-asset-base-url";

declare global {
  interface Window {
    Ravelin?: new (cfg: any) => any;
    detectIncognito?: {
      detectIncognito: () => Promise<{ isPrivate: boolean }>;
    };
  }
}

function getRavelinBundleUrl(): string {
  return `${getAssetBaseUrl("")}vendor/ravelin-bundle.js`;
}

type RavelinConfig = NonNullable<IConfiguration["ravelin"]>;

type RavelinConstructor = new (cfg: any) => any;
type RavelinInstance = InstanceType<RavelinConstructor>;

function ensureRavelinConstructor(): Promise<RavelinConstructor> {
  const bundleUrl = getRavelinBundleUrl();
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Ravelin) {
      resolve(window.Ravelin);
      return;
    }

    if (typeof document !== "undefined") {
      if (typeof window !== "undefined" && !window.detectIncognito) {
        window.detectIncognito = {
          detectIncognito: () => Promise.resolve({ isPrivate: false }),
        };
      }

      const existingScript = document.querySelector(`script[src="${bundleUrl}"]`) as HTMLScriptElement | null;
      if (existingScript) {
        if (window.Ravelin) {
          resolve(window.Ravelin);
          return;
        }

        existingScript.addEventListener("load", () => {
          if (window.Ravelin) {
            resolve(window.Ravelin);
          } else {
            reject(new Error(`Ravelin bundle loaded but window.Ravelin is missing at ${bundleUrl}`));
          }
        }, { once: true });
        existingScript.addEventListener("error", () => {
          reject(new Error(`Failed to load Ravelin bundle from ${bundleUrl}`));
        }, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = bundleUrl;
      script.async = true;
      script.onload = () => {
        if (window.Ravelin) {
          resolve(window.Ravelin);
        } else {
          reject(new Error(`Ravelin bundle loaded but window.Ravelin is missing at ${bundleUrl}`));
        }
      };
      script.onerror = () => {
        reject(new Error(`Failed to load Ravelin bundle from ${bundleUrl}`));
      };
      document.head.appendChild(script);
      return;
    }

    reject(new Error(`Ravelin bundle cannot be loaded in this environment: ${bundleUrl}`));
  });
}

/** The single Ravelin instance, created lazily on first call to initRavelin(). */
let ravelinInstance: RavelinInstance | null = null;
let ravelinDeviceId: string | null = null;
let ravelinDeviceIdPromise: Promise<string | null> | null = null;
let ravelinCheckoutEventSent = false;
let ravelinInitializationFailed = false;
let ravelinErrorReported = false;

function getCurrentRavelinConfig(): RavelinConfig | undefined {
  return createRavelinObject(options.enableFraudMitigation, options.publishable_key);
}

export function createRavelinObject(enableFraudMitigation: boolean | undefined, publishableKey: string | undefined): RavelinConfig | undefined {
  return {
    enabled: enableFraudMitigation,
    publishable_key: publishableKey,
  };
}

function disableRavelin(error: unknown, context: string, reportError: boolean = true): null {
  const constantErrorMessage = "Cannot load the Ravelin fraud mitigation library.";

  if (reportError && !ravelinErrorReported) {
    ravelinErrorReported = true;
    // tslint:disable-next-line:no-console
    console.error(constantErrorMessage);
  }

  if (typeof window !== "undefined") {
    const win = window as Window & { Ravelin?: unknown };
    delete win.Ravelin;
  }

  ravelinInstance = null;
  ravelinDeviceId = null;
  ravelinDeviceIdPromise = null;
  ravelinCheckoutEventSent = false;
  ravelinInitializationFailed = true;

  return null;
}

function validateRavelinConfig(cfg: RavelinConfig | undefined): Error | null {
  const apiKey = cfg?.publishable_key?.trim();
  const constantErrorMessage = "Cannot load the Ravelin fraud mitigation library.";

  if (cfg?.enabled && (!apiKey || apiKey.length === 0)) {
    return new Error(constantErrorMessage);
  }

  if (!cfg?.enabled && apiKey) {
    return new Error(constantErrorMessage);
  }

  if (cfg?.enabled && apiKey && ravelinInitializationFailed) {
    return new Error(constantErrorMessage);
  }

  return null;
}

function primeRavelinDeviceId(): void {
  if (!ravelinInstance || ravelinDeviceId || ravelinDeviceIdPromise || ravelinInitializationFailed) {
    return;
  }

  ravelinDeviceIdPromise = Promise.resolve(ravelinInstance.core.id())
    .then((deviceId) => {
      ravelinDeviceId = deviceId ?? null;
      // tslint:disable-next-line:no-console
      console.log("getRavelinDeviceId :", deviceId);
      return ravelinDeviceId;
    })
    .catch((error) => {
      disableRavelin(error, "Failed to fetch the Ravelin device identifier", false);
      ravelinDeviceIdPromise = null;
      return null;
    });
}

async function sendRavelinTrackEvent(
  instance: RavelinInstance,
  name: string,
  props?: Record<string, unknown>,
  reportError: boolean = false,
): Promise<void> {
  try {
    await instance.track.event(name, props);
    // tslint:disable-next-line:no-console
    console.log("Ravelin track.event called with", name, props);
  } catch (error) {
    disableRavelin(error, `Ravelin failed to send the "${name}" event`, reportError);
    throw error;
  }
}

async function createRavelinInstance(
  cfg: RavelinConfig | undefined,
  reportError: boolean = true,
): Promise<RavelinInstance | null> {
  const apiKey = cfg?.publishable_key?.trim();
  const validationError = validateRavelinConfig(cfg);

  if (validationError) {
    return disableRavelin(validationError, "Ravelin configuration error", reportError);
  }

  if (!cfg?.enabled || !apiKey || ravelinInitializationFailed) {
    return null;
  }

  if (!ravelinInstance) {
    try {
      const Ravelin = await ensureRavelinConstructor();

      ravelinInstance = new Ravelin({
        key: apiKey,
        ...(cfg.prefix !== undefined && { prefix: cfg.prefix }),
        ...(cfg.cookieDomain && { cookieDomain: cfg.cookieDomain }),
      });
    } catch (error) {
      return disableRavelin(error, "Ravelin failed to initialize with the provided publishable key", reportError);
    }
  }

  // tslint:disable-next-line:no-console
  // console.log("ravelinInstance", ravelinInstance);

  return ravelinInstance;
}

/**
 * Initialise the Ravelin singleton from the ravelin section of the SDK config.
 * Safe to call multiple times — only the first call creates the instance.
 *
 * @param cfg  The `options.ravelin` configuration object.
 */
export function initRavelin(cfg: RavelinConfig | undefined): Promise<RavelinInstance | null> {
  return createRavelinInstance(cfg)
    .then(async (instance) => {
      if (!instance || ravelinCheckoutEventSent) {
        return instance;
      }

      try {
        ravelinCheckoutEventSent = true;
        await sendRavelinTrackEvent(instance, "CHECKOUT_INITATED", undefined, true);
        primeRavelinDeviceId();
      } catch (error) {
        return disableRavelin(error, "Ravelin checkout initialization failed");
      }
      return instance;
    })
    .catch((error) => disableRavelin(error, "Ravelin initialization failed"));
}

/**
 * Returns the cached Ravelin deviceId string.
 * When the cache is empty, this triggers a background fetch and returns `null`
 * until the device ID has been resolved.
 */
export function getRavelinDeviceId(): string | null {
  // if (!ravelinDeviceId) {
  //   if (ravelinInstance) {
  //     primeRavelinDeviceId();
  //   } else if (options.ravelin?.enabled) {
  //     void createRavelinInstance(options.ravelin).then((instance) => {
  //       if (instance) {
  //         primeRavelinDeviceId();
  //       }
  //     });
  //   }
  // }
  return ravelinDeviceId;
}

/**
 * Send a named tracking event to Ravelin.
 * No-ops silently when Ravelin has not been initialised.
 *
 * @param name   Event name, conventionally UPPER_SNAKE_CASE.
 * @param props  Optional JSON-serialisable properties.
 */
export async function loadRavelinPage(
  props?: Record<string, unknown>,
): Promise<void> {
  try {
    const instance = await createRavelinInstance(getCurrentRavelinConfig(), false);
    if (!instance) {
      return;
    }

    await instance.track.load(props);
  } catch (error) {
    disableRavelin(error, "Ravelin failed to load the page", false);
  }
}

export async function trackRavelinEvent(
  name: string,
  props?: Record<string, unknown>,
): Promise<void> {
  try {
    const instance = await createRavelinInstance(getCurrentRavelinConfig(), false);
    if (!instance) {
      return;
    }

    await sendRavelinTrackEvent(instance, name, props, false);
  } catch (error) {
    disableRavelin(error, `Ravelin failed to track the "${name}" event`, false);
  }
}

export async function trackRavelinPaste(
  event: ClipboardEvent,
): Promise<void> {
  try {
    const instance = await createRavelinInstance(getCurrentRavelinConfig(), false);
    if (!instance) {
      return;
    }

    await instance.track.paste(event);
    // tslint:disable-next-line:no-console
    console.log("Ravelin track.paste called with", event);
  } catch (error) {
    disableRavelin(error, "Ravelin failed to track the paste event", false);
  }
}

/**
 * Expose the raw instance for advanced use-cases (e.g. ravelin.track.load()
 * after SPA navigation).  Returns null when uninitialised.
 */
// export function getRavelinInstance(): InstanceType<typeof Ravelin> | null {
//   return ravelinInstance;
// }

/** Reset the singleton — intended for testing only. */
export function _resetRavelinInstance(): void {
  ravelinInstance = null;
  ravelinDeviceId = null;
  ravelinDeviceIdPromise = null;
  ravelinCheckoutEventSent = false;
  ravelinInitializationFailed = false;
  ravelinErrorReported = false;
}