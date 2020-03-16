var result = 0;
var canArrive = false;
var lines = [];

const D = 10
const W = 4
const pos = [1, 4 ,7]
const sup = [6 ,3 ,5]

let start = -1;
let tempResult=[]
function walkTo(goWaterPosition, nowWater, nowPos, time) {
  if (nowPos + nowWater >= D) {
    tempResult.push(time)
    canArrive = !canArrive;
  } else {
    if (pos[goWaterPosition] - nowPos > nowWater) {
      return;
    }else{
      walkTo(goWaterPosition+1,nowWater-(pos[goWaterPosition] - nowPos)+sup[goWaterPosition],pos[goWaterPosition],time+1)
      walkTo(goWaterPosition+2,nowWater,nowPos,time)
    }
  }
}

walkTo(0,W,0,0);

if(canArrive){
  console.log(tempResult.sort()[0])
}else{
  console.log(-1)
}