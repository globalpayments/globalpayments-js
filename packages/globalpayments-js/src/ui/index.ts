import UIForm from "./form";

export * from "./iframe-field";

/**
 * Allows integrators to custom payment data entry forms for credit
 * card, eCheck / ACH, or gift and loyalty cards.
 *
 * @param options Form options.
 * @returns
 */
export function form(options: any) {
  return new UIForm(options.fields, options.styles || {});
}
