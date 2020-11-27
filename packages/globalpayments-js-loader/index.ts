/**
 * Prevent multiple copies of the Global Payments JavaScript
 * library from being loaded by only using a single Promise.
 */
let libraryLoaded: Promise<object>;

/**
 * Loads the Global Payments JavaScript library asynchronously, using a
 * resolved `Promise` to signal that the library has loaded.
 *
 * @param url
 *
 * @returns The resolved library
 */
export function loadLibrary(url?: string) {
    if (libraryLoaded) {
        return libraryLoaded;
    }

    if (!url) {
        url = "https://js.globalpay.com/v1/globalpayments.js";
    }

    return libraryLoaded = new Promise((resolve) => {
        const script = document.createElement("script");
        script.defer = true;
        script.src = url || "";
        script.onload = () => {
            resolve((window as any).GlobalPayments);
        };
        document.body.appendChild(script);
    });
}
