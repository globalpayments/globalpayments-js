# Global Payments

## Packages

- [`@globalpayments/js`](packages/globalpayments-js) - JavaScript library for web applications to connect to Heartland eCommerce & Global Payments eCommerce tokenization services
- [`@globalpayments/js-loader`](packages/globalpayments-js-loader) - IN PROGRESS - Helper library for dynamically loading `@globalpayments/js` within web applications
- [`@globalpayments/js-web-components`](packages/globalpayments-js-web-components) - IN PROGRESS - Exposes web components / custom elements around `@globalpayments/js`
- [`globalpayments-3ds`](packages/globalpayments-3ds) - Helper library for leveraging 3DSecure 2 for Strong Customer Authentication (SCA)
- [`globalpayments-lib`](packages/globalpayments-lib) - Helper library for Global Payments JavaScript libraries

## Development

This monorepo uses [`lerna`](https://github.com/lerna/lerna). Run the below to get started within a new environment:

```
yarn install
yarn lerna bootstrap
```

This will install all dependencies as well as a local copy of `lerna`.

Common scripts can be ran across packages, e.g.:

```
yarn lerna run build
```

Scripts can be ran against individual packages as well, e.g.:

```
yarn lerna run --scope=@globalpayments/js test
```

## Supported Browsers

The library is supported on the following browsers:
* Google Chrome
* Safari
* Microsoft Edge
* Opera
* Mozilla Firefox