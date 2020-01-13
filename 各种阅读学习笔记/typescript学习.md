[快速入门](https://mp.weixin.qq.com/s/ps4qRtkDJSeWUiEw5nqIOg)

[两小时入门 ts](https://github.com/joye61/typescript-tutorial)

1. 类型

   1. 为什么需要类型
      JavaScript 需要强制类型的最好理由：它可以让绝大部分的错误发生在编码阶段，而不是让错误发生在线上！
   2. 值的类型化

      **类型注解**是指在源代码中显式指定值的类型，它的语法格式如下：

      ```
      // 语法
      : 类型

      // 声明字符串类型变量并初始化
      let strValue: string = 'hello world';

      // 指定类的属性类型
      class Hello {
        show: boolean = true;
      }

      // 指定函数参数和返回值类型
      function sum(a: number, b: number): number {
        return a + b;
      }
      ```

      **类型注解**是可选的，在绝大多数未显式注解类型的情况下，编译器能自动推导出值的类型

      ```
      // 返回值被自动推导为数字类型 number
      function show(param: number) {
        return param;
      }
      // 等价于
      function show(param: number): number {
        return param;
      }
      ```

      **类型查询**是一条语句，相当于一个独立类型。

      ```
      // 语法
      : typeof 值

      // 函数fn为函数
      function fn(){}

      // 通过类型查询声明d的类型为fn的类型
      let d: typeof fn;
      // 等价于
      let d: () => void;
      ```

      **类型注解、类型推导、类型查询**构成了 TypeScript 的类型判定系统，TypeScript 编译器判定值的类型时，主要是通过以上三种方式。

   3. 简单类型
      - number 均为浮点数
      - boolean true/false
      - string
      - symbol
      - void

          当一个函数没有返回值时，你可以显式指定返回值为 void；如果不显式指定，会被自动推导为 Void类型
          ~~~
          // 显式指定返回类型为 void
          function hi(): void { /**函数体为空**/ }
          // 和上面等价，返回值会被自动推导为 void
          function hi() { /**函数体为空**/ }
          ~~~
      - null和undefined

          Null类型和Undefined类型的类型表现和编译选项 strictNullChecks 有关
          - strictNullChecks 选项打开
              - null 只能赋值给 Null类型
              - undefined 只能赋值给 Undefined类型 和 Void类型
          - strictNullChecks 选项关闭，null 和 undefined 可以赋值给任意类型

      - never
      - any 

          显式指定为any 或 未指定初始化类型和初始值，都会被认为是any
   4. 数组类型

      1. 数组类型
          ~~~
          T[]
          // 其中 T 可以是任何类型，代表的是数组的元素类型

          let list: number[] = [1, 2, 3];
          // 二维数组
          let vec: number[][] = [[1, 2, 3], [1, 2, 3]];
          ~~~
      2. 元组类型

          元组和数组类似，只不过元组是一种固定长度的数组，每个元素有自己的类型。语法为：
          ~~~
          [T0, T1, ...]
          // T0, T1代表任意类型，省略号表示可以有任意多个元素。

          let x: [string, number];

          x=['hello',10]
          ~~~

   5. 函数类型
      ~~~
      // 将类型兼容的函数赋值给fn
      fn = function(x: number, y: number): number {
        return x + y;
      }
      ~~~
   6. 枚举类型
      ~~~
      enum Direction {
          Up = 2,
          Down,
          Left = 3.3
          Right
        }

        // 可得出
        Direction.Up === 2;       // 显式初始化
        Direction.Down === 3;     // 2 + 1 = 4.3
        Direction.Left === 3.3;   // 显式初始化
        Direction.Right === 4.3;  // 3.3 + 1 = 4.3

        // 声明d为枚举类型Direction
        let d: Direction;
      ~~~
   7. 复合类型
      1. 交叉类型 且
          ~~~
          interface Bird {
            fly(): void;
          }
          interface Dog {
            run(): void;
          } 

          // 同时具有Bird的fly和Dog的run特征
          class Animal {
            fly(){}
            run(){}
          }

          // 正确
          let animal: Bird & Dog = new Animal();
          ~~~
      2. 联合类型 或
          ~~~
          // 与 Bird 兼容
          class Animal1 {
            fly(){}
          }
          // 与 Dog 兼容
          class Animal2 {
            run(){}
          }

          // 正确，满足了Bird
          let animal1: Bird | Dog = new Animal1();
          // 正确，满足了Dog
          let animal2: Bird | Dog = new Animal2();
          ~~~
      3. 混合联合
          ~~~
          // 值与类型混搭  也可以值和值 类型和类型
          let u: 99 | string | boolean;
          u = 'a';
          u = 99;
          u = true;
          ~~~
      4. keyof关键字
          ~~~
          interface Person {
            name: string;
            age: number;
          }

          // 通过keyof关键字声明联合
          let keyWord: keyof Person;
          // 完全等价于
          let keyWord: "name" | "age";

          keyWord = "name";
          keyWord = "age";
          ~~~
   8. 接口类型
   
   9. 类类型

2. 泛型
   1. 泛型语法
   2. 泛型约束
   3. 泛型数组

3. 类型转换
   1. 类型别名
   2. 类型断言

4. 模块
   commonJS 兼容模块

5. 命名空间
   1. 命名空间
   2. 空间拆分
   3. 空间嵌套
   4. 空间别名

6. 理解声明
   1. 为什么需要声明
   2. 内部声明
   3. 外部声明
   4. 三斜线指令和 d.ts 文件
