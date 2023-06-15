import {
    createHtmlElement as _createHtmlElement,
    createHtmlDivElement as _createHtmlDivElement,
    createHtmlSpanElement as _createHtmlSpanElement,
    createHtmlButtonElement as _createHtmlButtonElement,
    createHtmlImageElement as _createHtmlImageElement,
    createHtmlUlElement as _createHtmlUlElement,
    createHtmlLiElement as _createHtmlLiElement,
    HtmlAnchorTarget as _HtmlAnchorTarget,
    createHtmlAnchorElement as _createHtmlAnchorElement,
    createHtmlCheckboxElement as _createHtmlCheckboxElement,
    createHtmlLabelElement as _createHtmlLabelElement,
} from "../../../../common/html-element";

export const createHtmlElement = (
    elementType: string,
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[]
    }): HTMLElement => _createHtmlElement(elementType, props);

export const createHtmlDivElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLDivElement => _createHtmlDivElement(props);

export const createHtmlSpanElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLSpanElement => _createHtmlSpanElement(props);

export const createHtmlButtonElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLButtonElement => _createHtmlButtonElement(props);

export const createHtmlImageElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        src: string,
        alt: string,
    }): HTMLImageElement => _createHtmlImageElement(props);

export const createHtmlUlElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLUListElement => _createHtmlUlElement(props);

export const createHtmlLiElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLLIElement => _createHtmlLiElement(props);

export const HtmlAnchorTarget = _HtmlAnchorTarget;

export const createHtmlAnchorElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
        target?: _HtmlAnchorTarget,
        href: string,
    }): HTMLAnchorElement => _createHtmlAnchorElement(props);

export const createHtmlCheckboxElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        name?: string,
        textContent?: string,
        checked: boolean,
    }): HTMLInputElement => _createHtmlCheckboxElement(props);

export const createHtmlLabelElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        htmlFor: string,
        textContent?: string,
    }): HTMLLabelElement => _createHtmlLabelElement(props);