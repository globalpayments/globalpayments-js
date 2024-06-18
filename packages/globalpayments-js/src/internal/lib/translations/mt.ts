// MT - Maltese
const mt = {
  labels: {
    "card-number": "Numru tal-Kard",
    "card-expiration": "Data ta’ Skadenza tal-Kard",
    "card-cvv": "CVV tal-Kard",
    "card-holder-name": "Isem id-Detentur tal-Kard",
    "submit": "Issottometti"
  },
  values: {
    "card-track": "Aqra l-Kard",
    "submit": "Issottometti"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Huwa meħtieġ Numru tal-Kard',
      CharactersLessThan12: 'In-Numru tal-Kard irid ikun jikkonsisti f’mill-inqas 12-il numru',
      NumberIsNotValid: 'In-Numru tal-Kard mhuwiex validu',
      NotAllowedCardType: 'Dan it-tip ta’ kard ma jistax jiġi pproċessat, jekk jogħġbok uża Kard oħra'
    },
    CardExpiration: {
      NotCompleted: 'Jekk jogħġbok daħħal xahar/sena validi',
      YearNotValid: 'Is-sena mhix valida',
      MonthNotValid: 'Ix-xahar mhux validu',
      ExpiryDateNotValid: 'Id-Data ta’ Skadenza mhix valida',
    },
    CardCvv: {
      CodeIsNotValid: 'Is-CVV tal-Kard mhix valida',
      CodeIsLessThan3Digits: 'Is-CVV tal-Kard qasir wisq',
      CodeMustBe3Digits: 'Is-CVV tal-Kard irid ikollu 3 ċifri',
      AmexCodeMustBe4Digits: 'Is-CVV tal-Kard għal Amex irid ikollu 4 ċifri',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Jekk jogħġbok daħħal Isem tad-Detentur tal-Kard validu',
      CharactersMoreThan100: 'L-Isem tad-Detentur tal-Kard irid ikollu mill-inqas 100 karattru'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo kriptat SSL 256-bit',
    "ssl-msg": '256-bit SSL<br>kriptat',
    "security-msg-alt": 'Assigurat minn Global Payments',
    "security-msg": 'Ipproċessat b’mod sigur minn <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Kodiċi tas-Sigurtà',
    "aria-label": 'Informazzjoni dwar il-Kodiċi tas-Sigurtà',
    "text": 'It-3 ċifri addizzjonali fuq wara tal-kard tiegħek. Għal American Express, huma l-4 ċifri addizzjonali fuq in-naħa ta’ quddiem tal-kard tiegħek.'
  },
  "other-cards-label": 'Jew daħħal id-dettalji tal-kard manwalment',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Pay ma ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default mt;