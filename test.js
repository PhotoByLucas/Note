var theThing = null;
var count = 0;
var result = 0;

let replaceThing = function () {
  count++;
  let that = theThing;
  let func = function () {
    if (that) console.log("hi "+"boy!");
  };
  switch (count % 2) {
    case 0:
      var temp = 1;
      result += temp;
      break;
    case 1:
      theThing = {
        longStr: new Array(1e8).join('*'),
        someMethod: function () {
          console.log("a");
        }
      }
  };
};

const timer = setInterval(replaceThing, 100);
