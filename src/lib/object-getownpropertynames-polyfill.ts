if (!Object.prototype.hasOwnProperty) {
  Object.prototype.hasOwnProperty = (prop: string) => {
    return typeof this[prop] !== "undefined";
  };
}

if (!Object.getOwnPropertyNames) {
  Object.getOwnPropertyNames = (obj) => {
    const keys = [];
    for (const key in obj) {
      if (
        typeof obj.hasOwnProperty !== "undefined" &&
        obj.hasOwnProperty(key)
      ) {
        keys.push(key);
      }
    }
    return keys;
  };
}
