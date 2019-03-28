import Ev from "./ev";

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
  public static addHandler(
    target: string | EventTarget,
    event: string,
    callback: EventListener | ((e: KeyboardEvent) => void),
  ) {
    let node: EventTarget | null;
    if (typeof target === "string") {
      node = document.getElementById(target);
    } else {
      node = target;
    }

    if (!node) {
      return;
    }

    if (document.addEventListener) {
      node.addEventListener(event, callback as EventListener, false);
    } else {
      Ev.listen(node, event, callback as EventListener);
    }
  }

  /**
   * removeHandler
   *
   * Removes an `event` handler for a given `target` element.
   *
   * @param target
   * @param event
   * @param callback
   */
  public static removeHandler(
    target: string | EventTarget,
    event: string,
    callback: EventListener,
  ) {
    let node: EventTarget | null;
    if (typeof target === "string") {
      node = document.getElementById(target);
    } else {
      node = target;
    }

    if (!node) {
      return;
    }

    if (document.removeEventListener) {
      node.removeEventListener(event, callback, false);
    } else {
      Ev.ignore(event, callback);
    }
  }

  /**
   * trigger
   *
   * Fires off an `event` for a given `target` element.
   *
   * @param name
   * @param target
   */
  public static trigger(name: string, target: any) {
    if (document.createEvent) {
      const event = document.createEvent("Event");
      event.initEvent(name, true, true);
      target.dispatchEvent(event);
    } else {
      Ev.trigger(target, name);
    }
  }
}
