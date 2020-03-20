var remove =0
const array=[1,2,3,4,3,5,6,7,5,8,9,10,11]
var startPonit=0,stopPoint=1
for (let index = 0; stopPoint < array.length; index++) {
  while(array[stopPoint-1]<array[stopPoint]){
    stopPoint++
  }
  remove=stopPoint
  while(array[startPonit]<array[stopPoint]){
    stopPoint++
  }
}