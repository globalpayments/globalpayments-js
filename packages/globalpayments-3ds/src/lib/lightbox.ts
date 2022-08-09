import {
  ChallengeWindowSize,
  dimensionsFromChallengeWindowSize,
} from "../enums";
import { IChallengeWindowOptions } from "../interfaces";

// most of this module is pulled from the legacy Realex Payments JavaScript library

export const isWindowsMobileOs = /Windows Phone|IEMobile/.test(
  navigator.userAgent,
);
export const isAndroidOrIOs = /Android|iPad|iPhone|iPod/.test(
  navigator.userAgent,
);
export const isMobileXS =
  ((window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360
    ? true
    : false) ||
  ((window.innerHeight > 0 ? window.innerHeight : screen.height) <= 360
    ? true
    : false);

// For IOs/Android and small screen devices always open in new tab/window
// TODO: Confirm/implement once sandbox support is in place
export const isMobileNewTab =
  !isWindowsMobileOs && (isAndroidOrIOs || isMobileXS);

// Display IFrame on WIndows Phone OS mobile devices
export const isMobileIFrame = isWindowsMobileOs || isMobileNewTab;

export const randomId = Math.random().toString(16).substr(2, 8);

export function createLightbox(
  iFrame: HTMLIFrameElement,
  options: IChallengeWindowOptions,
) {
  // Create the overlay
  const overlayElement = createOverlay();

  // Create the spinner
  const spinner = createSpinner();
  document.body.appendChild(spinner);

  const { height, width } = dimensionsFromChallengeWindowSize(options);

  // Configure the iframe
  if (height) {
    iFrame.setAttribute("height", `${height}px`);
  }
  iFrame.setAttribute("frameBorder", "0");
  if (width) {
    iFrame.setAttribute("width", `${width}px`);
  }
  iFrame.setAttribute("seamless", "seamless");

  iFrame.style.zIndex = "10001";
  iFrame.style.position = "absolute";
  iFrame.style.transition = "transform 0.5s ease-in-out";
  iFrame.style.transform = "scale(0.7)";
  iFrame.style.opacity = "0";

  overlayElement.appendChild(iFrame);

  if (isMobileIFrame || options.windowSize === ChallengeWindowSize.FullScreen) {
    iFrame.style.top = "0px";
    iFrame.style.bottom = "0px";
    iFrame.style.left = "0px";
    iFrame.style.marginLeft = "0px;";
    iFrame.style.width = "100%";
    iFrame.style.height = "100%";
    iFrame.style.minHeight = "100%";
    (iFrame.style as any).WebkitTransform = "translate3d(0,0,0)";
    iFrame.style.transform = "translate3d(0, 0, 0)";

    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
    document.getElementsByTagName("head")[0].appendChild(metaTag);
  } else {
    iFrame.style.top = "40px";
    iFrame.style.left = "50%";
    iFrame.style.marginLeft = `-${width / 2}px`;
  }

  iFrame.onload = getIFrameOnloadEventHandler(
    iFrame,
    spinner,
    overlayElement,
    options,
  );
}

function closeModal() {
  Array.prototype.slice
    .call(
      document.querySelectorAll(
        `[target$="-${randomId}"],[id$="-${randomId}"]`,
      ),
    )
    .forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.setAttribute("id", `GlobalPayments-overlay-${randomId}`);
  overlay.style.position = "fixed";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.transition = "all 0.3s ease-in-out";
  overlay.style.zIndex = "100";

  if (isMobileIFrame) {
    overlay.style.position = "absolute !important";
    (overlay.style as any).WebkitOverflowScrolling = "touch";
    overlay.style.overflowX = "hidden";
    overlay.style.overflowY = "scroll";
  }

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.background = "rgba(0, 0, 0, 0.7)";
  }, 1);

  return overlay;
}

