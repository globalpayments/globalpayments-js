import { BankDisplayNames, BankCountries, IBankData, CountryCurrencies, BankAquirers } from "./contracts";

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
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "santander",
                displayName: BankDisplayNames.Santander,
                imageName: "BPUQ_PayU_Santander.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "ing",
                displayName: BankDisplayNames.Ing,
                imageName: "BPUH_PayU_ING.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "bankpekaosa",
                displayName: BankDisplayNames.Bankpekaosa,
                imageName: "BPUO_PayU_BankPekaoSA.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "mbank",
                displayName: BankDisplayNames.Mbank,
                imageName: "BPUK_PayU_mBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "alior",
                displayName: BankDisplayNames.Alior,
                imageName: "BPUA_PayU_AliorBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "bnpparibas",
                displayName: BankDisplayNames.BNP,
                imageName: "BPUD_PayU_BNPParibas.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "millenium",
                displayName: BankDisplayNames.Pkobankpolskisa,
                imageName: "BPUL_PayU_MilleniumBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "creditagricole",
                displayName: BankDisplayNames.Credit,
                imageName: "BPUG_PayU_CreditAgricole.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "citi",
                displayName: BankDisplayNames.Citi,
                imageName: "BPUF_PayU_Citi.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "inteligo",
                displayName: BankDisplayNames.Inteligo,
                imageName: "BPUI_PayU_Inteligo.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "bankispoldzielcze",
                displayName: BankDisplayNames.Banki,
                imageName: "BPUC_PayU_BankiSpoldzielcze.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "bosbank",
                displayName: BankDisplayNames.BOŚ,
                imageName: "BPUE_PayU_BOSBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "nestbank",
                displayName: BankDisplayNames.Nest,
                imageName: "BPUM_PayU_NestBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "velobank",
                displayName: BankDisplayNames.VeloBank,
                imageName: "velo_bank_logo.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "banknowysa",
                displayName: BankDisplayNames.Nowy,
                imageName: "BPUB_PayU_BankNowySA.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "plusbank",
                displayName: BankDisplayNames.Plus,
                imageName: "BPUP_PayU_PlusBank.svg",
                acquirer: [BankAquirers.Eservice]
            },
            {
                name: "bankpocztowy",
                displayName: BankDisplayNames.Pocztowy,
                imageName: "bank-pocztowy-logo.svg",
                acquirer: [BankAquirers.Eservice]
            },
        ],
    },
    {
        countryCode:BankCountries.CzechRepublic,
        currencyCode:CountryCurrencies.CzechRepublic,
        allowedAquirers:[BankAquirers.Erstecz, BankAquirers.Eservicecba],
        availableBanks: [
            {
                name: "qrcz",
                displayName: BankDisplayNames.QRPlatba,
                imageName: "QR_Platba_Logo.svg",
                acquirer: [BankAquirers.Erstecz]
            },
            {
                name: "ceskasporitelna",
                displayName: BankDisplayNames.Česká,
                imageName: "BCCS_CeskaSporitlena2023Blue.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "csob",
                displayName: BankDisplayNames.ČSOB,
                imageName: "BCOB_CSOB.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "komercnibanka",
                displayName: BankDisplayNames.Komerční,
                imageName: "BCKB_KomercniBanka.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "raiffesenbank",
                displayName: BankDisplayNames.Raiffesenbank,
                imageName: "BCRB_RaiffeisenBank2023.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "fiobanka",
                displayName: BankDisplayNames.Fio,
                imageName: "BSFI_FioBanka.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "monetamoneybank",
                displayName: BankDisplayNames.MONETA,
                imageName: "BCMO_MonetaMoneyBank.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "airbank",
                displayName: BankDisplayNames.AirBank,
                imageName: "BCAI_AirBank.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "mbank",
                displayName: BankDisplayNames.Mbank,
                imageName: "BPUK_PayU_mBank.svg",
                acquirer: [BankAquirers.Erstecz, BankAquirers.Eservicecba]
            },
            {
                name: "postacz",
                displayName: BankDisplayNames.postacz,
                imageName: "Ceska posta.svg",
                acquirer: [BankAquirers.Eservicecba]
            },
            {
                name: "unicredit",
                displayName: BankDisplayNames.unicredit,
                imageName: "BSUB_UniCreditBank.svg",
                acquirer: [BankAquirers.Eservicecba]
            },
            {
                name: "creditasbanka",
                displayName: BankDisplayNames.creditasbanka,
                imageName: "Banka Creditas.svg",
                acquirer: [BankAquirers.Eservicecba]
            },
            {
                name: "jtbanka",
                displayName: BankDisplayNames.jtbanka,
                imageName: "J&T BANKA.svg",
                acquirer: [BankAquirers.Eservicecba]
            }
        ],
    },
    {
        countryCode:BankCountries.Slovakia,
        currencyCode:CountryCurrencies.Slovakia,
        allowedAquirers:[BankAquirers.Erste, BankAquirers.Eservicecba],
        availableBanks: [
            {
                name: "qrsk",
                displayName: BankDisplayNames.QRPlatba,
                imageName: "QR_Platba_Logo.svg",
                acquirer: [BankAquirers.Erste]
            },
            {
                name: "slovenskasporitelna",
                displayName: BankDisplayNames.Slovenská,
                imageName: "logo-slovenska-sporitelna 1.svg",
                acquirer: [BankAquirers.Erste, BankAquirers.Eservicecba]
            },
            {
                name: "tatrabanka",
                displayName: BankDisplayNames.Tatra,
                imageName: "BSTB_TatraBanka.svg",
                acquirer: [BankAquirers.Erste, BankAquirers.Eservicecba]
            },
            {
                name: "vubbanka",
                displayName: BankDisplayNames.VÚB,
                imageName: "BSVB_VUBBanka.svg",
                acquirer: [BankAquirers.Erste, BankAquirers.Eservicecba]
            },
            {
                name: "csob",
                displayName: BankDisplayNames.ČSOB,
                imageName: "BCOB_CSOB.svg",
                acquirer: [BankAquirers.Erste]
            },
            {
                name: "365bank",
                displayName: BankDisplayNames.bank365,
                imageName: "365 bank.svg",
                acquirer: [BankAquirers.Eservicecba]
            },
            {
                name: "viamo",
                displayName: BankDisplayNames.viamo,
                imageName: "viamo.svg",
                acquirer: [BankAquirers.Eservicecba]
            }
        ],
    }
];

export const countryList: any = [BankCountries.CzechRepublic, BankCountries.Poland, BankCountries.Slovakia, BankCountries.UK];
