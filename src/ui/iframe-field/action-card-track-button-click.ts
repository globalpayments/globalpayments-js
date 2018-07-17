import Events from "../../internal/lib/events";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { postMessage } from "../../internal/lib/post-message";
import tokenize from "../../internal/requests/tokenize";

export default (id: string) => {
  let el: HTMLInputElement | null = document.getElementById(
    paymentFieldId + "-data",
  ) as HTMLInputElement;
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  el = document.createElement("input");
  el.id = paymentFieldId + "-data";
  el.type = "text";

  const container = document.querySelector(".extra-div-2") as HTMLDivElement;

  if (!container) {
    throw new Error("TODO");
  }

  container.style.height = "0px";
  container.style.width = "0px";
  container.style.overflow = "hidden";

  container.appendChild(el);

  const button = document.getElementById(paymentFieldId);
  const originalButtonText =
    button && button.innerText ? button.innerText : "Read Card";

  if (button && button.firstChild) {
    button.replaceChild(
      document.createTextNode("Waiting..."),
      button.firstChild,
    );
  }

  el.focus();

  postMessage.post(
    {
      id,
      type: "ui:iframe-field:waiting-for-data",
    },
    "parent",
  );

  Events.addHandler(el, "keydown", (e: KeyboardEvent) => {
    if (e.keyCode !== 13) {
      return;
    }

    postMessage.post(
      {
        id,
        type: "ui:iframe-field:data-received",
      },
      "parent",
    );

    e.preventDefault();

    const field = document.getElementById(
      paymentFieldId + "-data",
    ) as HTMLInputElement;
    const value = field && field.value ? field.value : "";

    tokenize({
      "card-track": value,
    })
      .then((response) => {
        if (button && button.firstChild) {
          button.replaceChild(
            document.createTextNode(originalButtonText),
            button.firstChild,
          );
        }
        field.blur();

        postMessage.post(
          {
            data: response,
            id,
            type: "ui:iframe-field:token-success",
          },
          "parent",
        );
      })
      .catch((response) => {
        if (button && button.firstChild) {
          button.replaceChild(
            document.createTextNode(originalButtonText),
            button.firstChild,
          );
        }
        field.blur();

        postMessage.post(
          {
            data: response,
            id,
            type: "ui:iframe-field:token-error",
          },
          "parent",
        );
      });
  });
};
