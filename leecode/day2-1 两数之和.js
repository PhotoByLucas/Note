// 题目一：两数之和
// 题目：给定一个已按照 升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
// 正确版本：用双指针，因为是升序数组，详见题解https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/solution/liang-shu-zhi-he-ii-shu-ru-you-xu-shu-zu-by-leetco/
// 暴力版本
// var twoSum = function(numbers, target) {
//   for (let i1 = 0; i1 < numbers.length; i1++) {
//     const element1 = numbers[i1];
//     for (let i2=i1+1; i2 < numbers.length; i2++) {
//       const element2 = numbers[i2];
//       if (element1+element2===target) {
//         return [i1+1,i2+1]
//       }
//     }
//   }    
// };
// const  numbers = [0,0,3,4]
// const target = 3
// console.log(twoSum(numbers,target))
