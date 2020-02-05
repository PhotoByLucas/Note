/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let largest = 0;
  for (let index = 0; index < heights.length; index++) {
    let maxHeight = Number.MAX_VALUE;

    for (let width = 1; width <= heights.length; width++) {
      maxHeight = Math.min(maxHeight, heights[index+width-1]);

      largest=Math.max(largest,maxHeight*width)
    }
  }

  return largest;
};

let a = [2,1,5,6,2,3]

console.log(largestRectangleArea(a));
