import {bus} from "../internal";

export const getCurrencySymbol = (currencyCode: string): string => {
    const DEFAULT_CURRENCY_SYMBOL = '$';
    const currency = availableCurrencies.find(x => x.code === currencyCode);
    return currency ? currency.symbol : DEFAULT_CURRENCY_SYMBOL;
}

export const addCurrencyToAmount = (currency: string, amount: string | number | undefined): string => {
    const sanitizedAmount = (amount !== undefined && amount !== null) ? amount : 0;

    return `${getCurrencySymbol(currency)}${sanitizedAmount}`;
}

export const availableCurrencies = [
    {
        "description": "Albania Lek",
        "code": "ALL",
        "symbol": "Lek"
    },
    {
        "description": "Afghanistan Afghani",
        "code": "AFN",
        "symbol": "؋"
    },
    {
        "description": "Argentina Peso",
        "code": "ARS",
        "symbol": "$"
    },
    {
        "description": "Aruba Guilder",
        "code": "AWG",
        "symbol": "ƒ"
    },
    {
        "description": "Australia Dollar",
        "code": "AUD",
        "symbol": "$"
    },
    {
        "description": "Azerbaijan Manat",
        "code": "AZN",
        "symbol": "₼"
    },
    {
        "description": "Bahamas Dollar",
        "code": "BSD",
        "symbol": "$"
    },
    {
        "description": "Barbados Dollar",
        "code": "BBD",
        "symbol": "$"
    },
    {
        "description": "Belarus Ruble",
        "code": "BYN",
        "symbol": "Br"
    },
    {
        "description": "Belize Dollar",
        "code": "BZD",
        "symbol": "BZ$"
    },
    {
        "description": "Bermuda Dollar",
        "code": "BMD",
        "symbol": "$"
    },
    {
        "description": "Bolivia Bolíviano",
        "code": "BOB",
        "symbol": "$b"
    },
    {
        "description": "Bosnia and Herzegovina Convertible Mark",
        "code": "BAM",
        "symbol": "KM"
    },
    {
        "description": "Botswana Pula",
        "code": "BWP",
        "symbol": "P"
    },
    {
        "description": "Bulgaria Lev",
        "code": "BGN",
        "symbol": "лв"
    },
    {
        "description": "Brazil Real",
        "code": "BRL",
        "symbol": "R$"
    },
    {
        "description": "Brunei Darussalam Dollar",
        "code": "BND",
        "symbol": "$"
    },
    {
        "description": "Cambodia Riel",
        "code": "KHR",
        "symbol": "៛"
    },
    {
        "description": "Canada Dollar",
        "code": "CAD",
        "symbol": "$"
    },
    {
        "description": "Cayman Islands Dollar",
        "code": "KYD",
        "symbol": "$"
    },
    {
        "description": "CFA franc BCEAO",
        "code": "XOF",
        "symbol": "F",
        "exponents" : 0
    },
    {
        "description": "Chile Peso",
        "code": "CLP",
        "symbol": "$"
    },
    {
        "description": "China Yuan Renminbi",
        "code": "CNY",
        "symbol": "¥"
    },
    {
        "description": "Colombia Peso",
        "code": "COP",
        "symbol": "$"
    },
    {
        "description": "Costa Rica Colon",
        "code": "CRC",
        "symbol": "₡"
    },
    {
        "description": "Croatia Kuna",
        "code": "HRK",
        "symbol": "kn"
    },
    {
        "description": "Cuba Peso",
        "code": "CUP",
        "symbol": "₱"
    },
    {
        "description": "Czech Republic Koruna",
        "code": "CZK",
        "symbol": "Kč"
    },
    {
        "description": "Denmark Krone",
        "code": "DKK",
        "symbol": "kr"
    },
    {
        "description": "Dominican Republic Peso",
        "code": "DOP",
        "symbol": "RD$"
    },
    {
        "description": "East Caribbean Dollar",
        "code": "XCD",
        "symbol": "$"
    },
    {
        "description": "Egypt Pound",
        "code": "EGP",
        "symbol": "£"
    },
    {
        "description": "El Salvador Colon",
        "code": "SVC",
        "symbol": "$"
    },
    {
        "description": "Euro Member Countries",
        "code": "EUR",
        "symbol": "€"
    },
    {
        "description": "Falkland Islands (Malvinas) Pound",
        "code": "FKP",
        "symbol": "£"
    },
    {
        "description": "Fiji Dollar",
        "code": "FJD",
        "symbol": "$"
    },
    {
        "description": "Ghana Cedi",
        "code": "GHS",
        "symbol": "¢"
    },
    {
        "description": "Gibraltar Pound",
        "code": "GIP",
        "symbol": "£"
    },
    {
        "description": "Guatemala Quetzal",
        "code": "GTQ",
        "symbol": "Q"
    },
    {
        "description": "Guernsey Pound",
        "code": "GGP",
        "symbol": "£"
    },
    {
        "description": "Guyana Dollar",
        "code": "GYD",
        "symbol": "$"
    },
    {
        "description": "Honduras Lempira",
        "code": "HNL",
        "symbol": "L"
    },
    {
        "description": "Hong Kong Dollar",
        "code": "HKD",
        "symbol": "$"
    },
    {
        "description": "Hungary Forint",
        "code": "HUF",
        "symbol": "Ft"
    },
    {
        "description": "ICELANDIC KRONA",
        "code": "ISK",
        "symbol": "kr",
        "exponents" : 0
    },
    {
        "description": "India Rupee",
        "code": "INR",
        "symbol": "₹"
    },
    {
        "description": "Indonesia Rupiah",
        "code": "IDR",
        "symbol": "Rp"
    },
    {
        "description": "Iran Rial",
        "code": "IRR",
        "symbol": "﷼"
    },
    {
        "description": "Isle of Man Pound",
        "code": "IMP",
        "symbol": "£"
    },
    {
        "description": "Israel Shekel",
        "code": "ILS",
        "symbol": "₪"
    },
    {
        "description": "Jamaica Dollar",
        "code": "JMD",
        "symbol": "J$"
    },
    {
        "description": "YEN",
        "code": "JPY",
        "symbol": "¥",
        "exponents" : 0
    },
    {
        "description": "Jersey Pound",
        "code": "JEP",
        "symbol": "£"
    },
    {
        "description": "Jordanian dinar",
        "code": "JOD",
        "symbol": "\u2066د.ا. \u2069",
        "exponents" : 3
    },
    {
        "description": "Kazakhstan Tenge",
        "code": "KZT",
        "symbol": "лв"
    },
    {
        "description": "Kenyan shilling",
        "code": "KES",
        "symbol": "KSh"
    },
    {
        "description": "Korea (North) Won",
        "code": "KPW",
        "symbol": "₩"
    },
    {
        "description": "Won",
        "code": "KRW",
        "symbol": "₩",
        "exponents" : 0
    },
     {
        "description": "Kina",
        "code": "PGK",
        "symbol": "K"
    },
    {
        "description": "Kyrgyzstan Som",
        "code": "KGS",
        "symbol": "лв"
    },
    {
        "description": "Laos Kip",
        "code": "LAK",
        "symbol": "₭"
    },
    {
        "description": "Lebanon Pound",
        "code": "LBP",
        "symbol": "£"
    },
    {
        "description": "Liberia Dollar",
        "code": "LRD",
        "symbol": "$"
    },
    {
        "description": "Macedonia Denar",
        "code": "MKD",
        "symbol": "ден"
    },
    {
        "description": "Malaysia Ringgit",
        "code": "MYR",
        "symbol": "RM"
    },
    {
        "description": "Mauritius Rupee",
        "code": "MUR",
        "symbol": "₨"
    },
    {
        "description": "Mexico Peso",
        "code": "MXN",
        "symbol": "$"
    },
    {
        "description": "Mongolia Tughrik",
        "code": "MNT",
        "symbol": "₮"
    },
    {
        "description": "Moroccan-dirham",
        "code": "MAD",
        "symbol": "Dhs"
    },
    {
        "description": "Mozambique Metical",
        "code": "MZN",
        "symbol": "MT"
    },
    {
        "description": "Namibia Dollar",
        "code": "NAD",
        "symbol": "$"
    },
    {
        "description": "Nepal Rupee",
        "code": "NPR",
        "symbol": "₨"
    },
    {
        "description": "Netherlands Antilles Guilder",
        "code": "ANG",
        "symbol": "ƒ"
    },
    {
        "description": "New Zealand Dollar",
        "code": "NZD",
        "symbol": "$"
    },
    {
        "description": "Nicaragua Cordoba",
        "code": "NIO",
        "symbol": "C$"
    },
    {
        "description": "Nigeria Naira",
        "code": "NGN",
        "symbol": "₦"
    },
    {
        "description": "Norway Krone",
        "code": "NOK",
        "symbol": "kr"
    },
    {
        "description": "RIAL OMANI",
        "code": "OMR",
        "symbol": "﷼",
        "exponents" : 3
    },
    {
        "description": "Pakistan Rupee",
        "code": "PKR",
        "symbol": "₨"
    },
    {
        "description": "Panama Balboa",
        "code": "PAB",
        "symbol": "B/."
    },
    {
        "description": "Paraguay Guarani",
        "code": "PYG",
        "symbol": "Gs"
    },
    {
        "description": "PATACA",
        "code": "MOP",
        "symbol": "$"
    },
    {
        "description": "Peru Sol",
        "code": "PEN",
        "symbol": "S/."
    },
    {
        "description": "Philippines Peso",
        "code": "PHP",
        "symbol": "₱"
    },
    {
        "description": "Poland Zloty",
        "code": "PLN",
        "symbol": "zł"
    },
    {
        "description": "Qatar Riyal",
        "code": "QAR",
        "symbol": "﷼"
    },
    {
        "description": "Romania Leu",
        "code": "RON",
        "symbol": "lei"
    },
    {
        "description": "RUFIYAA",
        "code": "MVR",
        "symbol": "MVR"
    },
    {
        "description": "Russia Ruble",
        "code": "RUB",
        "symbol": "₽"
    },
    {
        "description": "Saint Helena Pound",
        "code": "SHP",
        "symbol": "£"
    },
    {
        "description": "Saudi Arabia Riyal",
        "code": "SAR",
        "symbol": "﷼"
    },
    {
        "description": "Serbia Dinar",
        "code": "RSD",
        "symbol": "Дин."
    },
    {
        "description": "Seychelles Rupee",
        "code": "SCR",
        "symbol": "₨"
    },
    {
        "description": "Singapore Dollar",
        "code": "SGD",
        "symbol": "$"
    },
    {
        "description": "Solomon Islands Dollar",
        "code": "SBD",
        "symbol": "$"
    },
    {
        "description": "Somalia Shilling",
        "code": "SOS",
        "symbol": "S"
    },
    {
        "description": "South Korean Won",
        "code": "KRW",
        "symbol": "₩"
    },
    {
        "description": "South Africa Rand",
        "code": "ZAR",
        "symbol": "R"
    },
    {
        "description": "Sri Lanka Rupee",
        "code": "LKR",
        "symbol": "₨"
    },
    {
        "description": "Sweden Krona",
        "code": "SEK",
        "symbol": "kr"
    },
    {
        "description": "Switzerland Franc",
        "code": "CHF",
        "symbol": "F",
        "exponents": 2
    },
    {
        "description": "Suriname Dollar",
        "code": "SRD",
        "symbol": "$"
    },
    {
        "description": "Syria Pound",
        "code": "SYP",
        "symbol": "£"
    },
    {
        "description": "Bangladeshi Taka",
        "code": "BDT",
        "symbol": "৳",
    },
    {
        "description": "Taiwan New Dollar",
        "code": "TWD",
        "symbol": "NT$"
    },
    {
        "description": "Thailand Baht",
        "code": "THB",
        "symbol": "฿"
    },
    {
        "description": "Trinidad and Tobago Dollar",
        "code": "TTD",
        "symbol": "TT$"
    },
    {
        "description": "Turkey Lira",
        "code": "TRY",
        "symbol": "₺"
    },
    {
        "description": "Tuvalu Dollar",
        "code": "TVD",
        "symbol": "$"
    },
    {
        "description": "Ukraine Hryvnia",
        "code": "UAH",
        "symbol": "₴"
    },
    {
        "description": "UAE-Dirham",
        "code": "AED",
        "symbol": "د.إ"
    },
    {
        "description": "United Kingdom Pound",
        "code": "GBP",
        "symbol": "£"
    },
    {
        "description": "United States Dollar",
        "code": "USD",
        "symbol": "$"
    },
    {
        "description": "Uruguay Peso",
        "code": "UYU",
        "symbol": "$U"
    },
    {
        "description": "Uzbekistan Som",
        "code": "UZS",
        "symbol": "лв"
    },
    {
        "description": "Venezuela Bolívar",
        "code": "VEF",
        "symbol": "Bs"
    },
    {
        "description": "Dong",
        "code": "VND",
        "symbol": "₫",
        "exponents" : 0
    },
    {
        "description": "Yemen Rial",
        "code": "YER",
        "symbol": "﷼"
    },
    {
        "description": "Zimbabwe Dollar",
        "code": "ZWD",
        "symbol": "Z$"
    },
    // Newly added currencies
    {
        "description": "BAHRAINI DINAR",
        "code": "BHD",
        "symbol": "د.ب",
        "exponents" : 3
    },
    {
        "description": "KUWAITI DINAR",
        "code": "KWD",
        "symbol": "د.ك",
        "exponents" : 3
    },

];

