本文链接 https://juejin.im/post/5ca2e1935188254416288eb2#heading-54
# 1.类
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
 # 2.模块化
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
# 3.箭头函数
+ 箭头函数与包围它的代码共享同一个this
+ =>之前是一个空括号、单个的参数名、或用括号括起的多个参数名
+ =>之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过return来返回值，否则返回的是undefined）。


 
