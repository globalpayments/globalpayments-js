// @ts-check

/**
 * Prevent multiple copies of the Global Payments JavaScript
 * library from being loaded by only using a single Promise.
 * 
 * @type {Promise<object>}
 */
let libraryLoaded;

/**
 * Loads the Global Payments JavaScript library asynchronously, using a
 * resolved `Promise` to signal that the library has loaded.
 *
 * @param {string} [url]
 * 
 * @returns The resolved library
 */
export function loadLibrary(url) {
    if (libraryLoaded) {
        return libraryLoaded;
    }

    if (!url) {
        url = 'https://api2.heartlandportico.com/securesubmit.v1/token/gp-1.6.0/globalpayments.js';
    }

    return libraryLoaded = new Promise((resolve) => {
        const script = document.createElement('script');
        script.defer = true;
        script.src = url || '';
        script.onload = () => {
            resolve((/** @type {any} */ (window)).GlobalPayments);
        };
        document.body.appendChild(script);
    });
}
