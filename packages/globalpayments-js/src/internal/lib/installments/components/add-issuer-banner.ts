import { IframeField } from "../../../../ui";
import { getHaveVirginMoneyCreditCardBannerTemplate } from "../templates/common";

export default function addIssuerBanner(iframeField: IframeField | undefined) {
    const contest = getHaveVirginMoneyCreditCardBannerTemplate();
    iframeField?.container?.appendChild(contest);
}