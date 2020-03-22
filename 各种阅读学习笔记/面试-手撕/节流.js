var throttle = function(fn,wait){
  var timer

  return function(...argc){
    let self=this
    if(!timer){
      timer=setTimeout(()=>{
        fn.apply(self,argc)
        timer=null
      },wait)
    }
  }
}