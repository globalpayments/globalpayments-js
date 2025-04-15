import { addCurrencyToAmount } from "../../../common/currency";
import { createHtmlDivElement, createHtmlSpanElement } from "../../../common/html-element";
import { bus } from "../../../internal";
import { IError } from "../../../internal/gateways";
import { getCurrentLanguage, getTranslationSet } from "../../../internal/lib/detectLanguage";
import { ORDER_INFORMATION_KEY } from "../../../internal/lib/order-information/constants";
import { IOrderInformationData } from "../../../internal/lib/order-information/contracts";

export default function addOrderInformation (cardFormContainerElement: HTMLElement, props: IOrderInformationData): void {
    if (!cardFormContainerElement) return;
    if (!validateRequiredProps(props)) return;

    const orderInformationTranslations = getTranslationSet(getCurrentLanguage(), 'orderInformation');

    const featureNamePrefix = ORDER_INFORMATION_KEY;
    const { merchantName, orderTotalAmount, orderReference, currencyCode } = props;

    const titleFieldNames = 'title';

    const fields = [
        { fieldName: 'order-total-amount', label: orderInformationTranslations.amount, value: addCurrencyToAmount(currencyCode, orderTotalAmount) },
        { fieldName: 'order-reference', label: orderInformationTranslations.orderReference, value: orderReference },
    ];

    const orderInformationContainer = createHtmlDivElement({
        id: featureNamePrefix,
        className: featureNamePrefix,
    });

    const merchantNameFieldContainer = createHtmlDivElement({
        id: `${titleFieldNames}-field`,
        className: `${titleFieldNames}-field`,
    });
    const merchantNameFieldSpan = createHtmlSpanElement({
        className: `${titleFieldNames}-value`,
        textContent: merchantName,
        attributes: [
            { 'aria-label': merchantName },
            { 'role': 'label' },
        ],
    });
    merchantNameFieldContainer.appendChild(merchantNameFieldSpan);
    orderInformationContainer.appendChild(merchantNameFieldContainer);

    // TODO (Order Information): Accessibility details (aria-labels)
    fields.forEach(x => {
        const elementProps = {
            id: `${x.fieldName}-field`,
            className: `${featureNamePrefix}-field`,
        };
        if(x.fieldName === 'order-total-amount') {
            elementProps.id = `${titleFieldNames}-field`,
            elementProps.className = `${titleFieldNames}-field`
        }
        const fieldContainer = createHtmlDivElement(elementProps);

        const fieldLabel = createHtmlSpanElement({
            className: `${featureNamePrefix}-label`,
            textContent: `${x.label}: `,
            attributes: [
                { 'aria-label': x.label },
                { 'role': 'label' },
            ],
        });
        fieldContainer.appendChild(fieldLabel);

        const fieldSpan = createHtmlSpanElement({
            className: `${featureNamePrefix}-value`,
            textContent: x.value,
            attributes: [
                { 'aria-label': x.value },
            ],
        });
        fieldContainer.appendChild(fieldSpan);

        orderInformationContainer.appendChild(fieldContainer);
    });
    cardFormContainerElement.appendChild(orderInformationContainer);
}

function validateRequiredProps (props: any): boolean {
    let propsAreValid = true;

    const propsNames = Object.keys(props as IOrderInformationData);
    propsNames.forEach(propName => {
        const propValue: string = props[propName];
        if (!propValue) {
            const errorMessage = `Missing '${ORDER_INFORMATION_KEY}' configuration: '${propName}'`;

            // tslint:disable-next-line:no-console
            console.log(errorMessage);

            const error: IError = {
                error: true,
                reasons: [{
                  code: "ERROR",
                  message: errorMessage,
                }],
              };
            bus.emit('error', error);

            propsAreValid = false;
        };
    });

    return propsAreValid;
}