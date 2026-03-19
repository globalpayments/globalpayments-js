import { IDictionary } from "../../lib/util";
declare const _default: (data: IDictionary) => {
    error: any;
    reasons: any;
    customerReference?: undefined;
    details?: undefined;
    paymentReference?: undefined;
    requestId?: undefined;
} | {
    customerReference: string;
    details: {
        cardholderName: string;
        orderId: string;
    };
    paymentReference: string;
    requestId: string;
    error?: undefined;
    reasons?: undefined;
};
export default _default;
