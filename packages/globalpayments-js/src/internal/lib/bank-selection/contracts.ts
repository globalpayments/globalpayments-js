export interface IBankData {
    // TODO (Bank Selection): Add the rest of the needed bank props
    countryCode:string;
    currencyCode:string;
    availableBanks:IAvailableBankData[]
}

export interface IAvailableBankData {
    name: string;
    displayName: string;
    imageName: string;
}

export enum BankDisplayNames {
    Pkobankpolskisa = "PKO BP",
    Santander = "Santander",
    Ing = "ING Bank Śląski",
    Bankpekaosa = "PEKAO SA",
    QRPlatba = "QR Platba",
    Slovenská = "Slovenská sporiteľňa",
    Mbank = "mBank",
    Alior = "Alior Bank",
    BNP = "BNP Paribas",
    Millenium = "Millenium",
    Credit = "Credit Agricole",
    Citi = "Citi Handlowy",
    Inteligo = "Inteligo",
    Banki="Banki Spółdzielcze",
    BOŚ="BOŚ Bank",
    Nest="Nest Bank",
    VeloBank = "VeloBank",
    Nowy = "Bank Nowy S.A.",
    Plus = "PLUS BANK",
    Pocztowy = "Bank Pocztowy",
    Česká = "Česká spořitelna",
    ČSOB = "ČSOB",
    Komerční = "Komerční banka",
    Raiffesenbank = "Raiffesenbank",
    Fio = "Fio banka",
    MONETA = "MONETA Money Bank",
    AirBank = "AirBank",
    Tatra = "Tatra banka",
    VÚB = "VÚB banka",
    UniCredit = "UniCredit Bank"
    // TODO (Bank Selection): Add the rest of the Bank Display Names
};

export enum CountryCurrencies {
    Poland = "PLN",
    CzechRepublic = "CZK",
    Slovakia = "EUR"
}

export enum BankCountries {
    Poland = "PL",
    CzechRepublic = "CZ",
    Slovakia = "SK",
    // TODO (Bank Selection): Add the rest of the Bank Locations
};

export interface IBankSelectionProps {
    countryCode: string;
    currencyCode: string;
}