import { loadedFrames, postMessage } from "../internal";

/**
 * Completes a payment via the PaymentRequest API after
 * the server-side authorization request is performed
 *
 * @param data Payment status: "fail", "success", "unknown"
 */
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
