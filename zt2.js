function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  // return ret instanceof Object ? ret : obj;
  return ret;
}

function A(d) {
  this.d = d;
  return 1
}
var temp =new A(123)
console.log(temp)
console.log(new A(123));  //{a: 6}
console.log(_new(A, 123)); //A {d: 123}   