Function.prototype.myapply(context){
  if(typeof this !== 'function') console.log('baocuo')
  let context=context||window
  // 通过this获取调用apply的函数
  context.fn=this
  let arg=arguements[1]
  // 如果是call let arg=arguements.slice(1)
  // 通过对象调用改变了this的指向
  let result = context.fn(arg)
  delete context.fn
  return result
}