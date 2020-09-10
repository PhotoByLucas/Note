// 这个技巧可以仔细研究一下
var backpack = function(w, weightArr = [], valArr = []){
  const n = weightArr.length
  let resultMatrix = []
  resultMatrix[-1] = new Array(w+1).fill(0)
  for (let y = 0; y < n; y++) {
    resultMatrix[y] = new Array(w+1).fill(0)
    for (let x = 0; x <= w; x++) {
      if(x < weightArr[y]) {
        // 装不下
        resultMatrix[y][x] = resultMatrix[y - 1][x]
      } else {
        // 装得下
        resultMatrix[y][x] = Math.max(resultMatrix[y - 1][x - weightArr[y]] + valArr[y], resultMatrix[y - 1][x])
      }
    }
  }
  
  // for (let index = 0; index < resultMatrix.length; index++) {
    //   console.log(resultMatrix[index])
    // }
    console.log(resultMatrix)
}

// backpack(10, [4, 3, 5, 2, 5], [9, 6, 1, 4, 1]) // 19
// backpack(10, [2, 2, 6, 5, 4], [6, 3, 5, 4, 6]) // 15
// backpack(5, [2, 3, 4], [3, 4, 5]) // 7
backpack(10, [5, 3, 4, 3, 5], [500, 200, 300, 350, 400]) // 900