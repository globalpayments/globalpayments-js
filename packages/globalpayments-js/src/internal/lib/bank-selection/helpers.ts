import { IAvailableBankData, IBankData, BankCountries } from "./contracts";
import { bankListData } from "./available-banks-data";
import { ApmProviders } from "../enums";

export const isBankSelectionAvailable = (countryCode: string, currencyCode: string): boolean => {
    // TODO (Bank Selection): Add the logic to calculate if the Bank selection section should be available
    let isAvailable = false;
    if(countryCode && countryCode !== 'GB') {
        isAvailable = true;
    }
    return isAvailable;
};

export const getAvailableBanksByCountry = (countryCode: string | undefined): IAvailableBankData[] => {
    // TODO (Bank Selection): Add logic to filter the bank data by country
    const availableBanksList:any = bankListData.filter(item => {
        return item.countryCode === countryCode
    })[0]?.availableBanks;
    return availableBanksList;
};

export const getAllAvailableBanks = (countryCode: string | undefined, aquirer: string | undefined): IAvailableBankData[] =>{
    const availableBanks = getAvailableBanksByCountry(countryCode);
    const filteredBanksByAquirer = countryCode === BankCountries.Poland ? availableBanks : availableBanks?.filter(item =>{
        if(aquirer){
            return item.acquirer?.indexOf(aquirer) > -1
        }
    });
    return filteredBanksByAquirer
}

export const getImageUrl = (assetBaseUrl: string,provider:string,countryCode?: string | undefined): string => {
    const imageBase = assetBaseUrl + "images/";
    let url: string = '';
    switch (provider){
        case ApmProviders.OpenBanking:
            switch(countryCode){
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
    }
    return url;
}

export const getCountryForQRPlatbaBank = (countryCode: string): boolean => {
    if(countryCode === BankCountries.CzechRepublic || countryCode === BankCountries.Slovakia){
        return true;
    }
    return false;
}
