var trap = function(height = []) {
  let water = 0;
  for (let i = 1; i < height.length; i++) {
    let maxLeft=height[i]
    let maxRight=height[i]
    // 左边
    for (let j = i; j >= 0; j--) {
      maxLeft=getMax(maxLeft,height[i])
    }
    // 右边
    for (let j = i; j <height.length; j++) {
      maxRight=getMax(maxRight,height[i])
    }

    console.log(maxLeft,maxRight,height[i])
    water+=(getMin(maxLeft,maxRight)-height[i])
  }
  
  function getMax(a,b){
    return a>b?a:b
  }

  function getMin(a,b){
    return a<b?a:b
  }


  
  
  console.log("water",water);
};
var a = [0,1,0,2,1];

console.log(trap(a));
