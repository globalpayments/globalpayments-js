
import { options } from "../../lib/options";
import { setGpApiHeaders } from "../../lib/set-headers";



export default async (url: string, data: any) => {
    const headers = setGpApiHeaders();
    const requestBody = createRequestBody();

    try {
        const resp = await fetch(url, {
            body: JSON.stringify(requestBody),
            headers,
            method: "POST",
        });
        return resp.json();
    } catch (e: any) {
        return {
            error: true,
            reasons: [{ code: "ERROR", message: e.message }],
        };
    }
    function createRequestBody(): KonekConsentRequest {
        const konekFields = options.apms?.konek;
        const request: KonekConsentRequest = konekFieldMapper(konekFields);
        return request;
    }

    function konekFieldMapper(konekFields: any): KonekConsentRequest{
        return {
            reference: konekFields?.reference || "",
            account_name: konekFields?.accountName || "",
            channel: konekFields?.channel || "",
            merchant_category_code: konekFields?.mcc || "",
            addresses: konekFields?.addresses ? [mapAddress(konekFields.addresses[0])] : [],
            order: mapOrder(konekFields?.order),
            fees:   konekFields?.fees || [] as Fees[],
            payment_method: {
                digital_wallet: {
                    provider: "KONEK"
                }
            },
            supported_payment_methods: konekFields?.supportedPaymentMethods|| []
        };
    }

    function mapAddress(addressData: any): Address {
        return {
            functions: addressData?.functions || [],
            reference: addressData?.reference || "",
            building_name: addressData?.buildingName || "",
            line_1: addressData?.line1 || "",
            line_2: addressData?.line2 || "",
            line_3: addressData?.line3 || "",
            city: addressData?.city || "",
            state: addressData?.state || "",
            postal_code: addressData?.postalCode || "",
            country: addressData?.country || "",
            po_box_number: addressData?.poBoxNumber || "",
            contact_phone: {
                country_code: addressData?.contactPhone?.countryCode || "",
                subscriber_number: addressData?.contactPhone?.subscriberNumber || "",
            },
        };
    }

    function mapOrder(order: any): OrderDetails {
        return {
            reference: order?.reference || "",
            delivery_timeframe: order?.deliveryTimeframe || "",
            shipping_type: order?.shippingType || "",
            shipping_cost: order?.shippingCost || "",
            amount: order?.amount || "",
            currency: order?.currency || "",
            tax_amount: order?.taxAmount || "",
            first_amount: order?.firstAmount || "",
            items: (order?.items || []).map((item: any) => ({
                label: item?.label || "",
                reference: item?.reference || "",
                type: item?.type || "",
                amount: item?.amount || "",
                quantity: item?.quantity || "",
                description: item?.description || "",
                payment_type: item?.paymentType || "",
            })),
        };
    }

    type KonekConsentRequest = {
        account_name: string;
        channel: string;
        merchant_category_code: string;
        reference: string;
        addresses: Address[],
        order: OrderDetails,
        fees: Fees[],
        payment_method: {
            digital_wallet: {
                provider: string
            }
        },
        supported_payment_methods: string[]
    }

    type Address = {
        functions: string[],
        reference: string,
        building_name: string,
        line_1: string,
        line_2: string,
        line_3: string,
        city: string,
        state: string,
        postal_code: string,
        country: string,
        po_box_number: string,
        contact_phone: {
            country_code: string,
            subscriber_number: string
        }
    }

    type OrderDetails = {
        reference: string,
        delivery_timeframe: string,
        shipping_type: string,
        shipping_cost: string,
        amount: string,
        currency: string,
        tax_amount: string,
        first_amount: string,
        items: Item[]
    }

    type Item = {
        label: string,
        reference: string,
        type: string,
        amount: string,
        quantity: string,
        description: string,
        payment_type: string
    }
    type Fees = {
        name: string,
        amount: string
    }
};