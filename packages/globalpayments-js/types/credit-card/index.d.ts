import UIForm, { IUIFormOptions } from "../ui/form";
export declare const defaultOptions: IUIFormOptions;
/**
 * Allows integrators to create a standard drop-in form for
 * accepting credit card data.
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export declare function form(target: string | HTMLElement, formOptions?: IUIFormOptions): UIForm | undefined;
/**
 * Allows integrators to create a drop-in form for accepting
 * track data from a human interface device (HID).
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export declare function trackReaderForm(target: string | HTMLElement, formOptions?: IUIFormOptions): UIForm;
