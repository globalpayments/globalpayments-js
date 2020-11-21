if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(
    fn: (value: any, index: number, arr: any[]) => void,
  ) {
    for (let i = 0; i < this.length; i++) {
      fn(this[i], i, this);
    }
  };
}
