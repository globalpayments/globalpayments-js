const zh = {
  labels: {
    "card-cvv": "安全碼",
    "card-expiration": "到期日",
    "card-holder-name": "持卡人姓",
    "card-number": "卡號",
    "submit": "立即付款"
  },
  values: {
    "submit": "立即付款"
  },
  validationMessages: {
    CardNumber: {
      Required: '卡號為必填欄位',
      CharactersLessThan12: '卡號至少為 12 位數',
      NumberIsNotValid: '卡號無效',
      NotAllowedCardType: '無法處理此卡種，請使用其他卡片'
    },
    CardExpiration: {
      NotCompleted: '請輸入有效月/年',
      YearNotValid: '年份无效',
      MonthNotValid: '月份无效',
      ExpiryDateNotValid: '請輸入有效月/年',
    },
    CardCvv: {
      CodeIsNotValid: '安全碼無效',
      CodeIsLessThan3Digits: '安全碼過短',
      CodeMustBe3Digits: '安全碼為 3 位數',
      AmexCodeMustBe4Digits: '美國運通卡安全碼為 4 位數',
    },
    CardHolderName: {
      NotValidCardHolderName: '請輸入有效姓名',
      CharactersMoreThan100: '持卡人姓名最多 100 个字符'
    }
  },
  footer: {
    "ssl-msg-alt": '256位SSL加密标志',
    "ssl-msg": "256 位 SSL<br>加密",
    "security-msg-alt": '由 Global Payments 提供担保',
    "security-msg": "通过以下方式进行安全处理<strong>Global Payments</strong>"
  },
  tooltip: {
    "title": '安全码',
    "aria-label": '有关安全码的信息',
    "text": '卡片背後的末三碼。 若您持有美國運通卡，安全碼為卡片正面的末四碼。'
  },
  "other-cards-label": '或手动输入卡详细信息',
  QR: {
    button: {
      text: '选择其他付款方式',
      "aria-label": '选择其他付款方式'
    },
    loading: "加载中",
    redirectScreen: {
      redirectingToPaymentPageMessage: '重定向至支付页面',
    },
  },
}

export default zh;