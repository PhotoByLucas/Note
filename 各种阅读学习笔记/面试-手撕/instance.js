var myInstance=function(left,right){
  left = Object.getPrototypeOf(left)
  right = Object.getPrototypeOf(right)
  while(true){
    if(left==right) return true
    if(left==null) return false
    left = Object.getPrototypeOf(left)
  }
}