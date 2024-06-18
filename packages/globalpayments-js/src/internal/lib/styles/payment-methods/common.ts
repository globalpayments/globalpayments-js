import {options} from "../../options";
import OpenBankingStyles from "./open-banking";
import PayPalStyles from "./paypal";
import {
  // fieldStyles as getQRCodePaymentsCommonFieldStyles,
  styles as getQRCodePaymentsCommonStyles,
} from './qr-code-payments'

export default (assetBaseUrl: string) => {
  const customColors = {
    azure76LightBlue: '#85CCFF',
    azure31Blue: '#005C9E',
    azure39Blue: '#0074C7',
    linkHoverBlue: '#0027AE',
    linkActiveBlue: '#6583EA',
  };

  const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

  return {
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
      "margin": "20px auto",
      ...commonColumnFlexCenterStyles,
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
    ".secure-payment-form .apms-redirecting-to-page": {
      ...commonColumnFlexCenterStyles,
      "justify-content": "center",
      height: "320px",
    },
    ".secure-payment-form .apms-redirecting-to-page-message": {
      color: customColors.azure31Blue,
      "font-family": "GPCommerce",
      "font-size": "18px!important",
      "line-height": "27px!important"
    },
    ...OpenBankingStyles(assetBaseUrl),
    ...PayPalStyles(assetBaseUrl),
    ...(options.apms?.qrCodePayments && options.apms?.qrCodePayments.enabled ? getQRCodePaymentsCommonStyles(assetBaseUrl) : {}),
  }
}