export default class Ev {
    static listen(node: EventTarget, eventName: string, callback: EventListener): void;
    static trigger(node: EventTarget, eventName: string): void;
    static ignore(eventName: string, callback: EventListener): void;
}
