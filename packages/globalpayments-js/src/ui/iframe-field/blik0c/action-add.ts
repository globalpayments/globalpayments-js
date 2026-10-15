import { IframeField } from "..";
import { Environments } from "../../../common/enums";
import { changeCreditCardFormFieldsVisibility, createHtmlAnchorElement, HtmlAnchorTarget, createHtmlButtonElement, createHtmlDivElement, createHtmlElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import { isUrlValid } from "../../../apm/non-card-payments/components/common";
import { options } from "../../../internal";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
import { ApmEvents } from "../../../internal/lib/enums";
import { translateMessage } from "../../../internal/lib/translate";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import translations from "../../../internal/lib/translations/translations";

const digits = (input: string): string => input.replace(/\D/g, '').slice(0, 6);

const BLIK0C_ERROR_COLOR = '#D93025';
const BLIK0C_SUCCESS_COLOR = '#00A859';

const setCodeInputState = (input: HTMLInputElement, isValid: boolean): void => {
    input.style.border = `1px solid ${isValid ? BLIK0C_SUCCESS_COLOR : BLIK0C_ERROR_COLOR}`;
};

const getIpAddress = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) return '';
        const data = await response.json();
        return data?.ip || '';
    } catch (error) {
        return '';
    }
};

const createValidationState = (codeInput: HTMLInputElement): {
    errorText: HTMLSpanElement;
    errorMessage: HTMLDivElement;
    setValidationError: (message?: string) => void;
} => {
    const errorText = createHtmlElement('span', {
        className: 'blik0c-code-error-text',
    }) as HTMLSpanElement;

    const errorMessage = createHtmlDivElement({
        id: 'blik0c-code-error',
        className: 'blik0c-code-error',
        attributes: [
            { 'aria-live': 'polite' },
        ],
    });
    const icon = document.createElement('img');
    icon.src = `${getAssetBaseUrl('')}images/circle-exclamation.svg`;
    icon.className = 'blik0c-code-error-icon';
    errorMessage.append(icon, errorText);
    errorMessage.style.display = 'none';

    const setValidationError = (message = ''): void => {
        errorText.textContent = message;
        errorMessage.style.display = message ? 'flex' : 'none';
        codeInput.setAttribute('aria-invalid', message ? 'true' : 'false');
        setCodeInputState(codeInput, !message);
    };

    return { errorText, errorMessage, setValidationError };
};

let hasBlikWaitScreenListener = false;

const removeExistingElement = (container: Element | null, selector: string): void => {
    const existing = container?.querySelector(selector);
    if (existing) {
        existing.remove();
    }
};

const renderBlikTimeoutScreen = (iframeField: IframeField): void => {
    const timeoutScreen = createHtmlDivElement({
        id: 'blik0c-timeout-screen',
        className: 'blik0c-wait-screen',
    });

    const icon = document.createElement('img');
    icon.src = `${getAssetBaseUrl('')}images/Exclamation-circle.svg`;
    icon.style.height = '32px';
    icon.className = 'apms-redirecting-to-page-message';

    const timeoutCountdown = createHtmlSpanElement({
        id: 'blik0c-timeout-countdown',
        className: 'apms-redirecting-to-page-message',
    });

    timeoutScreen.append(icon, timeoutCountdown);

    removeExistingElement(iframeField.container, '#blik0c-wait-screen');
    removeExistingElement(iframeField.container, '#blik0c-timeout-screen');
    iframeField.container?.appendChild(timeoutScreen);

    let remainingSeconds = 59;
    const updateCountdown = (): void => {
        timeoutCountdown.textContent = `You’ve been inactive for a while. For your security, your session will automatically expire in ${remainingSeconds} seconds.`;

        if (remainingSeconds === 0) {
            // tslint:disable-next-line:no-console
            console.log('BLIK0 time out');
            return;
        }

        remainingSeconds -= 1;
        window.setTimeout(updateCountdown, 1000);
    };

    updateCountdown();
};

const renderBlikWaitScreen = (iframeField: IframeField, redirectUrl?: string): void => {
    const wrapper = iframeField.container?.querySelector('.blik0c-wrapper') as HTMLElement | null;
    if (wrapper) wrapper.classList.remove('expand-blik0c-form');
    const lang = getCurrentLanguage();
    const existingForm = iframeField.container?.querySelector('.blik0c-custom-form');
    if (existingForm) existingForm.remove();

    const waitScreen = createHtmlDivElement({
        id: 'blik0c-wait-screen',
        className: 'blik0c-wait-screen',
    });

    const redirectingToPaymentPageImage = createHtmlImageElement({
        src: `${getAssetBaseUrl('')}images/qr-code-redirect-logo.png`,
        alt: translateMessage(lang, translations.en.QR?.waitingScreen?.waitingIcon),
        attributes: [
            { width: '64' },
            { height: '64' },
            { 'aria-hidden': 'true' },
            { style: 'margin-bottom: 30px;' },
        ],
    });
    waitScreen.append(redirectingToPaymentPageImage);

    const waitingToPaymentPageSpan = createHtmlSpanElement({
        className: 'apms-redirecting-to-page-message',
        textContent: translateMessage(lang, translations.en.apms?.waitingScreen?.blik0WaitingScreenMessage),
    });
    waitScreen.append(waitingToPaymentPageSpan);

    if (options.env === Environments.Sandbox && redirectUrl && isUrlValid(redirectUrl)) {
        const sandboxLink = createHtmlDivElement({
            className: 'apms-redirecting-to-page-message',
        });
        const sandboxText = createHtmlSpanElement({
            className: 'apms-redirecting-to-page-message',
            textContent: translateMessage(lang, translations.en.apms?.redirectionText1),
        });
        const redirectLink = createHtmlAnchorElement({
            href: redirectUrl,
            textContent: translateMessage(lang, translations.en.apms?.link),
            target: HtmlAnchorTarget.Blank,
        });
        const sandboxText2 = createHtmlSpanElement({
            className: 'apms-redirecting-to-page-message',
            textContent: translateMessage(lang, translations.en.apms?.redirectionText2),
        });
        sandboxLink.append(sandboxText, redirectLink, sandboxText2);
        waitScreen.append(sandboxLink);
    }

    removeExistingElement(iframeField.container, '#blik0c-wait-screen');
    iframeField.container?.appendChild(waitScreen);
    changeCreditCardFormFieldsVisibility(false);

    window.setTimeout(() => {
        renderBlikTimeoutScreen(iframeField);
    }, 120000);
};

