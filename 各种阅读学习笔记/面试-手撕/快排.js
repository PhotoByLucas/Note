function quicksort(array=[]){
  if(array.length<=1) return array
  
  let middle = Math.floor((array.length)/2)
  let base = array.splice(middle,1)[0]

  let small =[],large=[]
  for (let index = 0; index < array.length; index++) {
    if(array[index]<middle){
      small.push(array[index])
    }else{
      large.push(array[index])
    }
  }

  return quicksort(small).concat([base],quicksort.(large))
}

