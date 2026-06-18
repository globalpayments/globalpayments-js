const zhTw = {
    labels: {
        "card-number": "卡號",
        "card-expiration": "卡片有效期",
        "card-cvv": "卡片安全碼",
        "card-holder-name": "持卡人姓名",
        "email-id": "電子郵件",
        "phone-number": "手機號碼",
        "billing-address": "帳單地址",
        "country": "國家",
        "shipping-address-country": "國家",
        "shipping-address": "收件地址",
        "shipping-name": "姓名",
        "country-code": "手機號碼",
        "billing-city": "城市",
        "shipping-city": "城市",
        "billing-state": "州/省",
        "shipping-state": "州/省",
        "billing-apt": "公寓、套房（選填）",
        "shipping-apt": "公寓、套房（選購）",
        "billing-postal-code": "郵遞區號",
        "shipping-postal-code": "郵遞區號",
        "apt-suite": "公寓、套房（選填）",
        "city": "城市",
        "state": "州/省",
        "postal-code": "郵遞區號",
        "submit": "提交"

    },
    values: {
        "card-track": "讀取卡片",
        "submit": "提交"
    },
    validationMessages: {
        CardNumber: {
            Required: '需提供卡號。',
            CharactersLessThan12: '卡號至少須為12位數',
            NumberIsNotValid: '卡號無效',
            NotAllowedCardType: '無法處理此卡類型，請使用其他卡片'
        },
        CardExpiration: {
            NotCompleted: '請輸入有效的月份/年份',
            YearNotValid: '年份無效',
            MonthNotValid: '月份無效',
            ExpiryDateNotValid: '有效期限無效',
        },
        CardCvv: {
            CodeIsNotValid: '卡片安全碼無效',
            CodeIsLessThan3Digits: '卡片安全碼太短',
            CodeMustBe3Digits: '卡片安全碼須為3位數字',
            AmexCodeMustBe4Digits: '美國運通卡安全碼須為4位數字',
        },
        CardHolderName: {
            NotValidCardHolderName: '請輸入有效的持卡人姓名',
            CharactersMoreThan100: '持卡人姓名最多可包含 100 個字元。'
        },
        CurrencyConversion: {
            Required: "選擇首選貨幣"
        }
    },
    footer: {
        "ssl-msg-alt": '256位元SSL加密標誌',
        "ssl-msg": '256 位元 SSL<br>加密',
        "security-msg-alt": '由 Global Payments 提供安全保障',
        "security-msg": '由 <strong>Global Payments</strong> 安全處理'
    },
    tooltip: {
        "title": '安全碼',
        "aria-label": '安全碼相關訊息',
        "text": '您卡片背面的額外 3 位數字。如果是美國運通卡，則是卡片正面的額外 4 位數字。'
    },
    "other-cards-label": '或手動輸入卡片訊息',
    QR: {
        scanRqCode: "掃描二維碼",
        payInApp: "應用程式內支付",
        amount: {
            "aria-label": '交易總額'
        },
        qrImage: {
            alt: '二維碼顯示',
            "aria-label": '二維碼顯示'
        },
        timer: {
            text: '此二維碼將於以下時間失效：',
            minutes: '分',
            seconds: '秒',
            "icon-alt": '剩餘時間圖示'
        },
        expiredScreen: {
            title: '二維碼已失效',
            alt: '二維碼已失效',
            text: '點擊下方連結返回付款選項。'
        },
        button: {
            text: '選擇其他付款方式',
            "aria-label": '選擇其他付款方式'
        },
        loading: "載入中",
        redirectScreen: {
            redirectingToPaymentPageMessage: '正在跳轉至付款頁面',
        },
    },
    apm: {
        redirectToBank: "跳轉中",
    },
    dcc: {
        label: "選擇您偏好的貨幣",
        additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string) => {
            const resource = `<p>所用匯率：1 ##VALUE1## = ##VALUE2## ##VALUE3##. 匯率加成： ##VALUE4## 高於歐洲央行利率。</p>`;

            return resource.replace('##VALUE1##', currency)
                .replace('##VALUE2##', exchangeRate)
                .replace('##VALUE3##', payerCurrency)
                .replace('##VALUE4##', marginRatePercentage);
        },
        cardCurrency: {
            tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
                const resource = `<p>本人確認已獲提供多種付款貨幣選擇，並接受所示換算匯率及最終金額，且最終選定的交易貨幣為持卡人所選貨幣。##VALUE1##.</p>
        <p>參考利率提供方：##VALUE2##,<br />
        匯率報價日期：##VALUE3##.</p>`;

                return resource.replace('##VALUE1##', payerCurrency)
                    .replace('##VALUE2##', exchangeRateSource)
                    .replace('##VALUE3##', exchangeRateTimeCreated);
            },
            "aria-label": "貨幣兌換訊息"
        },
        merchantCurrency: {
            tooltip: (exchangeRateSource: string, exchangeRateTimeCreated: string) => {
                const resource = `<p>參考利率提供方：##VALUE1##,<br />
        匯率報價日期：##VALUE2##.</p>`;

                return resource.replace('##VALUE1##', exchangeRateSource)
                    .replace('##VALUE2##', exchangeRateTimeCreated);
            },
            "aria-label": "貨幣兌換訊息"
        },
        installmentWithDcc: '貨幣換算不支援分期付款。您仍可以自己的貨幣支付全額，或切換至商家貨幣以使用分期付款選項。'
    },
    orderInformation: {
        amount: "金額",
        orderReference: "訂單參考編號",
    },
    bankSelection: {
        pleaseSelectYourPreferredBank: "請選擇您首選的銀行",
    },
    installments: {
        choosePaymentOption: '選擇全額付款或分期付款',
        payInFullLatam: '全額付款',
        payInFullVisa: '立即支付',
        monthsWithoutInterest: '數月免息',
        buyNowPayLater: '先買後付',
        months: "月數",
        eligibleForInstallmentBadgeText: "符合分期付款條件",
        payInInstallmentsText: '分期付款 ',
        apr: '年利率',
        total: '總計',
        fees: '費用',
        additionalTerms: '附加條款',
        mandatoryError: "必須接受條款和條件",
        learnMoreText: "了解更多",
        month: '月',
        includeFees: '含費用',
        include: '包括',
        furtherInfoText: '更多資訊和隱私權政策',
        footerInstallmentsTextStart: '分期付款由 ',
        footerInstallmentsTextEnd: ' 提供'
    }
}

export default zhTw;