import UIForm from "./form";

export * from "./iframe-field";

export function form(options: any) {
  return new UIForm(options.fields, options.styles || {});
}