export const convertAmount = (amount: string, withoutDecimals = true, decimalPlaces = 2) => {
    // Replace commas with dots for proper parsing
    const sanitizedAmount = amount.replace(',', '.');

    // Parse the amount to a floating point number
    let parsedAmount = parseFloat(sanitizedAmount);

    // Return NaN if parsing fails
    if (isNaN(parsedAmount)) {
        return bus.emit("error", {
            error: true,
            reasons: [
                { code: "INVALID_AMOUNT", message: NaN },
            ],
        });
    }

    // Perform conversion based on the 'withoutDecimals' parameter
    parsedAmount = withoutDecimals ? parsedAmount * 100 : parsedAmount / 100;

    // Ensure the amount has two decimal places
    return parsedAmount.toFixed(decimalPlaces);
}

export const formatAmount = (
    amount: string | number | undefined,
    currencyCode: string
): string => {
    // Replace commas with dots for proper parsing (if string)
    const sanitizedAmount = typeof amount === 'string' ? amount.replace(',', '.') : String(amount);

    // Parse the amount to a floating point number
    const parsedAmount = parseFloat(sanitizedAmount);

    // Return error if parsing fails
    if (isNaN(parsedAmount)) {
        bus.emit("error", {
            error: true,
            reasons: [
                { code: "INVALID_AMOUNT", message: NaN },
            ],
        });
        return "";
    }

    const currency = availableCurrencies.find(x => x.code === currencyCode);
    if (!currency) {
        bus.emit("warning", { code: "UNKNOWN_CURRENCY", currencyCode });
    }
    const exponent: number = currency?.exponents ?? 2;
    // const exponent:any = currency?.hasOwnProperty("exponents") ? currency.exponents : 2;

    // Convert from lowest unit to display value
    const divisor = Math.pow(10, exponent);
    const displayAmount = parsedAmount / divisor;

    // Ensure the amount has the correct number of decimal places
    return displayAmount.toFixed(exponent);
}