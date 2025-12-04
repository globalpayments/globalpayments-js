import { IframeField } from "../../../../ui";
import { addInstallmentEligibilityBadge, getInstallmentSection } from "../templates/common";

export default function addInstallmentsOptions(iframeField: IframeField | undefined) {
    const contest = addInstallmentEligibilityBadge();
    iframeField?.container?.appendChild(contest);
    const installmentSection = getInstallmentSection();
    iframeField?.container?.append(installmentSection);
}