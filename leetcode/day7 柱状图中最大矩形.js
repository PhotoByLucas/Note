// 84. 柱状图中最大的矩形
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let largest = 0;
  for (let index = 0; index < heights.length; index++) {
    let maxHeight = Number.MAX_VALUE;

    for (let j = index; j < heights.length; j++) {
      // 通过记忆化将搜寻数组中的最短数存下来，从O(n3)=>O(n2)
      maxHeight = Math.min(maxHeight, heights[j]);
      largest=Math.max(largest,maxHeight*(j-index+1))
    }
    console.log(index,maxHeight)
  }

  return largest;
};

let a = [2,1,5,6,2,3]

console.log(largestRectangleArea(a));
