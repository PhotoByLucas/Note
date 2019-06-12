本文链接 https://juejin.im/post/5ca2e1935188254416288eb2#heading-54
# 1. 类
~~~
  class Animal {
    // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name,color) {
      this.name = name;
      this.color = color;
    }
    // toString 是原型对象上的属性
    toString() {
      console.log('name:' + this.name + ',color:' + this.color);

    }
  }

 var animal = new Animal('dog','white');//实例化Animal
 animal.toString();

 console.log(animal.hasOwnProperty('name')); //true
 console.log(animal.hasOwnProperty('toString')); // false
 console.log(animal.__proto__.hasOwnProperty('toString')); // true

 class Cat extends Animal {
  constructor(action) {
    // 子类必须要在constructor中指定super 函数，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super函数的constructor将会被添加、
    super('cat','white');
    this.action = action;
  }
  toString() {
    console.log(super.toString());
  }
 }

 var cat = new Cat('catch')
 cat.toString();

 // 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
 console.log(cat instanceof Cat); // true
 console.log(cat instanceof Animal); // true
 ~~~
 # 2. 模块化
 + ## export
  ~~~
    export var name = 'Rainbow'
    
    var name = 'Rainbow';
    var age = '24';
    export {name, age};
    
    export function myModule(someArg) {
      return someArg;
    } 
  ~~~
+ ## import
# 3. 箭头函数
+ 箭头函数与包围它的代码共享同一个this
+ =>之前是一个空括号、单个的参数名、或用括号括起的多个参数名
+ =>之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过return来返回值，否则返回的是undefined）。
+ 卸载监听？

# 4. 函数参数默认值
  ~~~
  function foo(height = 50, color = 'red')
  {
      // ...
  }
  ~~~
# 5. 模板字符串
  ~~~
  var name = 'Your name is ' + first + ' ' + last + '.'
  //相同情况下的模板字符串
  var name = `Your name is ${first} ${last}.`
  ~~~
# 6. 解构赋值
+ 获取数组中的值

  ~~~
  var foo = ["one", "two", "three", "four"];

  var [one, two, three] = foo;
  console.log(one); // "one"
  console.log(two); // "two"
  console.log(three); // "three"

  //如果要忽略某些值，只获取想要的值
  var [first, , , last] = foo;
  console.log(first); // "one"
  console.log(last); // "four"
  ~~~
+ 交换两个变量的值
+ 声明默认值
  ~~~
  var a, b;

  //对b声明默认值
  [a=5, b=7] = [1];
  console.log(a); // 1
  console.log(b); // 7
  ~~~
+ 快捷获取对象中的值
  ~~~
  const student = {
  name:'Ming',
  age:'18',
  sex:'1',
  city:'Shanghai'  
  };

  const {name,age,city,sex} = student;
  console.log(name); // "Ming"
  console.log(age); // "18"
  //可以乱序
  console.log(sex); // "1" 
  ~~~
# 7. 延展操作符
+ 对数组进行展开
~~~
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];

//不使用延展操作符
console.log(sum.apply(null, numbers));

//使用延展操作符
console.log(sum(...numbers));// 6
~~~
~~~
const stuendts = ['Jine','Tom']; 
const persons = ['Tony',... stuendts,'Aaron','Anna'];
conslog.log(persions)// ["Tony", "Jine", "Tom", "Aaron", "Anna"]
~~~
~~~
var arr = [1, 2, 3];
var arr2 = [...arr]; // 等同于 arr.slice()

var arr3 = [...arr1, ...arr2];
// 数组连接

arr2.push(4); 
console.log(arr2)//[1, 2, 3, 4]
console.log(arr3)//[1, 2, 3, 1, 2, 3]
~~~
# 8. 对象简写
~~~
const name='Ming',age='18',city='Shanghai';
  
const student = {
    name,
    age,
    city
};
console.log(student);
//{name: "Ming", age: "18", city: "Shanghai"}
~~~
# 9. Promise
~~~
setTimeout(function()
{
    console.log('Hello'); // 1秒后输出"Hello"
    setTimeout(function()
    {
        console.log('Hi'); // 2秒后输出"Hi"
    }, 1000);
}, 1000);
~~~
~~~
var waitSecond = new Promise(function(resolve, reject)
{
    setTimeout(resolve, 1000);
});

waitSecond
    .then(function()
    {
      console.log("Hello"); // 1秒后输出"Hello"
      return waitSecond;
    })
    .then(function()
    {
        console.log("Hi"); // 2秒后输出"Hi"
    });
~~~
# 10. let 和const