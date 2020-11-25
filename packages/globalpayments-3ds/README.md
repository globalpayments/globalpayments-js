# `globalpayments-3ds`

Helper library for leveraging Global Payments eCommerce and 3DSecure 2.0 for Strong Customer Authentication (SCA)

## Table of Contents

TODO

## Usage

```html
<div><input id="card-number"></div>
<div><input id="card-exp-month"></div>
<div><input id="card-exp-year"></div>
<div><input id="card-cvn"></div>
<div><input id="card-holder-name"></div>
<div><button id="start" type="button">Pay</button></div>

<script src="globalpayments-3dsecure.js"></script>
<script>
  const {
    checkVersion,
    getBrowserData,
    initiateAuthentication,
    AuthenticationSource,
    AuthenticationRequestType,
    MessageCategory,
    ChallengeRequestIndicator,
    ChallengeWindowSize,
  } = GlobalPayments.ThreeDSecure;

  // add submit click event handler
  document.addEventListener('DOMContentLoaded', () => {
    const checkVersionButton = document.getElementById('start');
    if (!checkVersionButton) {
      return;
    }

    checkVersionButton.addEventListener('click', start3DS);
  });

  // handle 3DS 2.0 workflow
  const start3DS = async (e) => {
    e.preventDefault();

    try {
      const versionCheckData = await checkVersion('/3ds2/check3dsVersion', {
        methodNotificationUrl: 'http://example.com/3ds2/methodNotification',
        card: {
          number: document.getElementById('card-number').value,
        },
      });

      const authenticateData = await initiateAuthentication('/3ds2/initiateAuthentication', {
        merchantContactUrl: 'http://example.com/contact',
        challengeNotificationUrl: 'http://example.com/3ds2/challengeNotification',
        challengeWindow: {
          windowSize: ChallengeWindowSize.Windowed600x400,
          displayMode: 'lightbox',
        },
        authenticationRequestType: AuthenticationRequestType.PaymentTransaction,
        serverTransactionId: versionCheckData.serverTransactionId,
        methodUrlComplete: true,
        card: {
          number: document.getElementById('card-number').value,
          expMonth: document.getElementById('card-exp-month').value,
          expYear: document.getElementById('card-exp-year').value,
          cvn: document.getElementById('card-cvn').value,
          cardHolderName: document.getElementById('card-holder-name').value
        },
      });
    } catch (e) {
      console.error('An error occurred', e.reasons);
      return;
    }

    return false;
  };
</script>
```

### Handling Errors

The `checkVersion` and `initiateAuthentication` functions will throw an error / provide a rejected `Promise` when a non-happy path occurs. A custom type that extends from the built-in `Error` (`GPError`) will be used to detail the error and follows the form:

```typescript
class GPError extends Error {
  public error = true;
  public reasons: Array<{
    code: string,
    message: string,
  }>;
}
```

## Building from source

```bash
yarn install
yarn run build
```

`yarn run build` will perform the following tasks:

1. Clean the `./dist/` directory.
2. Lints the Typescript files according to `tslint.json`.
3. Builds the Typescript files into `./dist/globalpayments-3dsecure.js` using `tsconfig.json`.
4. Minifies `./dist/globalpayments-3dsecure.js` into `./dist/globalpayments-3dsecure.min.js`.

## Development

The tokenization library is built in Typescript. The Typescript compiler is available as an add-on for Visual Studio, but it can also be installed independently. This library's `package.json` file also pulls down a copy of the Typescript compiler on `yarn install`, which allows it to be used by calling `./node_modules/bin/tsc`.

### Watch files during development

```bash
yarn run build -w
```

### Testing

Acceptance tests are ran with [TestCafe](https://devexpress.github.io/testcafe/), which expects a local copy of Chrome to be accessible. In addition, the installed version of Chrome should be at least **Chrome 60** to ensure headless support is available. To run the tests:

```bash
yarn run test
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## LICENSE

This project is licensed under the GPLv2 License. See [LICENSE.md](LICENSE.md) for details.
