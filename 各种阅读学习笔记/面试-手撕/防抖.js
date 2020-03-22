var debounce=function(fn,wait){
  var timer
  return function(...argc){
    let self=this

    if(timer) clearTimeout(timer)

    timer= setTimeout(()=>{
      fn.apply(self,argc)
    },wait)

  }
}