Function.prototype.myapply(context){
  if(typeof this !== 'function') console.log('baocuo')

  let self=context||window
  context.fn=this
  let arg=arguements[1]
  let result = context.fn(arg)
  delete context.fn
  return result
}