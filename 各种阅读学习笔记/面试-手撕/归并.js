// 事件复杂度 NlogN 空间复杂度 N
const mergeSort = function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  let result = [];
  while (left.length && right.length) {
      if (left[0] < right[0]) {
          result.push(left.shift());
      } else {
          result.push(right.shift());
      }
  }
  
  result.push(...left, ...right) 
  return result;
}

const test = [1,5,33,4,6,9,44,66,77,55]
console.log(mergeSort(test))