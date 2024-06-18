// pt - Portuguese
const pt = {
  labels: {
    "card-number": "Número do cartão",
    "card-expiration": "Data de expiração do cartão",
    "card-cvv": "CVV do cartão",
    "card-holder-name": "Nome do detentor do cartão",
    "submit": "Enviar"
  },
  values: {
    "card-track": "Ler cartão",
    "submit": "Enviar"
  },
  validationMessages: {
    CardNumber: {
      Required: 'É necessário um número do cartão',
      CharactersLessThan12: 'O número do cartão deve ter, pelo menos, 12 dígitos',
      NumberIsNotValid: 'O número do cartão não é válido',
      NotAllowedCardType: 'Não é possível processar este tipo de cartão. Utilize outro cartão'
    },
    CardExpiration: {
      NotCompleted: 'Introduza um mês/ano válido',
      YearNotValid: 'O ano não é válido',
      MonthNotValid: 'O mês não é válido',
      ExpiryDateNotValid: 'A data de expiração não é válida',
    },
    CardCvv: {
      CodeIsNotValid: 'O CVV do cartão não é válido',
      CodeIsLessThan3Digits: 'O CVV do cartão é demasiado curto',
      CodeMustBe3Digits: 'O CVV do cartão deve ter 3 dígitos',
      AmexCodeMustBe4Digits: 'O CVV do cartão para Amex deve ter 4 dígitos',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Introduza um nome do detentor do cartão válido',
      CharactersMoreThan100: 'O nome do detentor do cartão pode ter, no máximo, 100 caracteres'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logótipo de SSL encriptado de 256 bits',
    "ssl-msg": 'SSL<br>encriptado de 256 bits',
    "security-msg-alt": 'Protegido pela Global Payments',
    "security-msg": 'Processado com segurança pela <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Código de segurança',
    "aria-label": 'Information about Security Code',
    "text": 'Os 3 dígitos adicionais localizados no verso do cartão. Para American Express, os 4 dígitos adicionais na frente do cartão.'
  },
  "other-cards-label": 'Ou introduza os detalhes do cartão manualmente',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Pagar com ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default pt;