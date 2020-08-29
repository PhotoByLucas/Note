function add(...argc) {
  let result = 0 
  for (let index = 0; index < argc.length; index++) {
    result += argc[index]
  }
  
  function b (...brgc) {
    for (let index = 0; index < brgc.length; index++) {
      result += brgc[index]
    }
    return b
  }

  b.toString = function() {
    return result
  }

  return b
}

console.log(add(3,4,5)(6)(7))
