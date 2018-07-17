if (!Object.prototype.hasOwnProperty) {
  Object.prototype.hasOwnProperty = function hasOwnProperty(prop: string) {
    return typeof this[prop] !== "undefined";
  };
}

if (!Object.getOwnPropertyNames) {
  Object.getOwnPropertyNames = function getOwnPropertyNames(obj) {
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
