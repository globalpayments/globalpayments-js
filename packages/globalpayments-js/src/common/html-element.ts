export const createHtmlElement = (
    elementType: string,
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[]
    }): HTMLElement => {
        const { id, className, attributes } = props || {};

        const htmlElement = document.createElement(elementType);
        if (id) {
            htmlElement.id = id;
        }
        if (className) {
            htmlElement.className = className;
        }
        if (attributes) {
            attributes.forEach(attr => {
                const qualifiedName = Object.keys(attr)[0];
                const value = Object.values(attr)[0];
                htmlElement.setAttribute(qualifiedName, value);
            });
        }

        return htmlElement;
}

export const createHtmlDivElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLDivElement => {
        return createHtmlElement('div', props) as HTMLDivElement;
}

export const createHtmlSpanElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLSpanElement => {
        const { textContent } = props || {};

        const htmlElement = createHtmlElement('span', props) as HTMLSpanElement;
        if (textContent) {
            htmlElement.innerHTML = textContent;
        }

        return htmlElement;
}

export const createHtmlButtonElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLButtonElement => {
        const { textContent } = props || {};

        const htmlElement = createHtmlElement('button', props) as HTMLButtonElement;
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlImageElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        src: string,
        alt: string,
    }): HTMLImageElement => {
        const { src, alt } = props || {};

        const htmlElement = createHtmlElement('img', props) as HTMLImageElement;
        if (src) {
            htmlElement.src = src;
        }
        if (alt) {
            htmlElement.alt = alt;
        }

        return htmlElement;
}

export const createHtmlUlElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLUListElement => {
        return createHtmlElement('ul', props) as HTMLUListElement;
}

export const createHtmlLiElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLLIElement => {
        return createHtmlElement('li', props) as HTMLLIElement;
}

export enum HtmlAnchorTarget {
    Blank = "_blank",
    Self = "_self",
    Parent = "_parent",
    Top = "_top",
}

export const createHtmlAnchorElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
        target?: HtmlAnchorTarget,
        href: string,
    }): HTMLAnchorElement => {
        const { href, textContent, target } = props || {};

        const htmlElement = createHtmlElement('a', props) as HTMLAnchorElement;
        htmlElement.href = href || '#';
        htmlElement.rel = 'noopener noreferrer';

        if (textContent) {
            htmlElement.textContent = textContent;
        }
        if (target) {
            htmlElement.target = target;
        }

        return htmlElement;
}

export const createHtmlCheckboxElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        name?: string,
        textContent?: string,
        checked: boolean,
    }): HTMLInputElement => {
        const { name, checked, textContent } = props || {};

        const htmlElement = createHtmlElement('input', props) as HTMLInputElement;
        htmlElement.type = 'checkbox';

        if (name) {
            htmlElement.name = name;
        }
        if (checked) {
            htmlElement.setAttribute('checked', 'checked');
        }
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlLabelElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        htmlFor: string,
        textContent?: string,
    }): HTMLLabelElement => {
        const { htmlFor, textContent } = props || {};

        const htmlElement = createHtmlElement('label', props) as HTMLLabelElement;

        if (htmlFor) {
            htmlElement.htmlFor = htmlFor;
        }
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlIFrameElement = (
    props?: {
        id?: string,
        src: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLIFrameElement => {
        const { src } = props || {};

        const htmlElement = createHtmlElement('iframe', props) as HTMLIFrameElement;
        if (src) {
            htmlElement.src = src;
        }

        return htmlElement;
}