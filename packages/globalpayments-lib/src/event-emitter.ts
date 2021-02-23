/// see https://gist.github.com/mudge/5830382

/* Polyfill indexOf. */
let indexOf: (haystack: any[], needle: any) => number;

if (typeof Array.prototype.indexOf === "function") {
  indexOf = (haystack, needle) => haystack.indexOf(needle);
} else {
  indexOf = (haystack, needle) => {
    const length = haystack.length;
    let i = 0;
    let idx = -1;
    let found = false;

    while (i < length && !found) {
      if (haystack[i] === needle) {
        idx = i;
        found = true;
      }

      i++;
    }

    return idx;
  };
}

export interface IEventCollection {
  [key: string]: IEventListener[];
}
export type IEventListener = () => void;

export class EventEmitter {
  public events: IEventCollection;

  constructor() {
    this.events = {};
  }

  public on(event: string, listener: IEventListener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  public off(event: string, listener: IEventListener) {
    let idx;

    if (typeof this.events[event] === "object") {
      idx = indexOf(this.events[event], listener);

      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  public emit(event: string, ...args: any[]) {
    let i: number;
    let listeners: IEventListener[];
    let length: number;

    if (typeof this.events[event] === "object") {
      listeners = this.events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args as []);
      }
    }
  }

  public once(event: string, listener: IEventListener) {
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.on(event, function g() {
      that.off(event, g);
      listener.apply(that, arguments as any);
    });
  }
}
