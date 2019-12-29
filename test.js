function Num1(n) {
  var count = 0;

  // 加入一个flag属性，作为验证该数的某一位是否为1的依据
  // 二进制为  00000001
  var flag = 1;
  while (flag) {
    if (n & flag) {
      count++;
    }

    flag = flag << 1;
    // 会变为
    // 0000010
    // 0000100
    // 0001000
    // 知道超出32位
  }
  return count;
}
