import { loadedFrames } from "./loaded-frames";

export default class PostMessage {
  public post(data: any, target: string) {
    data.source = data.source || {};
    data.source.name = window.name || "parent";

    if (!loadedFrames) {
      return;
    }

    const frame = loadedFrames[target];

    if (!frame) {
      return;
    }

    let targetNode = frame.frame;
    const targetUrl = frame.url;

    try {
      if (typeof frame.targetNode !== "undefined") {
        targetNode = frame.targetNode;
      }
    } catch (e) {
      /* */
    }

    const win =
      target === "parent" ? parent : targetNode.contentWindow || targetNode;

    if (typeof (win as any).postMessage === "undefined") {
      return;
    }

    (win as any).postMessage(JSON.stringify(data), targetUrl);
  }

  public receive(callback?: (data: any) => void) {
    return new Promise((resolve) => {
      const cb = (m: MessageEvent) => {
        try {
          const d = JSON.parse(m.data);
          if (callback) {
            callback.call(callback, d);
          } else {
            resolve(d);
          }
        } catch (e) {
          /* */
        }
      };

      if (window.addEventListener) {
        window.addEventListener("message", cb, false);
      } else {
        (window as any).attachEvent("onmessage", cb);
      }
    });
  }
}

export const postMessage = new PostMessage();
