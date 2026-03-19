import { ApmProviders } from "../../../internal/lib/enums";
import { PaymentMethod } from "../contracts";
export declare function isApmProviderConfigured(configuration: PaymentMethod[], desiredProvider: ApmProviders): boolean;
export declare const getSelectAnotherPaymentMethodButton: (id: string, onClickCallback: any) => HTMLDivElement;
export declare function isUrlValid(url: string): boolean;
