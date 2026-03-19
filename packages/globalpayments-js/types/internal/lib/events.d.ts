/**
 * Provides integrators helper functions for working with events.
 */
export default class Events {
    /**
     * addHandler
     *
     * Adds an `event` handler for a given `target` element.
     *
     * @param target
     * @param event
     * @param callback
     */
    static addHandler(target: string | EventTarget, event: string, callback: EventListener | ((e: KeyboardEvent) => void)): void;
    /**
     * removeHandler
     *
     * Removes an `event` handler for a given `target` element.
     *
     * @param target
     * @param event
     * @param callback
     */
    static removeHandler(target: string | EventTarget, event: string, callback: EventListener): void;
    /**
     * trigger
     *
     * Fires off an `event` for a given `target` element.
     *
     * @param name
     * @param target
     */
    static trigger(name: string, target: any): void;
}
