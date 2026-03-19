import { IframeField } from "../index";
import { IPaymentMethodConfigurationNormalized } from "../../../apm/qr-code-payments/contracts";
export default function addQRCodePaymentMethods(iframeField: IframeField | undefined, paymentMethodConfigurations: IPaymentMethodConfigurationNormalized[], amount: string | number): void;
