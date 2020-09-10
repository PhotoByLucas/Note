function add(a = "", b = "") {
  let add = 0;
  let result = "";
  const arrayA = a.split("");
  const arrayB = b.split("");
  if ((arrayA[0] === "-" || arrayB[0] === "-") && arrayB[0] !== arrayA[0]) {
    let fuArray, zhengArray;
    let bigArray, smallArray;
    let sym = "";
    if (arrayA[0] === "-") {
      fuArray = arrayA;
      zhengArray = arrayB;
    } else {
      fuArray = arrayB;
      zhengArray = arrayA;
    }
    fuArray.shift();

    // 填充
    while (fuArray.length < zhengArray.length) {
      fuArray.unshift(0);
    }
    while (zhengArray.length < fuArray.length) {
      zhengArray.unshift(0);
    }

    // 取到绝对值
    for (let index = 0; index < fuArray.length; index++) {
      const numFu = parseInt(fuArray[index]);
      const numZheng = parseInt(zhengArray[index]);
      if (numFu !== numZheng) {
        // 结果为负数
        if (numFu > numZheng) {
          sym = "-";
          bigArray = fuArray
          smallArray = zhengArray
        } else {
            // 结果为正
            bigArray = zhengArray
            smallArray = fuArray
        }
        break;
      }
    }

    console.log(bigArray, smallArray)
    
    let deleteNum = 0
    for (let index = bigArray.length - 1; index >= 0; index--) {
        let tempResult = parseInt(bigArray[index]) - parseInt(smallArray[index]) - deleteNum
        console.log(tempResult)
        if(tempResult < 0) {
            deleteNum = 1
            tempResult += 10
        } else {
            deleteNum = 0
        }
        result =  tempResult + result
    }
    result = sym + result
    // 去掉0
    for (let index = 1; index < array.length; index++) {
        const element = array[index];
        
    }
  } else {
    let sym = "";
    if (arrayA[0] === "-") {
      sym = arrayA.shift();
      arrayB.shift();
    }
    while (arrayA.length | arrayB.length | add) {
      const numA = parseInt(arrayA.pop() | 0);
      const numB = parseInt(arrayB.pop() | 0);
      let temp = numA + numB + add;
      if (temp >= 10) {
        add = 1;
        temp -= 10;
      } else {
        add = 0;
      }
      result = temp.toString() + result;
    }

    result = sym + result;
  }
  return result.toString();
}


console.log(add('1', '-100'))
