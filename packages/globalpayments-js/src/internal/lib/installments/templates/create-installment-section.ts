import { createHtmlRadioButtonElement } from "../../../../common/html-element";
import InstallmentTerm from "../contracts/installment-term";
import { createHtmlDivElement } from "../helpers/html-element";
import { InstallmentLabels } from "./enum";

export function createInstallmentSection(
    sectionTitle: string,
    options: InstallmentTerm[],
    countLabel: string,
): HTMLElement {
    const section = createHtmlDivElement({
        className: 'installment-section',
    })

    const titleDiv = createHtmlDivElement({
        className: "section-title"
    });
    titleDiv.textContent = sectionTitle;
    section.appendChild(titleDiv);

    const contentDiv = createHtmlDivElement({
        className: "installment-content"
    })
    section.appendChild(contentDiv);
    options.forEach((option) => {
        const radio = createHtmlRadioButtonElement({
            id: `installment-option-${option.reference}`,
            checked: false,
            radioButtonClassList: "installment-months-button",
            name: InstallmentLabels.INSTALLMENT_PAYMENT_OPTION_NAME,
            labelText: `${option.count} ${countLabel}`,
            value: option.reference,
        });
        contentDiv.appendChild(radio);
    });
    return section;
}