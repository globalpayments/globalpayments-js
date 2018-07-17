// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze) {
  Object.freeze = function freeze(object: any) {
    if (Object(object) !== object) {
      throw new TypeError("Object.freeze can only be called on Objects.");
    }
    // this is misleading and breaks feature-detection, but
    // allows "securable" code to "gracefully" degrade to working
    // but insecure code.
    return object;
  };
}

// detect a Rhino bug and patch it
try {
  Object.freeze(() => undefined);
} catch (exception) {
  Object.freeze = ((freezeObject) => {
    return function freeze(object: any) {
      if (typeof object === "function") {
        return object;
      } else {
        return freezeObject(object);
      }
    };
  })(Object.freeze);
}
