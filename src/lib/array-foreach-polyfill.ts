if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(
    fn: (value: any, index: number, arr: any[]) => void,
  ) {
    for (let i = 0; i < this.length; i++) {
      fn(this[i], i, this);
    }
  };
}
