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