const addBlikWaitScreenListener = (iframeField: IframeField): void => {
    if (hasBlikWaitScreenListener) return;
    hasBlikWaitScreenListener = true;

    window.addEventListener(ApmEvents.PaymentMethodActionDetail, (event: any) => {
        const { redirect_url: redirectUrl, provider, next_action: nextAction } = event.detail || {};
        if (!provider || String(provider).toLowerCase() !== 'blik0c') return;
        if (nextAction === 'DISPLAY_WAIT_SCREEN') {
            renderBlikWaitScreen(iframeField, redirectUrl);
        }
    }, false);
};

export default function addBlik0CComponent(iframeField: IframeField | undefined): void {
    if (!iframeField || !iframeField.container) return;

    addBlikWaitScreenListener(iframeField);
    const lang = getCurrentLanguage();

    const component = iframeField.container.querySelector('.blik0c-wrapper') as HTMLElement | null;
    if (!component) return;

    const existingForm = iframeField.container.querySelector('.blik0c-custom-form');
    if (existingForm) {
        existingForm.remove();
        component.classList.remove('expand-blik0c-form');
        return;
    }

    component.classList.add('expand-blik0c-form');
    const customComponent = createHtmlDivElement({
        className: 'blik0c-custom-form',
    });
    const blikContent = createHtmlSpanElement({
        id: 'blik0c-content',
        className: 'blik0c-content',
        textContent: `${translateMessage(lang, translations.en.apms?.blik0c?.enterCodeMessage)}`,
    });

    const blikInputWrapper = createHtmlDivElement({
        className: 'blik0c-code-input-wrapper',
    });
    const blikHeader = createHtmlSpanElement({
        id: 'blik0c-header',
        className: 'blik0c-header',
        textContent: 'BLIK Code'
    });
    const codeInput = createHtmlElement('input', {
        id: 'blik0c-code-input',
        className: 'blik0c-code-input',
        attributes: [
            { type: 'text' },
            { maxlength: '7' },
            { autocomplete: 'one-time-code' },
            { inputmode: 'numeric' },
            { 'aria-label': 'BLIK code' },
        ],
    }) as HTMLInputElement;

    const blikActionWrapper = createHtmlDivElement({
        className: 'blik0c-code-action-wrapper',
    });
    const validation = createValidationState(codeInput);

    blikInputWrapper.append(blikHeader, codeInput);

    const payButtonIcon = createHtmlImageElement({
        className: 'blik0c-pay-button-icon',
        src: `${getAssetBaseUrl('')}images/gp-lock-alt.svg`,
        alt: 'blik icon',
    });

    const payButton = createHtmlButtonElement({
        id: 'blik0c-pay-button',
        className: 'blik0c-pay-button disabled-submit-button',
        textContent: 'Pay Now',
        attributes: [{ type: 'button' }],
    });
    payButton.prepend(payButtonIcon);

    const setPayButtonState = (isEnabled: boolean): void => {
        payButton.classList.toggle('disabled-submit-button', !isEnabled);
    };

    codeInput.addEventListener('input', () => {
        const blikCode = digits(codeInput.value);
        codeInput.value = blikCode.length <= 3 ? blikCode : `${blikCode.slice(0, 3)} ${blikCode.slice(3)}`;

        if (validation.errorText.textContent && blikCode.length === 6) {
            validation.setValidationError();
        }

        if (blikCode.length < 6) {
            setCodeInputState(codeInput, false);
            setPayButtonState(false);
            return;
        }
        setCodeInputState(codeInput, true);
        setPayButtonState(true);
    });

    payButton.addEventListener('click', async () => {
        const blikCode = digits(codeInput.value);
        if (blikCode.length !== 6) {
            validation.setValidationError(`${translateMessage(lang, translations.en.apms?.blik0c?.errorMessage)}`);
            return;
        }

        const payload = {
            provider: 'BLIK0C',
            code: blikCode,
            ipAddress: await getIpAddress(),
            userAgent: navigator.userAgent,
        };

        iframeField.emit(ApmEvents.PaymentMethodSelection, payload);
        validation.setValidationError();
    });

    blikActionWrapper.append(blikInputWrapper, validation.errorMessage, payButton);
    customComponent.append(blikContent, blikActionWrapper);
    component.appendChild(customComponent);
}