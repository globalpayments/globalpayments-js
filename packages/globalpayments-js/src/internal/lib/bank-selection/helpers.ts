import { IAvailableBankData, IBankData, BankCountries } from "./contracts";
import { bankListData } from "./available-banks-data";
import { ApmProviders, ExpressPayEvents } from "../enums";
import { bus } from "../..";
import { ApmInternalEvents } from "../../../apm/enums";
import { isUrlValid } from "../../../apm/non-card-payments/components/common";
import handleRedirectAction from "../../../apm/non-card-payments/components/redirect-action-handler";
import { changeCreditCardFormFieldsVisibility } from "../../../common/html-element";
import { createHtmlDivElement } from "../installments/helpers/html-element";
import { CardFormFieldNames, ExpressPayFieldNames } from "../../../common/enums";

export const isBankSelectionAvailable = (countryCode: string, currencyCode: string): boolean => {
    // TODO (Bank Selection): Add the logic to calculate if the Bank selection section should be available
    let isAvailable = false;
    if (countryCode && countryCode !== 'GB') {
        isAvailable = true;
    }
    return isAvailable;
};

export const getAvailableBanksByCountry = (countryCode: string | undefined): IAvailableBankData[] => {
    // TODO (Bank Selection): Add logic to filter the bank data by country
    const availableBanksList: any = bankListData.filter(item => {
        return item.countryCode === countryCode
    })[0]?.availableBanks;
    return availableBanksList;
};

export const getAllAvailableBanks = (countryCode: string | undefined, aquirer: string | undefined): IAvailableBankData[] => {
    const availableBanks = getAvailableBanksByCountry(countryCode);
    const filteredBanksByAquirer = countryCode === BankCountries.Poland ? availableBanks : availableBanks?.filter(item => {
        if (aquirer) {
            return item.acquirer?.indexOf(aquirer) > -1
        }
    });
    return filteredBanksByAquirer
}

export const getImageUrl = (assetBaseUrl: string, provider: string, countryCode?: string | undefined): string => {
    const imageBase = assetBaseUrl + "images/";
    let url: string = '';
    switch (provider) {
        case ApmProviders.OpenBanking:
            switch (countryCode) {
                case BankCountries.Poland:
                    url = `#FFFFFF url(${imageBase}Przelew_Online_Logo.svg) no-repeat 50% 50%`;
                    break;
                case BankCountries.CzechRepublic:
                    url = `#FFFFFF url(${imageBase}Bankovni_Platba_Logo.svg) no-repeat 50% 50%`;
                    break;
                case BankCountries.Slovakia:
                    url = `#FFFFFF url(${imageBase}Bankova_Platba_Logo.svg) no-repeat 50% 50%`;
                    break;
                default:
                    url = `#FFFFFF url(${imageBase}open-banking.svg) no-repeat 50% 50%`;
            }
            break;
        case ApmProviders.Blik:
            url = `#FFFFFF url(${imageBase}blik.svg) no-repeat 50% 50%`;
            break;
        case ApmProviders.ExpressPay:
            url = `#FFFFFF url(${imageBase}Express_Pay_White.svg) no-repeat 50% 50%`;
            break;
    }
    return url;
}

