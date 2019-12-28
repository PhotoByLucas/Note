# 2.let 和 const命令
#### let 
+ 适合使用在for中
+ 不存在变量作用域提升
  + var的变量提升：变量在声明前就可以使用，值为undefined
+ 只在当前块级作用域中有用
  + 未声明的时候会存在暂时性'死区'
  ~~~
    typeof x; // ReferenceError
    let x;
    //作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
    typeof undeclared_variable // "undefined"

  ~~~  
+ let不允许块级作用域内重复声明
+ 应该避免在块级作用域内声明函数，函数声明会提升到所在的块级作用域的头部。
  ~~~
  // 浏览器的 ES6 环境
  function f() { console.log('I am outside!'); }
  (
    function () {

      if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
      }

      f();
    }()
  );
  // Uncaught TypeError: f is not a function
  // 浏览器的 ES6 环境
  function f() { console.log('I am outside!'); }
  (
    function () {
      var f = undefined;
      if (false) {
        function f() { console.log('I am inside!'); }
      }

      f();
    }()
  );
  // Uncaught TypeError: f is not a function
    ~~~
#### const
+ 只读且不可改变
+ 不可重复声明
+ 同样存在死区
+ **实质：变量指向的内存地址保存的数据不可改变**
+ 复合数据类型：对象/数组
  ~~~
  //常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性，同理数组
  const foo = {};

  // 为 foo 添加一个属性，可以成功
  foo.prop = 123;
  foo.prop // 123

  // 将 foo 指向另一个对象，就会报错
  foo = {}; // TypeError: "foo" is read-only
  ~~~

#### ES6 声明变量的6种方式
+ var
+ function
+ let 
+ const
+ import
+ class

#### 顶层对象window
+ var function声明的全局变量，依旧是顶层对象的属性；
+ let、const、class声明的全局变量，不属于顶层对象的属性。
~~~
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
~~~
#### global 对象


# 变量的解构赋值  
1. 数组
~~~
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
~~~
~~~
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
//只有当一个数组成员严格等于undefined，默认值才会生效。
~~~
2. 对象
~~~
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
~~~
3. 字符串
4. 函数参数
5. **用途**
~~~
let x = 1;
let y = 2;

[x, y] = [y, x];
//交换变量值
~~~

### 正则表达式
1. 
~~~
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
~~~


### 函数
1. 函数与解构赋值 
~~~
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
~~~

2. 箭头函数
~~~
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
~~~
~~~
// 报错 需要用圆括号封起来
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
~~~

this对象的指向是可变的，但是在箭头函数中，它是固定的。  
箭头函数可以让this指向固定化  
箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
~~~
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
//上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。
~~~
3. rest参数
~~~
//形式为 ...参数名 对应一个数组
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
~~~

### Promise对象
1. 只有pending fulfilled rejected三种状态
~~~
const promise = new Promise(function(resolve, reject) {
  //  some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
~~~
2.then方法
~~~
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
~~~
+ then方法可以接受两个回调函数作为参数。
+ 第一个回调函数是Promise对象的状态变为resolved时调用，
+ 第二个回调函数是Promise对象的状态变为rejected时调用。
3. 执行顺序
~~~
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
~~~
+ Promise 新建后立即执行，所以首先输出的是Promise。
+ 然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
