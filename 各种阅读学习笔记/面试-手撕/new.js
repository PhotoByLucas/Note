var _new =function(fn=()=>{},...argc){
  var obj = Object.create(fn.prototype)
  var result = fn.apply(obj,argc)
  return typeof result == 'object'?result:obj
}