// const line1 = read_line().split(' ')
// const n = parseInt(line1[0])
// const p = parseInt(line1[1])
// const q = parseInt(line1[2])
// const arr1 = read_line().split(' ')
// const arr2 = read_line().split(' ')

// const mySet = new Set(arr1)
// const result = []

// for (let index = 0; index < arr2.length; index++) {
//   if(mySet.has(arr2[index])) {
//     result.push(arr2[index])
//   }
// }

// console.log(p - result.length, q - result.length, result.length)

// function isUpper(temp = '') {
//   return temp >= 'A' && temp <= 'Z'
// }

// const arr = read_line().split(' ')
// let upper = 0
// let downer = 0

// for (let index = 0; index < arr.length; index++) {
//   if(isUpper(arr[index])) {
//     upper++
//   } else {
//     downer++
//   }
// }

// console.log(Math.abs(upper - downer)/2)

// const m = parseInt(read_line())
// const m = 3
// const myMap = new Map() 
// let result = []
// const nums = [1, 2, 1]
// for (let index = 0; index < m; index++) {
//   // const num = parseInt(read_line())
//   const num = nums[index]
//   if(!myMap.has(num)) {
//     myMap.set(num, result.length)
//     result.push(num)
//   } else {
//     let pos = myMap.get(num)
//     result[pos] = -1
//     myMap.set(num, result.length)
//     result.push(num)
//   }
// }

// for (let index = result.length - 1; index >= 0; index--) {
//   if(result[index] > 0) {
//     console.log(result[index])
//   }
// }

function twoXor(a, i, n) {
  let result = a
  for (let j = 1; j < n + 1; j++) {
    result ^= (i % j)
  }
  return result
}

const n = read_line()
const aArray = read_line().split(' ')
const bArray = []
for (let index = 0; index < aArray.length; index++) {
  bArray.push(twoXor(parseInt(aArray[index]), index + 1, n))
}

let result = bArray[0]
for (let index = 1; index < bArray.length; index++) {
  result ^= bArray[index]
}
console.log(result)