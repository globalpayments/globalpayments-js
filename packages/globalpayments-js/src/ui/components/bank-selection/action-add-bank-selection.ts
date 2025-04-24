import { changeCreditCardFormFieldsVisibility, createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import { BankAquirers, IBankSelectionProps } from "../../../internal/lib/bank-selection/contracts";
import { getAllAvailableBanks, getAvailableBanksByCountry, getCountryForQRPlatbaBank } from "../../../internal/lib/bank-selection/helpers";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
import { translateMessage } from "../../../internal/lib/translate";
import { getCurrentLanguage, getTranslationSet } from "../../../internal/lib/detectLanguage";
import translations from "../../../internal/lib/translations/translations";
import { ApmEvents, ApmProviders } from "../../../internal/lib/enums";
import { options } from "../../../internal";
import { IframeField } from "../../iframe-field";
import { getSelectAnotherPaymentMethodButton } from "../../../apm/non-card-payments/components/common";
import { ApmInternalEvents } from "../../../apm/enums";

export default function addBankSelection (iframeField: IframeField, props: IBankSelectionProps): void {
    const paymentMethodsContainerElement = iframeField?.container;
    if(!paymentMethodsContainerElement) return;

    const BANK_SELECTION_KEY = "bank-selection";
    const {
        countryCode,
        currencyCode
    } = props;
    const bankList = getAllAvailableBanks(options.apms?.countryCode, options.apms?.acquirer);

    const bankSelectionTranslations = getTranslationSet(getCurrentLanguage(), 'bankSelection');

    const bankSelectionWrapperDiv = createHtmlDivElement({
        id: `${BANK_SELECTION_KEY}-wrapper`,
        className: "bank-selection-wrapper",
    });

    // TODO (Bank Selection): Create the UI and logic
    // TODO (Bank Selection): Add Accesibility props to elements like labels
    // TODO (Bank Selection): Add translations
    const pleaseSelectBankSpan = createHtmlSpanElement({
        textContent: bankSelectionTranslations.pleaseSelectYourPreferredBank,
        id:"title-text",
        className:"title-text"
    });
    bankSelectionWrapperDiv.append(pleaseSelectBankSpan);

    const bankSelectionContainer = createHtmlDivElement({
        id: BANK_SELECTION_KEY,
        className: "bank-selection",
    });

    bankList?.forEach((bank,index) => {
        const bankOptionWrapperDiv = createHtmlDivElement({
            className: "bank-selecction-option",
        });
        if(getCountryForQRPlatbaBank(countryCode) && (index === 0)){
            bankOptionWrapperDiv.classList.add("qr-code-button")
        }
        // TODO (Bank Selection): Add bank logos
        const externalLinkImageDiv = createHtmlDivElement({
            className: "external-link-div",
        });
        const externalLinkImage = createHtmlImageElement({
            src: `${getAssetBaseUrl('')}images/external-link.svg`,
            alt: 'external-link',
        })
        const bankOptionImage = createHtmlImageElement({
            src: `${getAssetBaseUrl('')}images/bank-logos/${bank.imageName}`,
            alt: bank.displayName,
            attributes: [
                { width: '40%' },
                { height: '75px'},
                { 'aria-hidden': 'true' }
            ],
        })
        // Click handler
        bankOptionWrapperDiv.addEventListener('click', (_event) => {
            onClickBankOption(bank.name,bankOptionWrapperDiv,bankOptionImage);
        });
        // bankOptionWrapperDiv.append(bankOptionSpan);
        externalLinkImageDiv.append(externalLinkImage)
        bankOptionWrapperDiv.append(externalLinkImageDiv);
        bankOptionWrapperDiv.append(bankOptionImage);
        bankSelectionContainer.append(bankOptionWrapperDiv);
    });

    bankSelectionWrapperDiv.append(bankSelectionContainer);
    bankSelectionWrapperDiv.append(getSelectAnotherPaymentMethodButton('select-another-payment-method-button', () => {
        onClickSelectAnotherPaymentMethod();
      }));
    paymentMethodsContainerElement.append(bankSelectionWrapperDiv);

    const onClickSelectAnotherPaymentMethod = () => {
        bankSelectionWrapperDiv.setAttribute('style', 'display: none');
        changeCreditCardFormFieldsVisibility(true);

        window.dispatchEvent(new CustomEvent(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
      };

    const onClickBankOption = (bankSelection: string,bankOptionWrapperDiv:HTMLDivElement,bankOptionImage:HTMLImageElement) => {
        // TODO (Bank Selection): Handle user selection
        // tslint:disable-next-line:no-console
        console.log(`Selected ${bankSelection}.`);
        iframeField?.emit(ApmEvents.PaymentMethodSelection, {
            provider: ApmProviders.OpenBanking,
            bankName: bankSelection,
            acquirer: countryCode === "PL" ? BankAquirers.Eservice : options.apms?.acquirer
          });
    };
}