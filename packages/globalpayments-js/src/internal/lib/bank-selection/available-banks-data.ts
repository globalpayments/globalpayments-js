import { BankDisplayNames, BankCountries, IBankData, CountryCurrencies } from "./contracts";

export const bankListData: IBankData[] = [
    // TODO (Bank Selection): Add the rest of the bank data or reshape the data structure
    {
        countryCode:BankCountries.Poland,
        currencyCode:CountryCurrencies.Poland,
        availableBanks: [
            {
                name: "pkobankpolskisa",
                displayName: BankDisplayNames.Pkobankpolskisa,
                imageName: "BPUJ_PayU_IPKO_BankPolski.svg",
            },
            {
                name: "santander",
                displayName: BankDisplayNames.Santander,
                imageName: "BPUQ_PayU_Santander.svg",
            },
            {
                name: "ing",
                displayName: BankDisplayNames.Ing,
                imageName: "BPUH_PayU_ING.svg",
            },
            {
                name: "bankpekaosa",
                displayName: BankDisplayNames.Bankpekaosa,
                imageName: "BPUO_PayU_BankPekaoSA.svg",
            },
            {
                name: "mbank",
                displayName: BankDisplayNames.Mbank,
                imageName: "BPUK_PayU_mBank.svg",
            },
            {
                name: "alior",
                displayName: BankDisplayNames.Alior,
                imageName: "BPUA_PayU_AliorBank.svg",
            },
            {
                name: "bnpparibas",
                displayName: BankDisplayNames.BNP,
                imageName: "BPUD_PayU_BNPParibas.svg",
            },
            {
                name: "millenium",
                displayName: BankDisplayNames.Pkobankpolskisa,
                imageName: "BPUL_PayU_MilleniumBank.svg",
            },
            {
                name: "creditagricole",
                displayName: BankDisplayNames.Credit,
                imageName: "BPUG_PayU_CreditAgricole.svg",
            },
            {
                name: "citi",
                displayName: BankDisplayNames.Citi,
                imageName: "BPUF_PayU_Citi.svg",
            },
            {
                name: "inteligo",
                displayName: BankDisplayNames.Inteligo,
                imageName: "BPUI_PayU_Inteligo.svg",
            },
            {
                name: "bankispoldzielcze",
                displayName: BankDisplayNames.Banki,
                imageName: "BPUC_PayU_BankiSpoldzielcze.svg",
            },
            {
                name: "bosbank",
                displayName: BankDisplayNames.BOŚ,
                imageName: "BPUE_PayU_BOSBank.svg",
            },
            {
                name: "nestbank",
                displayName: BankDisplayNames.Nest,
                imageName: "BPUM_PayU_NestBank.svg",
            },
            {
                name: "velobank",
                displayName: BankDisplayNames.VeloBank,
                imageName: "velo_bank_logo.svg",
            },
            {
                name: "banknowysa",
                displayName: BankDisplayNames.Nowy,
                imageName: "BPUB_PayU_BankNowySA.svg",
            },
            {
                name: "plusbank",
                displayName: BankDisplayNames.Plus,
                imageName: "BPUP_PayU_PlusBank.svg",
            },
            {
                name: "bankpocztowy",
                displayName: BankDisplayNames.Pocztowy,
                imageName: "bank-pocztowy-logo.svg",
            },
        ],
    },
    {
        countryCode:BankCountries.CzechRepublic,
        currencyCode:CountryCurrencies.CzechRepublic,
        availableBanks: [
            {
                name: "qrcz",
                displayName: BankDisplayNames.QRPlatba,
                imageName: "QR_Platba_Logo.svg",
            },
            {
                name: "ceskasporitelna",
                displayName: BankDisplayNames.Česká,
                imageName: "BCCS_CeskaSporitlena2023Blue.svg",
            },
            {
                name: "csob",
                displayName: BankDisplayNames.ČSOB,
                imageName: "BCOB_CSOB.svg",
            },
            {
                name: "komercnibanka",
                displayName: BankDisplayNames.Komerční,
                imageName: "BCKB_KomercniBanka.svg",
            },
            {
                name: "raiffesenbank",
                displayName: BankDisplayNames.Raiffesenbank,
                imageName: "BCRB_RaiffeisenBank2023.svg",
            },
            {
                name: "fiobanka",
                displayName: BankDisplayNames.Fio,
                imageName: "BSFI_FioBanka.svg",
            },
            {
                name: "monetamoneybank",
                displayName: BankDisplayNames.MONETA,
                imageName: "BCMO_MonetaMoneyBank.svg",
            },
            {
                name: "airbank",
                displayName: BankDisplayNames.AirBank,
                imageName: "BCAI_AirBank.svg",
            },
            {
                name: "mbank",
                displayName: BankDisplayNames.Mbank,
                imageName: "BPUK_PayU_mBank.svg",
            },
        ],
    },
    {
        countryCode:BankCountries.Slovakia,
        currencyCode:CountryCurrencies.Slovakia,
        availableBanks: [
            {
                name: "qrsk",
                displayName: BankDisplayNames.QRPlatba,
                imageName: "QR_Platba_Logo.svg",
            },
            {
                name: "slovenskasporitelna",
                displayName: BankDisplayNames.Slovenská,
                imageName: "logo-slovenska-sporitelna 1.svg",
            },
            {
                name: "tatrabanka",
                displayName: BankDisplayNames.Tatra,
                imageName: "BSTB_TatraBanka.svg",
            },
            {
                name: "vubbanka",
                displayName: BankDisplayNames.VÚB,
                imageName: "BSVB_VUBBanka.svg",
            },
            {
                name: "csob",
                displayName: BankDisplayNames.ČSOB,
                imageName: "BCOB_CSOB.svg",
            },
            {
                name: "unicreditbank",
                displayName: BankDisplayNames.UniCredit,
                imageName: "BSUB_UniCreditBank.svg",
            },
            {
                name: "fiobanka",
                displayName: BankDisplayNames.Fio,
                imageName: "BSFI_FioBanka.svg",
            },
            {
                name: "mbank",
                displayName: BankDisplayNames.Mbank,
                imageName: "BPUK_PayU_mBank.svg",
            },
        ],
    }
];
