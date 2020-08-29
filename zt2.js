function add(...argc) {
  let result = 0 
  for (let index = 0; index < argc.length; index++) {
    result += argc[index]
  }
  
  return this
}

console.log(add(3,4,5)(6)(7))
