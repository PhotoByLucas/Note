// https://leetcode-cn.com/problems/frog-jump/solution/qing-wa-guo-he-by-leetcode/
// 403. 青蛙过河
// 动态规划解法
var canCross = function(stones) {
  if (stones[1] - stones[0] !== 1) {
    return false;
  }

  // 初始化
  let mySet = {};
  for (let index = 0; index < stones.length; index++) mySet[stones[index]] = new Array();
  // mySet[stones[0]] = [1];
  mySet[stones[1]].push(1);

  for (let index = 1; index < stones.length; index++) {
    let currentPos = stones[index];
    for (let i = 0; i < mySet[currentPos].length; i++) {
      // currentPos+散列表中的值存在数组中
      for (let myLastIndex = -1; myLastIndex <= 1; myLastIndex++) {

        let goPos = currentPos + mySet[currentPos][i] + myLastIndex;
        if (stones.includes(goPos)&&goPos>currentPos&&!mySet[goPos].includes(mySet[currentPos][i] + myLastIndex)) {
          mySet[goPos].push(mySet[currentPos][i] + myLastIndex);
        }
      }
    }
  }

  
  return mySet[stones[stones.length-1]].length>0;
};


//  超时解法
// var canCross = function(stones) {
//   if (stones[1]-stones[0]!==1) {
//     return false
//   }
//   // let jumpSize = stones[1] - stones[0];
//   let nowPos = 0;
//   let res=false
//   dp(nowPos, nowPos + 1, 1, stones)

//   function dp(nowPos, goPos, lastStep, stones = []) {
//     // 已经到达
//     if (nowPos+1 === stones.length) 
//     {
//       res=true
//     }
//     // 小于
//     if (stones[goPos] - stones[nowPos] > lastStep + 1) {
//       // return
//     } else if (stones[goPos] - stones[nowPos] === lastStep+1){
//       // 等于k+1 往前跳一格
//       dp(goPos,goPos+1,lastStep+1,stones)
//     } else if(stones[goPos] - stones[nowPos] === lastStep){
//       // 等于k
//       dp(goPos,goPos+1,lastStep,stones)
//       dp(nowPos,goPos+1,lastStep,stones)
//     } else if(stones[goPos] - stones[nowPos] === lastStep-1){
//       // 等于k-1
//       dp(goPos,goPos+1,lastStep-1,stones)
//       dp(nowPos,goPos+1,lastStep,stones)
//       dp(nowPos,goPos+2,lastStep,stones)
//     } else if(stones[goPos] - stones[nowPos] < lastStep-1){
//       // 等于k-1
//       dp(nowPos,goPos+1,lastStep,stones)
//     }
//   }
//   return res
//   // 跳的步数大于则往前
// };

// console.log(canCross([0,2])); 
