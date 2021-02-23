# secure-card-cvv-field

## Properties

| Property  | Modifiers | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `field`   |           | `IframeField` | Sets the underlying hosted field.<br /><br />Exposes functionality from the hosted field object to the custom<br />element's JavaScript interface. |
| `tagName` | readonly  | `string`      | Gets the custom element's pre-defined tag name.  |
| `type`    | readonly  | `string`      | Gets the hosted field type.<br /><br />Current options are:<br /><br />- `card-number`<br />- `card-expiration`<br />- `card-cvv`<br />- `submit` |

## Methods

| Method                | Type                                    | Description                                      |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `getAttributes`       | `(): IDictionary`                       | Gets the element's attributes as an object, replacing kebab cased attribute<br />names with their camel cased equivalents. |
| `getStyles`           | `(): object`                            | Gets hosted fields styles if they have been set on the custom element. |
| `getTargetEvents`     | `(): string[]`                          |                                                  |
| `hasStyles`           | `(): boolean`                           | Determines if hosted fields styles have been set on the custom element. |
| `setupEventListeners` | `(source: IframeField \| UIForm): void` | Sets up event listeners to forward events from the Global Payments<br />JavaScript library to be dispatched as `CustomEvent`s from this<br />element. |


# secure-card-expiration-field

## Properties

| Property  | Modifiers | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `field`   |           | `IframeField` | Sets the underlying hosted field.<br /><br />Exposes functionality from the hosted field object to the custom<br />element's JavaScript interface. |
| `tagName` | readonly  | `string`      | Gets the custom element's pre-defined tag name.  |
| `type`    | readonly  | `string`      | Gets the hosted field type.<br /><br />Current options are:<br /><br />- `card-number`<br />- `card-expiration`<br />- `card-cvv`<br />- `submit` |

## Methods

| Method                | Type                                    | Description                                      |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `getAttributes`       | `(): IDictionary`                       | Gets the element's attributes as an object, replacing kebab cased attribute<br />names with their camel cased equivalents. |
| `getStyles`           | `(): object`                            | Gets hosted fields styles if they have been set on the custom element. |
| `getTargetEvents`     | `(): string[]`                          |                                                  |
| `hasStyles`           | `(): boolean`                           | Determines if hosted fields styles have been set on the custom element. |
| `setupEventListeners` | `(source: IframeField \| UIForm): void` | Sets up event listeners to forward events from the Global Payments<br />JavaScript library to be dispatched as `CustomEvent`s from this<br />element. |


# secure-card-number-field

## Properties

| Property  | Modifiers | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `field`   |           | `IframeField` | Sets the underlying hosted field.<br /><br />Exposes functionality from the hosted field object to the custom<br />element's JavaScript interface. |
| `tagName` | readonly  | `string`      | Gets the custom element's pre-defined tag name.  |
| `type`    | readonly  | `string`      | Gets the hosted field type.<br /><br />Current options are:<br /><br />- `card-number`<br />- `card-expiration`<br />- `card-cvv`<br />- `submit` |

## Methods

| Method                | Type                                    | Description                                      |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `getAttributes`       | `(): IDictionary`                       | Gets the element's attributes as an object, replacing kebab cased attribute<br />names with their camel cased equivalents. |
| `getStyles`           | `(): object`                            | Gets hosted fields styles if they have been set on the custom element. |
| `getTargetEvents`     | `(): string[]`                          |                                                  |
| `hasStyles`           | `(): boolean`                           | Determines if hosted fields styles have been set on the custom element. |
| `setupEventListeners` | `(source: IframeField \| UIForm): void` | Sets up event listeners to forward events from the Global Payments<br />JavaScript library to be dispatched as `CustomEvent`s from this<br />element. |


# secure-payment-form

## Properties

| Property  | Modifiers | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `field`   |           | `IframeField` | Sets the underlying hosted field.<br /><br />Exposes functionality from the hosted field object to the custom<br />element's JavaScript interface. |
| `tagName` | readonly  | `string`      | Gets the custom element's pre-defined tag name.  |
| `type`    | readonly  | `string`      | Gets the hosted field type.<br /><br />Current options are:<br /><br />- `card-number`<br />- `card-expiration`<br />- `card-cvv`<br />- `submit` |

## Methods

| Method                | Type                                    | Description                                      |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `configure`           | `(): Promise<void>`                     | Configures the Global Payments JavaScript library. |
| `getAttributes`       | `(): IDictionary`                       | Gets the element's attributes as an object, replacing kebab cased attribute<br />names with their camel cased equivalents. |
| `getStyles`           | `(): object`                            | Gets hosted fields styles if they have been set on the custom element. |
| `getTargetEvents`     | `(): string[]`                          |                                                  |
| `hasStyles`           | `(): boolean`                           | Determines if hosted fields styles have been set on the custom element. |
| `setupEventListeners` | `(source: IframeField \| UIForm): void` | Sets up event listeners to forward events from the Global Payments<br />JavaScript library to be dispatched as `CustomEvent`s from this<br />element. |

## Events

| Event           | Type                            | Description                                      |
|-----------------|---------------------------------|--------------------------------------------------|
| `error`         | `CustomEvent<IError>`           | Triggered when a general error occurs.           |
| `ready`         | `CustomEvent<IFrameCollection>` | Triggered when all form fields have been rendered successfully. |
| `submit`        | `CustomEvent<object>`           | Triggered when submit button is clicked.         |
| `token-error`   |                                 | Triggered when an errored token response is received from the configured service. |
| `token-success` |                                 | Triggered when a successful token response is received from the configured service. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | When the default slot is empty, the drop-in form is rendered. |


# secure-submit-button

## Properties

| Property  | Modifiers | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `field`   |           | `IframeField` | Sets the underlying hosted field.<br /><br />Exposes functionality from the hosted field object to the custom<br />element's JavaScript interface. |
| `tagName` | readonly  | `string`      | Gets the custom element's pre-defined tag name.  |
| `type`    | readonly  | `string`      | Gets the hosted field type.<br /><br />Current options are:<br /><br />- `card-number`<br />- `card-expiration`<br />- `card-cvv`<br />- `submit` |

## Methods

| Method                | Type                                    | Description                                      |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `getAttributes`       | `(): IDictionary`                       | Gets the element's attributes as an object, replacing kebab cased attribute<br />names with their camel cased equivalents. |
| `getStyles`           | `(): object`                            | Gets hosted fields styles if they have been set on the custom element. |
| `getTargetEvents`     | `(): string[]`                          |                                                  |
| `hasStyles`           | `(): boolean`                           | Determines if hosted fields styles have been set on the custom element. |
| `setupEventListeners` | `(source: IframeField \| UIForm): void` | Sets up event listeners to forward events from the Global Payments<br />JavaScript library to be dispatched as `CustomEvent`s from this<br />element. |
