const zhCn = {
    labels: {
        "card-number": "卡号",
        "card-expiration": "卡片有效期",
        "card-cvv": "卡片安全码",
        "card-holder-name": "持卡人姓名",
        "email-id": "电子邮件",
        "phone-number": "手机号码",
        "billing-address": "账单地址",
        "country": "国家",
        "shipping-address-country": "国家",
        "shipping-address": "收件地址",
        "shipping-name": "姓名",
        "country-code": "手机号码",
        "billing-city": "城市",
        "shipping-city": "城市",
        "billing-state": "州/省",
        "shipping-state": "州/省",
        "billing-apt": "公寓、套房（选填）",
        "shipping-apt": "公寓、套房（可选）",
        "billing-postal-code": "邮政编码",
        "shipping-postal-code": "邮政编码",
        "apt-suite": "公寓、套房（选填）",
        "city": "城市",
        "state": "州/省",
        "postal-code": "邮政编码",
        "submit": "提交"

    },
    values: {
        "card-track": "读取卡片",
        "submit": "提交"
    },
    validationMessages: {
        CardNumber: {
            Required: '需要提供卡号。',
            CharactersLessThan12: '卡号至少须为12位数',
            NumberIsNotValid: '卡号无效',
            NotAllowedCardType: '无法处理此卡类型，请使用其他卡片'
        },
        CardExpiration: {
            NotCompleted: '请输入有效的月份/年份',
            YearNotValid: '年份无效',
            MonthNotValid: '该月份无效',
            ExpiryDateNotValid: '有效期限无效',
        },
        CardCvv: {
            CodeIsNotValid: '卡片安全码无效',
            CodeIsLessThan3Digits: '卡片安全码太短',
            CodeMustBe3Digits: '卡片安全码须为3位数字',
            AmexCodeMustBe4Digits: '美国运通卡安全码须为4位数字',
        },
        CardHolderName: {
            NotValidCardHolderName: '请输入有效的持卡人姓名',
            CharactersMoreThan100: '持卡人姓名最多可包含 100 个字符。'
        },
        CurrencyConversion: {
            Required: "选择首选货币"
        }
    },
    footer: {
        "ssl-msg-alt": '256位元SSL加密标志',
        "ssl-msg": '256 位 SSL<br>加密',
        "security-msg-alt": '由 Global Payments 提供安全保障',
        "security-msg": '由 <strong>Global Payments</strong> 安全处理'
    },
    tooltip: {
        "title": '安全码',
        "aria-label": '安全码相关信息',
        "text": '您卡背面的额外 3 位数字。如果是美国运通卡，则是卡正面的额外 4 位数字。'
    },
    "other-cards-label": '或者手动输入卡片信息',
    QR: {
        scanRqCode: "扫描二维码",
        payInApp: "应用内支付",
        amount: {
            "aria-label": '交易总额'
        },
        qrImage: {
            alt: '二维码显示',
            "aria-label": '二维码显示'
        },
        timer: {
            text: '此二维码将于以下时间失效：',
            minutes: '分',
            seconds: '秒',
            "icon-alt": '剩余时间图示'
        },
        expiredScreen: {
            title: '二维码已失效',
            alt: '二维码已失效',
            text: '点击下方链接返回付款选项。'
        },
        button: {
            text: '选择其他付款方式',
            "aria-label": '选择其他付款方式'
        },
        loading: "加载中",
        redirectScreen: {
            redirectingToPaymentPageMessage: '正在跳转至支付页面',
        },
    },
    apm: {
        redirectToBank: "跳转中",
    },
    dcc: {
        label: "选择您偏好的货币",
        additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string) => {
            const resource = `<p>所用汇率：1 ##VALUE1## = ##VALUE2## ##VALUE3##. 汇率加成：##VALUE4## 高于欧洲央行利率。</p>`;

            return resource.replace('##VALUE1##', currency)
                .replace('##VALUE2##', exchangeRate)
                .replace('##VALUE3##', payerCurrency)
                .replace('##VALUE4##', marginRatePercentage);
        },
        cardCurrency: {
            tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
                const resource = `<p>本人确认已获提供多种付款货币选择，并接受所示换算汇率及最终金额，且最终选定的交易货币为持卡人所选货币。##VALUE1##.</p>
        <p>参考利率提供方：##VALUE2##,<br />
        汇率报价日期：##VALUE3##.</p>`;

                return resource.replace('##VALUE1##', payerCurrency)
                    .replace('##VALUE2##', exchangeRateSource)
                    .replace('##VALUE3##', exchangeRateTimeCreated);
            },
            "aria-label": "货币兑换信息"
        },
        merchantCurrency: {
            tooltip: (exchangeRateSource: string, exchangeRateTimeCreated: string) => {
                const resource = `<p>参考利率提供方：##VALUE1##,<br />
        汇率报价日期：##VALUE2##.</p>`;

                return resource.replace('##VALUE1##', exchangeRateSource)
                    .replace('##VALUE2##', exchangeRateTimeCreated);
            },
            "aria-label": "货币兑换信息"
        },
        installmentWithDcc: '货币换算不支持分期付款。您仍可以自己的货币支付全额，或切换至商家货币以使用分期付款选项。'
    },
    orderInformation: {
        amount: "金额",
        orderReference: "订单参考号",
    },
    bankSelection: {
        pleaseSelectYourPreferredBank: "请选择您首选的银行",
    },
    installments: {
        choosePaymentOption: '选择全额付款或分期付款',
        payInFullLatam: '全额付款',
        payInFullVisa: '立即支付',
        monthsWithoutInterest: '数月免息',
        buyNowPayLater: '先买后付',
        months: "月数",
        eligibleForInstallmentBadgeText: "符合分期付款条件",
        payInInstallmentsText: '分期付款 ',
        apr: '年利率',
        total: '总计',
        fees: '费用',
        additionalTerms: '附加条款',
        mandatoryError: "必须接受条款和条件",
        learnMoreText: "了解更多",
        month: '月',
        includeFees: '含费用',
        include: '包括',
        furtherInfoText: '更多信息和隐私政策',
        footerInstallmentsTextStart: '分期付款由 ',
        footerInstallmentsTextEnd: ' 提供'
    }
}

export default zhCn;