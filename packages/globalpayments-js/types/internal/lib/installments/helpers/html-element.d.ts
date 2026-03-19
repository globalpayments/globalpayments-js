import { HtmlAnchorTarget as _HtmlAnchorTarget } from "../../../../common/html-element";
export declare const createHtmlElement: (elementType: string, props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
} | undefined) => HTMLElement;
export declare const createHtmlDivElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
} | undefined) => HTMLDivElement;
export declare const createHtmlSpanElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    textContent?: string | undefined;
} | undefined) => HTMLSpanElement;
export declare const createHtmlButtonElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    textContent?: string | undefined;
} | undefined) => HTMLButtonElement;
export declare const createHtmlImageElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    src: string;
    alt: string;
} | undefined) => HTMLImageElement;
export declare const createHtmlUlElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
} | undefined) => HTMLUListElement;
export declare const createHtmlLiElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
} | undefined) => HTMLLIElement;
export declare const HtmlAnchorTarget: typeof _HtmlAnchorTarget;
export declare const createHtmlAnchorElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    textContent?: string | undefined;
    target?: _HtmlAnchorTarget | undefined;
    href: string;
} | undefined) => HTMLAnchorElement;
export declare const createHtmlCheckboxElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    name?: string | undefined;
    textContent?: string | undefined;
    checked: boolean;
} | undefined) => HTMLInputElement;
export declare const createHtmlLabelElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    htmlFor: string;
    textContent?: string | undefined;
} | undefined) => HTMLLabelElement;
