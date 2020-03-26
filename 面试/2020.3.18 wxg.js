// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/98
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


/*
实现 multiply
要求

multiply(1,2).result === 2
multiply(1,2)(3).result == 6
multiply(1,2)(3,4).result == 24
multiply(1,2)(3,4)(5).result == 120
*/
function add() {
    var sum = 0;
    let argc1 = Array.from(arguments);
    argc1.forEach(element => {
      sum += element;
    });
  
    function temp() {
      let argctemp =Array.from(arguments); 
      argctemp.forEach(element => {
        sum += element;
      });
      return temp;
    }
  
    temp.toString = temp.valueOf = function() {
      return sum;
    };
  
    return temp;
  }
  console.log(add(2,1)(3)(4)(5)); // 14 如果不重写valueOf和tostring方法，就要多一个括号
  