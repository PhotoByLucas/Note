## 第一部分 作用域与闭包

1. 作用域是什么

   LHS 和 RHS 的意义是 “赋值操作的左/右”，LHS 主要为“赋值”，RHS 主要为“取到目标的值”

2. 词法作用域
3. 函数作用域和块作用域

   3. 函数作用域

      4. let 与 循环

         ```
         for(let i=0;i<10;i++>){
           console.log(i)
         }
         ```

         let 会将其声明的变量饮食劫持在所在作用域且不会提升，相当于

         ```
         {
           var j
           for(j = 0; j < 10; i++){
             var i = j // 每次循环都重新赋值！
             console.log(i)
           }
         }
         ```

4. 提升
5. 作用域闭包

   4. 循环与闭包

      ```
      // 经典问题 输出五个6
      for (var i=1; i<=5; i++) {
        setTimeout( function timer() {
          console.log( i );
        }, i*1000 );
      }

      // 改用IIFE后也没用，没有生成新的作用域变量，仍然是对外部的i的引用
      for (var i=1; i<=5; i++) {
        (setTimeout( function timer() {
          console.log( i );
        }, i*1000 ))()
      }

      // 需要为每个函数创建单独的作用域变量，保持闭包对变量的正确引用，与let类似
      (function() {
        var j = i;
        setTimeout( function timer() {
          console.log( j );
        }, j*1000 );
      })();

      // 或
      (function(j) {
        setTimeout( function timer() {
          console.log( j );
        }, j*1000 );
      })(i);
      ```

## 第二部分 this 与原型对象

1. 关于 this

   - this 的绑定只取决于函数调用方式，与函数声明无关
   - 当一个函数被调用时，会创建执行上下文，包括了函数在哪被调用（调用栈）、函数调用方式、传入参数等；this 就是执行上下文中的一个属性

2. this 全面解析

   1. 确定 this 调用位置
   2. 绑定规则

      1. 默认绑定：没有指定调用对象时，this 指向全局对象，但严格模式下指向 undefined
      2. 隐式绑定：指定了调用对象

         ```
         let obj = {
           a: 2,
           foo: function () {
             console.log( this.a );
           }
         }

         obj.a() // 2
         ```

         传入回调函数

         ```
         function foo() {
          console.log( this.a );
         }
         function doFoo(fn) {
           // fn 其实引用的是 foo
           fn(); // <-- 调用位置！
         }
         var obj = {
           a: 2,
           foo: foo
         };
         var a = "oops, global"; // a 是全局对象的属性
         doFoo( obj.foo ); // "oops, global"

         // settimeout函数相也相当于一个doFoo式调用
         setTimeout( obj.foo, 100 ); // "oops, global"
         ```

      3. 显示绑定：bind apply call
      4. new 绑定：在构造函数中指定 this

   3. 优先级

      显示绑定 > new 绑定 > 隐式绑定

      - 判定 this 方法
        1. 是否通过 new 调用?是则指向 new 创建的对象
        2. 是否通过显示调用?是则指向绑定的对象
        3. 隐式调用?是则指向调用对象
        4. 默认绑定：
           - 严格模式下指向 undefined
           - 非严格模式下指向全局对象

   4. 特殊情况

      1. 把 undefined 或 null 作为参数传给显示绑定时，会 this 会指向全局
         ```
         function foo() {
           console.log( this.a );
         }
         var a = 2;
         foo.call( null ); // 2
         ```
      2. 箭头函数 绑定当前函数的 this 且不可改变（并不遵守四原则）

         ```
         function foo() {
           // 返回一个箭头函数
           return (a) => {
             //this 继承自 foo()
             console.log( this.a );
           };

           // 相当于
           var self = this
           return function(){
             console.log( self.a )
           }
         }
         ```

3. 对象

   1. 语法
   2. 类型
      - obj.a 属性访问
      - obj['a'] 键访问
   3. 内容

      - 属性与方法

        严格意义上说，对象中的函数并不属于对象，属性访问的时候只是隐式绑定了 this

   4. 复制对象
   5. 属性描述符 `Object.defineProperty`
      - writable 是否可以改变 value
      - configurable 是否可以配置属性描述符，将该属性修改为 false 为单向操作不可撤回
      - enumerable 是否可枚举，可用于 for in
   6. 不变性

      - 对象常量：`writable:false; configuable:false;`
      - 禁止扩展：`Object.preventExtensions`
      - 密封

        `Object.seal()` 将对象中所有属性标记为 `configuable:false;`

      - 冻结：不变性最高

        `Object.freeze()` 所有属性标记为 `writable:false`

   7. [[Get]] 
   8. [[Put]]
   9. Getter 和 Setter 

      ~~~
      var myObject = {
        get a() {
          return this._a
        },
        set a(val) {
          this._a = val
        }
      }
      ~~~