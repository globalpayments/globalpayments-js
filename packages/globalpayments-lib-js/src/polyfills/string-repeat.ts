if (!String.prototype.repeat) {
  String.prototype.repeat = function(length: number) {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += this;
    }

    return result;
  };
}
