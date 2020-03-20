/*
实现一个 GoodMan:
GoodMan("mike") 输出:
I am mike

GoodMan("mike").rest(10).learn("math") 输出
I am mike
//等待10秒
Start learning after 10 seconds
Learning math

GoodMan("mike").restFirst(5).learn("chinese") 输出
//等待5秒
Start learning after 5 seconds
I am mike
Learning chinese
*/

function GoodMan(name) {
  class myMan{
    constructor(name){
      console.log(`I am ${name}`)
    }

    rest(time) {
      return (function(time) {
        setTimeout(function timer() {
          console.log();
        }, time * 1000);
      })(time);
    }
    
    learn(xueke){
			console.log(`Learning ${xueke}`)
  }}
  
  return new myMan(name)
}


/* 
将以下 json 转成 HTML

var json = {
    tag: 'div',
    style: 'div-style',
    children: 
        'a text',
        {
            tag: 'img',
            src: 'img-src',
            style: 'img-style',
            children: [
                ...
            ]
        },
        'another text'
    ]
}

以及增加 tag 白名单和属性白名单

whiteList = {
  div: ["style"],
  img: ["style", "src"]
};
*/

function toHtml(tree, whiteList) {
  
}

/*
实现 multiply
要求

multiply(1,2).result === 2
multiply(1,2)(3).result == 6
multiply(1,2)(3,4).result == 24
multiply(1,2)(3,4)(5).result == 120
*/


function multiply(a, b) {
  var result = function(x,y) {
    if(arguments.length==1){
      return multiply(a*x);
    }else{
      return multiply(a*x*y);
    }
  };
  return result(a,b)
}