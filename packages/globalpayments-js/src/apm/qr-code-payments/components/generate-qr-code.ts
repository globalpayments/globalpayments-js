import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";

export function removeScriptById(scriptId: string): void {
    const scriptElement = document.getElementById(scriptId);

    if (scriptElement && scriptElement.tagName === 'SCRIPT') {
        scriptElement.remove();
    }
}

export async function loadQRCodeLibraryAndGenerate(text: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `${getAssetBaseUrl('')}vendor/qrcode.js`;
        script.id = 'qr-code-script';
        script.onload = () => {
            // Script has loaded, now generate the QR code
            generateQRCode(text).then(resolve).catch(reject);
        };
        script.onerror = () => {
            reject(new Error('Failed to load QRCode library'));
        };
        document.body.appendChild(script);
    });
}

export async function generateQRCode(text: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // @ts-ignore
        const qr = new QRCode.toDataURL(text, (error: any, url: string) => {
            if (error) {
                reject(error);
            } else {
                resolve(url);
            }
        });
    });
}