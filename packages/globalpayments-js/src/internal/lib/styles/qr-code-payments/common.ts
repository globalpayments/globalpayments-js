export const fieldStyles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    return {
      "@font-face": {
        "font-family": "GPCommerce",
        src: `url("${fontBase}GPCommerce-Regular.woff2") format("woff2")`,
      },
    };
  };

export const styles = (assetBaseUrl: string) => {
      const imageBase = assetBaseUrl + "images/";

      const customColors = {
        qrCodePaymentBlueAlipayHK: '#1677FF',
        qrCodePaymentBlueAlipayHKHover: '#0E69E8',
        qrCodePaymentBlueAlipay: '#1677FF',
        qrCodePaymentBlueAlipayHover: '#0E69E8',

        qrCodePaymentGreenWeChat: '#1AAD19',
        qrCodePaymentGreenWeChatHover: '#0E940D',

        selectedBorderBlue: '#1677FF',

        azure31Blue: '#005C9E',
        azure39Blue: '#0074C7',
        azure76LightBlue: '#85CCFF',
        linkHoverBlue: '#0027AE',
        linkActiveBlue: '#6583EA',

        neutralsWhite: '#FFFFFF',
        coolGrey61: '#9296A5',
        warmGrey95: '#F2F2F2',
        roaringRed: '#E12619',
      };

      const commonColumnFlexCenterStyles = {
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
      };

      return {
        ".secure-payment-form .credit-card-qr-code-payments" : {
            "font-family": "GPCommerce",
        },

        ".secure-payment-form .credit-card-qr-code-payments-target, .qr-code-payment-content, .qr-code-payment-countdown-timer": commonColumnFlexCenterStyles,

        ".secure-payment-form .qr-code-payment-methods-wrapper": {
          width: "100%"
        },

        ".secure-payment-form .qr-code-payment-method-button": {
          color: "white",
          height: "50px",
          width: "100%",
          "border-radius": "4px",
          border: "0px",
          margin: "5px 0",
          cursor: "pointer",
        },

        ".secure-payment-form .qr-code-payment-method-alipayhk": {
          "background-color": customColors.neutralsWhite,
          border: `2px solid ${customColors.coolGrey61}`,
        },
        ".secure-payment-form .qr-code-payment-method-alipayhk:hover": {
          "background-color": customColors.warmGrey95,
          border: `2px solid ${customColors.coolGrey61}`,
        },

        ".secure-payment-form .qr-code-payment-method-alipay": {
          "background-color": customColors.neutralsWhite,
          border: `2px solid ${customColors.coolGrey61}`,
        },
        ".secure-payment-form .qr-code-payment-method-alipay:hover": {
          "background-color": customColors.warmGrey95,
          border: `2px solid ${customColors.coolGrey61}`,
        },

        ".secure-payment-form .qr-code-payment-method-wechat": {
          "background-color": customColors.neutralsWhite,
          border: `2px solid ${customColors.coolGrey61}`,
        },
        ".secure-payment-form .qr-code-payment-method-wechat:hover": {
          "background-color": customColors.warmGrey95,
          border: `2px solid ${customColors.coolGrey61}`,
        },

        ".secure-payment-form .qr-code-payment-iframe-wrapper": {
          ...commonColumnFlexCenterStyles,
        },
        ".secure-payment-form .qr-code-payment-iframe": {
          border: "none",
          width: '100%',
          height: '60vh'
        },

        ".secure-payment-form .qr-code-payment-content": {
          "font-size": "21px!important",
          "line-height": "30px!important",
          width: "100%"
        },

        ".secure-payment-form .link-button": {
          background: "none",
          border: "none",
          color: customColors.azure39Blue,
          "font-style": "normal",
          "font-weight": "400",
          "line-height": "21px",
          "font-size": "medium",
          padding: "0px",
          cursor: "pointer",
          "margin": "20px 0"
        },
        ".secure-payment-form .link-button:hover": {
            color: customColors.linkHoverBlue,
        },
        ".secure-payment-form .link-button:active": {
            color: customColors.linkActiveBlue,
        },
        ".secure-payment-form .link-button:focus": {
            color: customColors.linkActiveBlue,
            border: `1px solid ${customColors.azure76LightBlue}`,
        },

        ".secure-payment-form .qr-code-payment-countdown-timer-message": {
          color: customColors.coolGrey61,
          "font-size": "14px",
          "line-height": "21px",
        },
        ".secure-payment-form .qr-code-payment-countdown-timer-clock img": {
          "margin-right": "5px",
        },
        ".secure-payment-form .qr-code-payment-countdown-timer-clock": {
          display: "flex",
          "align-items": "center",
          color: customColors.coolGrey61,
          "font-size": "18px",
          "line-height": "27px",
          "font-weight": "700",
          "justify-content": "center",
        },
        ".secure-payment-form .payment-amount": {
          color: customColors.azure39Blue,
          "font-style": "normal",
          "font-weight": "700",
          "line-height": "48px",
          "font-size": "30px",
        },

        ".secure-payment-form .qr-code-expired-alert": {
          display: "flex",
          border: `1px solid ${customColors.roaringRed}`,
          height: "77px",
          "margin-top": "15px",
        },
        ".secure-payment-form .qr-code-expired-alert-icon": {
          background: customColors.roaringRed,
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          width: "56px",
        },
        ".secure-payment-form .qr-code-expired-alert-message": {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          padding: "15px",
          "font-size": "14px",
          "line-height": "22px",
        },

        ".secure-payment-form .qr-code-expired-alert-message-title": {
          color: customColors.roaringRed,
          "font-size": "18px!important",
          "line-height": "20px!important"
        },

        ".secure-payment-form .qr-code-redirecting-to-page": {
          ...commonColumnFlexCenterStyles,
          "justify-content": "center",
          height: "320px",
        },

        ".secure-payment-form .qr-code-redirecting-to-page-message": {
          color: customColors.azure31Blue,
          "font-size": "18px!important",
          "line-height": "27px!important"
        },
      };
  };