export const addExpressPayDetailsEventListener = (): void => {
    window.addEventListener(ExpressPayEvents.ExpressPayActionDetail, (event: any) => {
        let redirectUrl:string = '';
        if(event.detail.provider !== ApmProviders.ExpressPay){
            const saveCardEnabled:any = document.getElementById('save-card-checkbox');
            if(saveCardEnabled.checked){
                redirectUrl = event.detail.redirectUrl
            }else {
                return;
            }
        } else {
            redirectUrl = event.detail.redirectUrl;
        }
        if (!isUrlValid(redirectUrl)) {
            bus.emit("error", {
                error: true,
                reasons: [{ code: "ERROR", message: "Url Error: Invalid url." }],
            });
            return;
        }

        const footerFields:any = [
            '.credit-card-shield',
            '.credit-card-logo',
        ];

        footerFields.forEach((field: string) => {
            const element = document.querySelector(field);
            if (element) {
                element.setAttribute('style', 'display: none');
            }
        });

        const existingRedirectContent = document.getElementById(`redirect-content`);
        if (existingRedirectContent) existingRedirectContent.remove();

        const contentDiv = createHtmlDivElement({
            id: `redirect-content`,
            className: `express-pay-content`,
        });
        const targetElement: any = document.querySelector('.secure-payment-form');
        targetElement?.appendChild(contentDiv);

        const onClickSelectAnotherPaymentMethod = () => {
            contentDiv.setAttribute('style', 'display: none');
            changeCreditCardFormFieldsVisibility(true);

            window.dispatchEvent(new CustomEvent(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
        };
        handleRedirectAction(contentDiv, { redirectUrl, onClickSelectAnotherPaymentMethod });
        changeCreditCardFormFieldsVisibility(false);
    })
}

export const getCountryForQRPlatbaBank = (countryCode: string): boolean => {
    if (countryCode === BankCountries.CzechRepublic || countryCode === BankCountries.Slovakia) {
        return true;
    }
    return false;
}

export const getExpressPayDetailsKeys = () => {
    const detailsMap = new Map(
        [
            [ExpressPayFieldNames.EmailId, "email"],
            [ExpressPayFieldNames.CountryCode, "phoneCountryCode"],
            [ExpressPayFieldNames.Phone, "phoneNumber"],
            [ExpressPayFieldNames.BillingAddress, "billingAddress"],
            [ExpressPayFieldNames.Country, "billingCountry"],
            [ExpressPayFieldNames.ShippingAddress, "shippingAddress"],
            [ExpressPayFieldNames.ShippingCountry, "shippingCountry"],
            [ExpressPayFieldNames.ShippingName, "shippingAddressName"],
            [CardFormFieldNames.CardHolderName, "nameOnCard"],
            ["paymentToken", "paymentToken"],
            ["maskedCardNumber", "masked_number_last4"],
            ["expiryMonth", "expiryMonth"],
            ["expiryYear", "expiryYear"],
            ["cardBrand", "cardType"]
        ]
    )
    return detailsMap;
}

export const getExpressPayQueryParams = (expressPayOptions: any, details?: any): string => {
    const shippingSameAsBilling: any = localStorage.getItem("shippingSameAsBilling");
    if((shippingSameAsBilling === "true")) {
        if(details.billingAddress){
            details.shippingAddress = details.billingAddress;
        }
        if(details.nameOnCard && !details.shippingAddressName) {
            details.shippingAddressName = details.nameOnCard;
        }
    }
    const notifications: any = {
        paramName: "notifications",
        returnUrl: expressPayOptions.paymentUri,
        cancelUrl: expressPayOptions.cancelUri
    }
    const options: any = {
        paramName: "options",
    }

    if(expressPayOptions.isShippingRequired !== undefined){
        options.isShippingRequired = expressPayOptions.isShippingRequired;
    }
    if(expressPayOptions.payButtonLabel){
        options.payButtonLabel = expressPayOptions.payButtonLabel;
    }

    const merchantInfo: any = {
      paramName: "merchantInfo",
      merchantId: ""
    }

    if (details && Object.keys(details).length > 0) {
        details.paramName = "details";
    }

    if(details.merchantId){
        merchantInfo.merchantId = details.merchantId;
        delete details.merchantId;
    }

    const objectsToCreateUrl = details && Object.keys(details).length > 0 ? [details, notifications, options] : [notifications, options];

    if(merchantInfo.merchantId){
        objectsToCreateUrl.push(merchantInfo);
    }

    let query = "?";

    for (let i = 0; i < objectsToCreateUrl.length; i++) {
        const paramName = objectsToCreateUrl[i].paramName;
        delete objectsToCreateUrl[i].paramName;

        const jsonString = JSON.stringify(objectsToCreateUrl[i]);

        const base64EncodedString = btoa(jsonString);
        const utf8Encoded = (encodeURIComponent(base64EncodedString));

        query += `${paramName}=${utf8Encoded}`;
        if (objectsToCreateUrl[i + 1]) {
            query += "&"
        }
    }
    return query;
}

export const formatBillingAddress = (fields: any, state:string): string => {
    if (!fields) return '';
    let address = '';
    const detailsMap = fields.map((field: any) => {
        return field.name;
    });
        address = '';
        if (detailsMap.indexOf(ExpressPayFieldNames.BillingAddress) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.BillingAddress)].value}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.BillingApt) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.BillingApt)].value}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.BillingCity) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.BillingCity)].value}, `;
        }
        if (state) {
            address += `${state}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.BillingPostalCode) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.BillingPostalCode)].value}`;
        }
    return address.trimEnd().endsWith(",") ? address.trimEnd().slice(0, -1) : address.trimEnd();
}

export const formatShippingAddress = (fields: any,state:string): string => {
    if (!fields) return '';
    let address = '';
    const detailsMap = fields.map((field: any) => {
        return field.name;
    });
        address = '';
        if (detailsMap.indexOf(ExpressPayFieldNames.ShippingAddress) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.ShippingAddress)].value}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.ShippingApt) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.ShippingApt)].value}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.ShippingCity) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.ShippingCity)].value}, `;
        }
        if (state) {
            address += `${state}, `;
        }
        if (detailsMap.indexOf(ExpressPayFieldNames.ShippingPostalCode) > -1) {
            address += `${fields[detailsMap.indexOf(ExpressPayFieldNames.ShippingPostalCode)].value}`;
        }
    return address.trimEnd().endsWith(",") ? address.trimEnd().slice(0, -1) : address.trimEnd();
}

export const addIfValue = (obj: any, key: string, value: any) => {
  if (value !== undefined && value !== null && value !== "") {
    obj[key] = value;
  }
};
