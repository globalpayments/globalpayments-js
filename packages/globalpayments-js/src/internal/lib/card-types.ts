export interface ICardType {
  code: string;
  regex: RegExp;
  format: RegExp;
  lengths: number[];
}

/**
 * typeByNumber
 *
 * Helper function to grab the ICardType for a given card number.
 *
 * @param cardNumber - The card number
 */
export function typeByNumber(cardNumber: string): ICardType | undefined {
  let cardType;

  if (!cardNumber) {
    return undefined;
  }
  if (cardNumber.replace(/^\s+|\s+$/gm, "").length < 4) {
    return undefined;
  }

  for (const i in cardTypes) {
    if (!cardTypes.hasOwnProperty(i)) {
      continue;
    }

    cardType = cardTypes[i];
    if (cardType && cardType.regex && cardType.regex.test(cardNumber)) {
      break;
    }
  }

  return cardType;
}

/**
 * typeByTrack
 *
 * @param data - track data
 * @param isEncrypted - (default: false)
 * @param trackNumber
 */
export function typeByTrack(
  data: string,
  isEncrypted = false,
  trackNumber?: string,
) {
  let cardNumber = "";

  if (isEncrypted && trackNumber && trackNumber === "02") {
    cardNumber = data.split("=")[0];
  } else {
    let temp = data.split("%");
    if (temp[1]) {
      temp = temp[1].split("^");
      if (temp[0]) {
        cardNumber = temp[0].toString().substr(1);
      }
    }
  }

  return typeByNumber(cardNumber);
}

/**
 * luhnCheck
 *
 * Runs a mod 10 check on a given card number.
 *
 * @param cardNumber - The card number
 */
export function luhnCheck(cardNumber: string): boolean {
  let odd = true;
  let i = 0;
  let sum = 0;
  let digit: number;

  if (!cardNumber) {
    return false;
  }

  const digits = cardNumber.split("").reverse();
  const length = digits.length;

  for (i; i < length; i++) {
    digit = parseInt(digits[i], 10);
    odd = !odd;
    if (odd) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

const cardTypes: ICardType[] = [
  {
    code: "visa",
    format: /(\d{1,4})/g,
    lengths: [16, 18, 19],
    regex: /^4/,
  },
  {
    code: "mastercard",
    format: /(\d{1,4})/g,
    lengths: [16],
    regex: /^(5[1-5]|2[2-7])/,
  },
  {
    code: "amex",
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    lengths: [15],
    regex: /^3[47]/,
  },
  {
    code: "diners",
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    lengths: [14, 16, 19],
    regex: /^3[0689]/,
  },
  {
    code: "discover",
    format: /(\d{1,4})/g,
    lengths: [16, 19],
    regex: /^6([045]|22)/,
  },
  {
    code: "jcb",
    format: /(\d{1,4})/g,
    lengths: [16, 17, 18, 19],
    regex: /^35/,
  },
  {
    code: "unknown",
    format: /(\d{1,4})/g,
    lengths: [19],
    regex: /^[0-9]/,
  },
];

export default cardTypes;
