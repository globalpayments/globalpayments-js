// ja - Japanese
const ja = {
  labels: {
    "card-number": "カード番号",
    "card-expiration": "カード有効期限",
    "card-cvv": "カード CVV",
    "card-holder-name": "カード名義人",
    "submit": "送信"
  },
  values: {
    "card-track": "カードを読む",
    "submit": "送信"
  },
  validationMessages: {
    CardNumber: {
      Required: 'カード番号は必須です。',
      CharactersLessThan12: 'カード番号は少なくとも 12 桁でなければなりません。',
      NumberIsNotValid: 'カード番号が無効です。',
      NotAllowedCardType: 'このカードタイプは処理できません。別のカードをご使用ください。'
    },
    CardExpiration: {
      NotCompleted: '有効な月/年を入力してください。',
      YearNotValid: '年が無効です。',
      MonthNotValid: '月が無効です。',
      ExpiryDateNotValid: '有効期限が無効です。',
    },
    CardCvv: {
      CodeIsNotValid: 'カード CVV が無効です。',
      CodeIsLessThan3Digits: 'カード CVV が短すぎます。',
      CodeMustBe3Digits: 'カード CVV は 3 桁でなければなりません。',
      AmexCodeMustBe4Digits: 'アメックスのカード CVV は 4 桁でなければなりません。',
    },
    CardHolderName: {
      NotValidCardHolderName: '有効なカード名義人を入力してください。',
      CharactersMoreThan100: 'カード名義人は最大 100 文字です。'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256 ビット SSL 暗号化ロゴ',
    "ssl-msg": '256 ビット SSL<br>暗号化',
    "security-msg-alt": 'Global Payments によるセキュリティ保護',
    "security-msg": '<strong>Global Payments</strong> によって安全に処理されます'
  },
  tooltip: {
    "title": 'セキュリティコード',
    "aria-label": 'セキュリティコードについて',
    "text": 'カードの裏面にある追加の 3 桁の数字です。アメリカンエキスプレスの場合は、カードの表面にある追加の 4 桁の数字です。'
  },
  "other-cards-label": 'またはカード情報を手動で入力する',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `で支払う ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default ja;