1. 变量提升 => 前端基础进阶 变量对象
2. bind apply call **todo**

   bind

   ```
   this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
   var module = {
     x: 81,
     getX: function() { return this.x; }
   };

   module.getX(); // 81

   var retrieveX = module.getX;
   retrieveX();
   // 返回 9 - 因为函数是在全局作用域中调用的

   // 创建一个新函数，把 'this' 绑定到 module 对象
   // 新手可能会将全局变量 x 与 module 的属性 x 混淆
   var boundGetX = retrieveX.bind(module);
   boundGetX(); // 81
   ```

   call apply

   ```
   let a = {
     value: 1
   }
   function getValue(name, age) {
     console.log(name)
     console.log(age)
     console.log(this.value)
   }
   getValue.call(a, 'yck', '24')
   getValue.apply(a, ['yck', '24'])
   ```

3. generator **todo**
4. 实现 Promise **todo**
5. 深拷贝 **todo**
   1. JSON.parse(JSON.stringfy(x))
   - 缺点
     1. 会忽略 undefined
     2. 会忽略 symbol
     3. 不能序列化函数
     4. 不能序列化循环引用的对象
6. typeof 和 instanceof
   - typeof
     - typeof 可以识别除了 null 以外所有类型
     - 对于对象类型除了函数都会显示 Object
       ```
         typeof [] // 'object'
         typeof {} // 'object'
         typeof console.log // 'function'
       ```
     - typeof 对 null 显示 object
   - instanceof 则是通过**proto**递归查找
     ```
     const auto = new Car('Honda', 'Accord', 1998);
     console.log(auto instanceof Car);
     ```
7. null 和 undefined
   ```
   null==undefined // true
   ```
   - undefined 是未指定特定值的变量的默认值，或者没有显式返回值的函数
   - null 是“不代表任何值的值”。null 是已明确定义给变量的值。
8. 根据 MDN 文档，**+或其他一元运算符**是将字符串转换为数字的最快方法，因为如果值已经是数字，它不会执行任何操作。
9. event.preventDefault() 和 event.stopPropagation()
   - preventDefault 阻止默认事件
   - stopPropagation 组织冒泡/捕获的传播
10. event.target 和 currenntTarget
    - event.currentTarget 是我们在其上显式附加事件处理程序的元素。
    - event.target 是发生事件的元素或触发事件的元素。
11. == 和 ===
    - 规则 假设 x == y
      1. 如果类型相同，则执行 x===y
      2. undefined==null 为true
      3. 若String==Number，则 toNumber(String)==Number
      4. 若Bool==Number，则 toNumber(Bool)==Number
      5. 若Object == String | Number | Symbol ，则toPrimitive(Object)
      6. 其余的返回 false
12. 虚值:转换为布尔值时变为 false 的值。
    ~~~
    const falsyValues = ['', 0, null, undefined, NaN, false];
    ~~~
13. IIFE(Immediately Invoked Function Expression)立即调用函数
14. Array.prototype
    1. map 通过指定函数处理数组的每个元素，并返回处理后的新数组。
    2. filter 检测数值元素，并返回符合条件所有元素的数组。
15. NaN表示**非数字**是 JS 中的一个值，该值是将数字转换或执行为非数字值的运算结果
16. 不用%来判断奇偶 使用&运算
17. 判断对象中是否拥有某个属性
    - Object.hasOwnProperty 会忽略原型链继承的属性
    - in 会计算所有属性
      
18. 手撕快排
19. es6 class转es5
    ~~~
    class Person {
      constructor (name) {
            this.name = name;
      }
      greet () {
            console.log(`Hi, my name is ${this.name}`);
      }
      greetDelay (time) {
            setTimeout(() => {
                console.log(`Hi, my name is ${this.name}`);
            }, time);
      }
    }
    
    function Person(name){
      this.name=name
      Person.prototype.greet = function(){
        console.log("Hi, my name is "+this.name)
      }
      Person.prototype.greetDelay = function(time){
        var self =this
        setTimeout(function(){
          console.log("Hi, my name is "+self.name)
        },time)
      }
    }
    ~~~
20. 继承
    ~~~
    // 原型链继承
    SubType.prototype = new SuperType();

    // 构造函数继承
    function  SubType(){
        //继承自SuperType
        SuperType.call(this);
    }

    // es6
    class Square extends Rectangle
    ~~~