function createCloseButton(options: IChallengeWindowOptions) {
  if (
    document.getElementById(`GlobalPayments-frame-close-${randomId}`) !== null
  ) {
    return;
  }

  const closeButton = document.createElement("img");
  closeButton.id = `GlobalPayments-frame-close-${randomId}`;
  closeButton.src =
    // tslint:disable-next-line:max-line-length
    "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJFRjU1MEIzMUQ3MTFFNThGQjNERjg2NEZCRjFDOTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUJFRjU1MEMzMUQ3MTFFNThGQjNERjg2NEZCRjFDOTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkVGNTUwOTMxRDcxMUU1OEZCM0RGODY0RkJGMUM5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQkVGNTUwQTMxRDcxMUU1OEZCM0RGODY0RkJGMUM5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlHco5QAAAHpSURBVHjafFRdTsJAEF42JaTKn4glGIg++qgX4AAchHAJkiZcwnAQD8AF4NFHCaC2VgWkIQQsfl/jNJUik8Duzs/XmW9mN7Xb7VRc5vP5zWKxaK5Wq8Zmu72FqobfJG0YQ9M0+/l8/qFQKDzGY1JxENd1288vLy1s786KRZXJZCLber1Wn7MZt4PLarVnWdZ9AmQ8Hncc17UvymVdBMB/MgPQm+cFFcuy6/V6lzqDf57ntWGwYdBIVx0TfkBD6I9M35iRJgfIoAVjBLDZbA4CiJ5+9AdQi/EahibqDTkQx6fRSIHcPwA8Uy9A9Gcc47Xv+w2wzhRDYzqdVihLIbsIiCvP1NNOoX/29FQx3vgOgtt4FyRdCgPRarX4+goB9vkyAMh443cOEsIAAcjncuoI4TXWMAmCIGFhCQLAdZ8jym/cRJ+Y5nC5XCYAhINKpZLgSISZgoqh5iiLQrojAFICVwGS7tCfe5DbZzkP56XS4NVxwvTI/vXVVYIDnqmnnX70ZxzjNS8THHooK5hMpxHQIREA+tEfA9djfHR3MHkdx3Hspe9r3B+VzWaj2RESyR2mlCUE4MoGQDdxiwHURq2t94+PO9bMIYyTyDNLwMoM7g8+BfKeYGniyw2MdfSehF3Qmk1IvCc/AgwAaS86Etp38bUAAAAASUVORK5CYII=";
  closeButton.style.transition = "all 0.5s ease-in-out";
  closeButton.style.opacity = "0";
  (closeButton.style as any).float = "left";
  closeButton.style.position = "absolute";
  closeButton.style.left = "50%";
  closeButton.style.zIndex = "99999999";
  closeButton.style.top = "30px";

  const { width } = dimensionsFromChallengeWindowSize(options);
  if (width) {
    closeButton.style.marginLeft = `${width / 2 - 8 /* half image width */}px`;
  }

  setTimeout(() => {
    closeButton.style.opacity = "1";
  }, 500);

  if (isMobileIFrame || options.windowSize === ChallengeWindowSize.FullScreen) {
    (closeButton.style as any).float = "right";
    closeButton.style.top = "20px";
    closeButton.style.left = "initial";
    closeButton.style.marginLeft = "0px";
    closeButton.style.right = "20px";
  }

  return closeButton;
}

function createSpinner() {
  const spinner = document.createElement("img");
  spinner.setAttribute(
    "src",
    // tslint:disable-next-line:max-line-length
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iIzAwNzBiYSIgZmlsbC1vcGFjaXR5PSIxIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGRjZWUiIGZpbGwtb3BhY2l0eT0iMC4yNSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGRjZWUiIGZpbGwtb3BhY2l0eT0iMC4yNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGRjZWUiIGZpbGwtb3BhY2l0eT0iMC4yNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik0zOC41MiAzMy4zN0wyMS4zNiAxNi4yQTYzLjYgNjMuNiAwIDAgMSA1OS41LjE2djI0LjNhMzkuNSAzOS41IDAgMCAwLTIwLjk4IDguOTJ6IiBmaWxsPSIjYzBkY2VlIiBmaWxsLW9wYWNpdHk9IjAuMjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iI2MwZGNlZSIgZmlsbC1vcGFjaXR5PSIwLjI1IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGRjZWUiIGZpbGwtb3BhY2l0eT0iMC4yNSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik0zOC41MiAzMy4zN0wyMS4zNiAxNi4yQTYzLjYgNjMuNiAwIDAgMSA1OS41LjE2djI0LjNhMzkuNSAzOS41IDAgMCAwLTIwLjk4IDguOTJ6IiBmaWxsPSIjYzBkY2VlIiBmaWxsLW9wYWNpdHk9IjAuMjUiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSIxMjgwbXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9nPjwvc3ZnPg==",
  );
  spinner.setAttribute("id", `GlobalPayments-loader-${randomId}`);
  spinner.style.left = "50%";
  spinner.style.position = "fixed";
  spinner.style.background = "#FFFFFF";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "30px";
  spinner.style.zIndex = "200";
  spinner.style.marginLeft = "-15px";
  spinner.style.top = "120px";
  return spinner;
}

function getIFrameOnloadEventHandler(
  iFrame: HTMLIFrameElement,
  spinner: Element,
  overlayElement: Element,
  options: IChallengeWindowOptions,
) {
  return () => {
    iFrame.style.opacity = "1";
    iFrame.style.transform = "scale(1)";
    iFrame.style.backgroundColor = "#ffffff";

    if (spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }

    let closeButton: HTMLImageElement | undefined;

    closeButton = createCloseButton(options);
    if (closeButton) {
      overlayElement.appendChild(closeButton);
      closeButton.addEventListener(
        "click",
        () => {
          if (closeButton) {
            closeModal();
          }
        },
        true,
      );
    }
  };
}
