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

// class LazyMan {
//   constructor(name) {
//     this.name = name
//     this.task = []
//     console.log('hi i am ' + this.name)
//     setTimeout(() => {
//       this.doTask()
//     }, 0)
//   }
  
//   doTask() {
//     if(this.task.length) {
//       this.task.shift()()
//     }
//   }
  
//   eat(food) {
//     this.task.push(() => {
//       console.log(food)
//       this.doTask()
//     })
//     return this
//   }

//   sleep(time) {
//     this.task.push(() => {
//       setTimeout(() => {
//         console.log('sleep ' + time)
//         this.doTask()
//       }, time*1000 )
//     })
//     return this
//   } 

//   sleepFirst(time) {
//     this.task.unshift(() => {
//       setTimeout(() => {
//         console.log('sleep first' + time)
//         this.doTask()
//       }, time*1000 )
//     })
//     return this
//   }

// }

// function lazyMan(name) {
//   return new LazyMan(name)
// }

// lazyMan('Tony').eat('lunch').sleepFirst(1).sleep(1).eat('dinner')


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
function add(...argc) {
  let result = 0 
  for (let index = 0; index < argc.length; index++) {
    result += argc[index]
  }
  
  function fb (...brgc) {
    for (let index = 0; index < brgc.length; index++) {
      result += brgc[index]
    }
    return fb
  }

  fb.toString = function() {
    return result
  }

  return fb
}

console.log(add(3,4,5)(6,8)(7,0)) 