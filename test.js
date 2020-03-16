var result;
var lines = [
  ['3', '3'],
  ['1', '100'],
  ['10', '1000'],
  ['1000000000' ,'1001' ],
  ['9', '10', '1000000000']
];

// while ((line = readline())) {
//   lines.push(line.split(" "));
// }

const N = lines[0][0];
const M = lines[0][1];

let myMap = {};
let myArray = [];

for (let index = 0; index < N; index++) {
  const element = lines[index + 1];  
  myMap[element[0]] = myMap[element[0]] >= element[1] ? myMap[element[0]] : element[1];
  myArray.push(element[0]);

}

lines[lines.length - 1].forEach(element => {
});

myArray = myArray.sort((a, b) => a - b);

function twoPoint(num) {
  let p1 = 0,
    p2 = myArray.length - 1;
  while (p2 - p1 > 1) {
    let middle = parseInt((p1 + p2) / 2);
    if (myArray[middle] == num) {
      return num;
    } else if (myArray[middle] > num) {
      p2 = middle;
    } else {
      p1 = middle;
    }
    console.log(p1,p2)
  }
  return myArray[p2] == num ? num : myArray[p1];
}

const mates=lines[lines.length-1]

for (let index = 0; index < M; index++) {
  let mate=mates[index]  
  // let num=twoPoint(mate)
  // console.log(myMap[twoPoint(mate)])
}

console.log(10>'9','10'>'9')
console.log(twoPoint(9))