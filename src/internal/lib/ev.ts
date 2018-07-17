export default class Ev {
  public static listen(
    node: EventTarget,
    eventName: string,
    callback: EventListener,
  ) {
    if (document.addEventListener) {
      node.addEventListener(eventName, callback, false);
    } else {
      if (node === document) {
        (document.documentElement as any).attachEvent(
          "onpropertychange",
          (e: Event) => {
            if ((e as any).propertyName === eventName) {
              callback(e);
            }
          },
        );
      } else {
        (node as any).attachEvent("on" + eventName, callback);
      }
    }
  }
  public static trigger(node: EventTarget, eventName: string) {
    if (document.createEvent) {
      const event = document.createEvent("Event");
      event.initEvent(eventName, true, true);
      node.dispatchEvent(event);
    } else {
      (document.documentElement as any)[eventName]++;
    }
  }
  public static ignore(eventName: string, callback: EventListener) {
    if (document.removeEventListener) {
      document.removeEventListener(eventName, callback, false);
    } else {
      (document.documentElement as any).detachEvent(
        "onpropertychange",
        (e: Event) => {
          if ((e as any).propertyName === eventName) {
            callback(e);
          }
        },
      );
    }
  }
}
