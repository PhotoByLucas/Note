var trap = function(height=[]) {
  let max=0
  height.forEach((element)=>{
    if(element>max){
      max=element
    }
  })
  console.log(max)
  for (let index = 0; index < height.length; index++) {
    const element = height[index];
    
  }
    
};
var a=[0,1,0,2,1,0,1,3,2,1,2,1]

console.log(trap(a));
