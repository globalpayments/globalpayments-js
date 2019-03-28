if (!Object.prototype.hasOwnProperty) {
  Object.prototype.hasOwnProperty = function(prop: string) {
    return typeof (this as any)[prop] !== "undefined";
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
