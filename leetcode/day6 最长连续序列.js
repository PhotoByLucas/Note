// 128. 最长连续序列
// https://leetcode-cn.com/problems/longest-consecutive-sequence/submissions/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  // 处理空数组
  if (nums.length<1) return 0;
  let longest = 1;
  // set为哈希表 时间复杂度最佳O(n) 最差O(n)
  let mySet = new Set();
  nums.forEach(num => {
    mySet.add(num);
  });

  let tempCounter 
  for (let num of mySet) {
    if(!mySet.has(num-1)){
      // 此时的num是一个序列的起始数字
      // 如果不是序列的最开端的数字，则不会进入到while中
      // 该算法最差复杂度为O(n+n)
      // 找了n次才在for中找到最小数，且该n长数组均为连续的
      tempCounter=1
      while(mySet.has(num+1)){
        tempCounter++
        num++
      }
      longest=Math.max(tempCounter,longest)
    }
  }
  return longest;
};

let a = [2147483646, -2147483647, 0, 0, 2, 2147483644, -2147483645, 2147483645];

console.log(longestConsecutive(a));
