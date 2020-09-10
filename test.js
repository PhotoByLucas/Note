const nums = [1, 2, 2, 2, 2, 1, 3, 3, 3];

const myMap = new Map();

let result = 0;

for (let index = 0; index < nums.length; index++) {
  if (myMap.has(nums[index]) && myMap.get(nums[index]) > 0) {
    myMap.set(nums[index], myMap.get(nums[index]) + 1);

    // 满了
    if (myMap.get(nums[index]) === nums[index] + 1) {
      result += myMap.get(nums[index]);
      myMap.set(nums[index], 0);
    }
  } else {
    myMap.set(nums[index], 1);
  }
}

for (let key of myMap.keys()) {
  if (myMap.get(key) !== 0) {
    result += key + 1;
  }
}

console.log(myMap);
console.log(result);
