import UIForm, { IUIFormOptions } from "../ui/form";
export declare const defaultOptions: IUIFormOptions;
/**
 * Allows integrators to create a standard drop-in form for
 * accepting eCheck / ACH data.
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export declare function form(target: string | HTMLElement, formOptions?: IUIFormOptions): UIForm;
