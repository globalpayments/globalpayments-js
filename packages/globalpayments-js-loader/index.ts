/// <reference types="@globalpayments/js" />

/**
 * Prevent multiple copies of the Global Payments JavaScript
 * library from being loaded by only using a single Promise.
 */
let libraryLoaded: Promise<typeof window.GlobalPayments>;

/**
 * Loads the Global Payments JavaScript library asynchronously, using a
 * resolved `Promise` to signal that the library has loaded.
 *
 * @param url
 *
 * @returns The resolved library
 */
export function loadLibrary(url?: string): Promise<typeof window.GlobalPayments> {
    if (libraryLoaded) {
        return libraryLoaded;
    }

    if (window.GlobalPayments) {
        return libraryLoaded = Promise.resolve(window.GlobalPayments);
    }

    if (!url) {
        url = "https://js.globalpay.com/v1/globalpayments.js";
    }

    return libraryLoaded = new Promise((resolve) => {
        try {
            const script = document.createElement("script");
            script.defer = true;
            script.src = url || "";
            script.onload = () => {
                resolve(window.GlobalPayments);
            };
            document.body.appendChild(script);
        } catch (e) { /** */ }
    });
}
