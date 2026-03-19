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
export declare enum HtmlAnchorTarget {
    Blank = "_blank",
    Self = "_self",
    Parent = "_parent",
    Top = "_top"
}
export declare const createHtmlAnchorElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    textContent?: string | undefined;
    target?: HtmlAnchorTarget | undefined;
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
export declare const createHtmlRadioButtonElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    name?: string | undefined;
    labelText?: string | undefined;
    additionalInfo?: string | undefined;
    checked: boolean;
    target?: string | undefined;
    value?: string | undefined;
    radioButtonClassList?: string | undefined;
} | undefined) => HTMLDivElement;
export declare const createHtmlLabelElement: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    htmlFor: string;
    textContent?: string | undefined;
} | undefined) => HTMLLabelElement;
export declare const createHtmlIFrameElement: (props?: {
    id?: string | undefined;
    src: string;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
} | undefined) => HTMLIFrameElement;
export declare const changeCreditCardFormFieldsVisibility: (visible: boolean) => void;
export declare const createToolTip: (props?: {
    id?: string | undefined;
    className?: string | undefined;
    attributes?: {
        [key: string]: string;
    }[] | undefined;
    ariaLabel?: string | undefined;
    ariaDescribedBy?: string | undefined;
    role?: string | undefined;
    tabIndex?: string | undefined;
    title?: string | undefined;
    htmlContent?: string | undefined;
} | undefined) => HTMLElement;
export declare const createHtmlFromString: (htmlString: string) => DocumentFragment;
