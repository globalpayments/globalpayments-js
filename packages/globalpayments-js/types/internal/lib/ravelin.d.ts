import { IConfiguration } from "../../tools/configure";
declare global {
    interface Window {
        Ravelin?: new (cfg: any) => any;
        detectIncognito?: {
            detectIncognito: () => Promise<{
                isPrivate: boolean;
            }>;
        };
    }
}
declare type RavelinConfig = NonNullable<IConfiguration["ravelin"]>;
declare type RavelinConstructor = new (cfg: any) => any;
declare type RavelinInstance = InstanceType<RavelinConstructor>;
export declare function createRavelinObject(enableFraudMitigation: boolean | undefined, publishableKey: string | undefined): RavelinConfig | undefined;
/**
 * Initialise the Ravelin singleton from the ravelin section of the SDK config.
 * Safe to call multiple times — only the first call creates the instance.
 *
 * @param cfg  The `options.ravelin` configuration object.
 */
export declare function initRavelin(cfg: RavelinConfig | undefined): Promise<RavelinInstance | null>;
/**
 * Returns the cached Ravelin deviceId string.
 * When the cache is empty, this triggers a background fetch and returns `null`
 * until the device ID has been resolved.
 */
export declare function getRavelinDeviceId(): string | null;
/**
 * Send a named tracking event to Ravelin.
 * No-ops silently when Ravelin has not been initialised.
 *
 * @param name   Event name, conventionally UPPER_SNAKE_CASE.
 * @param props  Optional JSON-serialisable properties.
 */
export declare function loadRavelinPage(props?: Record<string, unknown>): Promise<void>;
export declare function trackRavelinEvent(name: string, props?: Record<string, unknown>): Promise<void>;
export declare function trackRavelinPaste(event: ClipboardEvent): Promise<void>;
/**
 * Expose the raw instance for advanced use-cases (e.g. ravelin.track.load()
 * after SPA navigation).  Returns null when uninitialised.
 */
/** Reset the singleton — intended for testing only. */
export declare function _resetRavelinInstance(): void;
export {};
