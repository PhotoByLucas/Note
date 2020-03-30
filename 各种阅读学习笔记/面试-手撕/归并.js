function merge(left=[],right=[]){
  let result=[]
  while(left.length&&right.length){
    let leftOne=left[0]
    let rightOne=right[0]
    if(leftOne<rightOne){
      result.push(left.shift)
    }else{
      result.push(right.shift)
    }
  }
  if(left.length) result.concat(left)
  if(right.length) result.concat(right)
  return result
}

function mergesort(array){
  if(array.length<=1) return array
  let middle = Math.floor(array.length/2)
  let left = array.slice(0,middle)
  let right = array.slice(middle)
  return merge(mergesort(left),mergesort(right))
}
