import { loadedFrames, postMessage } from "../internal";

export default (status: PaymentComplete) => {
  const frames = loadedFrames;
  for (const frameId in frames) {
    if (!frames.hasOwnProperty(frameId)) {
      continue;
    }

    postMessage.post(
      {
        data: { status },
        id: frameId,
        type: "ui:iframe-field:payment-request-complete",
      },
      frameId,
    );
  }
};
