let inputN = 4;
let tag = 1;
let myNumber = new Array();
for (let i = 0; i < inputN + 1; i++) {
  // 新建一个n+1长度的初始化为0的数组
  myNumber.push(0);
}

while (tag) {
  print(tag);
  increase(inputN);
}

// 增长函数 立刻执行
// n 为+1的数组位
function increase(n) {
  // 最高一位为1时，说明已经超过n位
  if (myNumber[0] !== 0) {
    tag = false;
  }

  myNumber[n] += 1;
  if (myNumber[n] === 10) {
    // 进位
    if (myNumber[inputN-tag] === 0&&inputN-n+1===tag) {
      tag += 1;
    }
    increase(n - 1);
    myNumber[n] = 0;
  }
}

function print(tag) {
  if (myNumber[0] !== 0) return;

  let tempNum = myNumber.slice(inputN - tag + 1, inputN + 1);
  // console.log(myNumber, tempNum, tag);
  console.log(tempNum.join(""),tag);
}
