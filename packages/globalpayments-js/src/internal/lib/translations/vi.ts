// vi - Vietnamese
const vi = {
  labels: {
    "card-number": "Số Thẻ",
    "card-expiration": "Ngày Hết Hạn của Thẻ",
    "card-cvv": "CVV của Thẻ",
    "card-holder-name": "Tên Chủ Thẻ",
    "email-id":"Email",
    "phone-number":"Mobile Number",
    "billing-address":"Billing address",
    "country":"Country",
    "shipping-address-country":"Country",
    "shipping-address":"Shipping address",
    "shipping-name":"Full Name",
    "country-code":"Mobile Number",
    "billing-city":"City",
    "shipping-city":"City",
    "billing-state":"State/Province",
    "shipping-state":"State/Province",
    "billing-apt":"Apt, Suite (optional)",
    "shipping-apt":"Apt, Suite (optional)",
    "billing-postal-code":"Postal Code",
    "shipping-postal-code":"Postal Code",
    "apt-suite":"Apt, Suite (optional)",
    "city":"City",
    "state":"State/Province",
    "postal-code":"Postal Code",
    "submit": "Gửi"
  },
  values: {
    "card-track": "Đọc Thẻ",
    "submit": "Gửi"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Cần có Số Thẻ',
      CharactersLessThan12: 'Số Thẻ phải gồm ít nhất 12 chữ số',
      NumberIsNotValid: 'Số Thẻ không hợp lệ',
      NotAllowedCardType: 'Không thể xử lý loại thẻ này, vui lòng sử dụng Thẻ khác'
    },
    CardExpiration: {
      NotCompleted: 'Vui lòng nhập tháng/năm hợp lệ',
      YearNotValid: 'Năm không hợp lệ',
      MonthNotValid: 'Tháng không hợp lệ',
      ExpiryDateNotValid: 'Ngày Hết Hạn không hợp lệ',
    },
    CardCvv: {
      CodeIsNotValid: 'CVV của Thẻ không hợp lệ',
      CodeIsLessThan3Digits: 'CVV của Thẻ quá ngắn',
      CodeMustBe3Digits: 'CVV của Thẻ phải có 3 chữ số',
      AmexCodeMustBe4Digits: 'CVV của Thẻ Amex phải có 4 chữ số',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Vui lòng nhập Tên Chủ Thẻ hợp lệ',
      CharactersMoreThan100: 'Tên Chủ Thẻ có thể chứa tối đa 100 ký tự'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo của phương thức mã hóa SSL 256 bit',
    "ssl-msg": 'Mã hóa<br>SSL 256 bit',
    "security-msg-alt": 'Được bảo mật bởi Global Payments',
    "security-msg": 'Được xử lý bảo mật bởi <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Mã Bảo Mật',
    "aria-label": 'Thông tin về Mã Bảo Mật',
    "text": '3 chữ số bổ sung ở mặt sau thẻ của bạn. Đối với American Express, đó là 4 chữ số bổ sung ở mặt trước thẻ của bạn.'
  },
  "other-cards-label": 'Hoặc nhập thông tin của thẻ theo cách thủ công',
  QR: {
    button: {
      text: 'Chọn phương thức thanh toán khác',
      "aria-label": 'Chọn phương thức thanh toán khác'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Thanh toán bằng ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
      // getImageUrl: (assetBaseUrl: string): string => {
      //   const imageBase = assetBaseUrl + "images/";
      //   const url = `transparent url(${imageBase}open-banking.svg) no-repeat 50% 50%`
      //   return url;
      // }
    }
  },
  orderInformation: {
    amount: "Số lượng",
    orderReference: "Số đơn hàng",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vui lòng chọn ngân hàng ưa thích của bạn",
  }
}

export default vi;