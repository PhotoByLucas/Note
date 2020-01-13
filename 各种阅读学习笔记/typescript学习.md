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

        当一个函数没有返回值时，你可以显式指定返回值为 void；如果不显式指定，会被自动推导为 Void 类型

        ```
        // 显式指定返回类型为 void
        function hi(): void { /**函数体为空**/ }
        // 和上面等价，返回值会被自动推导为 void
        function hi() { /**函数体为空**/ }
        ```

      - null 和 undefined

        Null 类型和 Undefined 类型的类型表现和编译选项 strictNullChecks 有关

        - strictNullChecks 选项打开
          - null 只能赋值给 Null 类型
          - undefined 只能赋值给 Undefined 类型 和 Void 类型
        - strictNullChecks 选项关闭，null 和 undefined 可以赋值给任意类型

      - never
      - any

        显式指定为 any 或 未指定初始化类型和初始值，都会被认为是 any

   4. 数组类型

      1. 数组类型

         ```
         T[]
         // 其中 T 可以是任何类型，代表的是数组的元素类型

         let list: number[] = [1, 2, 3];
         // 二维数组
         let vec: number[][] = [[1, 2, 3], [1, 2, 3]];
         ```

      2. 元组类型

         元组和数组类似，只不过元组是一种固定长度的数组，每个元素有自己的类型。语法为：

         ```
         [T0, T1, ...]
         // T0, T1代表任意类型，省略号表示可以有任意多个元素。

         let x: [string, number];

         x=['hello',10]
         ```

   5. 函数类型
      ```
      // 将类型兼容的函数赋值给fn
      fn = function(x: number, y: number): number {
        return x + y;
      }
      ```
   6. 枚举类型

      ```
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
      ```

   7. 复合类型

      1. 交叉类型 且

         ```
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
         ```

      2. 联合类型 或

         ```
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
         ```

      3. 混合联合
         ```
         // 值与类型混搭  也可以值和值 类型和类型
         let u: 99 | string | boolean;
         u = 'a';
         u = 99;
         u = true;
         ```
      4. keyof 关键字

         ```
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
         ```

   8. 接口类型

      1. 可选属性与只读属性

         ```
         interface Person {
           // 声明name为只读
           readonly name: string;
           // 注意此处的问号，age此时为可选属性
           age?: number;
         }

         // 正确
         let man: Person = {
           name: 'joye',
         };

         // 错误，只读属性的值不能更改
         // error TS2540: Cannot assign to 'name' because it is a constant or a read-only property
         man.name = 'woman';
         ```

      2. 描述对象字面量

         ```
         // 直接将对象字面量赋值给接口类型
         // 错误，对象字面量直接赋值检查所有属性的兼容性
         // error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
         // Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
         let man: Person = {
           name: 'joye',
           age: 30,
           gender: 'male'
         };

         // 定义一个对象字面量male
         let male = {
           name: 'joye',
           age: 30,
           gender: 'male'
         };

         // 正确，male包含Person接口的所有属性
         let man: Person = male;

         // 对象字面量在直接赋值的时候，编译器会检查字面量类型是否完全匹配，多一个或少一个属性都会报错。
         ```

      3. 描述函数

         ```
         // 描述函数
         interface MyFunc {
           (name: string, age: number): string;
         }

         // 等价于
         let fn: MyFunc;
         let fn: (name: string, age: number) => string;
         let fn: { (name: string, age: number): string; } // 匿名接口
         ```

      4. 描述可索引值(对象或数组)

         ```
         interface StringArray {
           [index: number]: string;
         }

         // 描述一个对象
         interface MyObject {
           [index: string]: string;
         }

         // 类数组：既支持数字索引，也支持字符串索引
         interface IndexObj {
             [x: number]: string;
             [x: string]: string;
         }

         // JS会将数字索引转换为字符串索引，数字索引和字符串索引的值的类型必须相等，或者数字索引的返回值必须是字符串索引返回值类型的子类型
         // 错误，数字索引的值和字符串索引的值不匹配
         interface IndexObj {
             [x: number]: number;
             [x: string]: string;
         }
         ```

      5. 继承和实现

         ```
         // ClockInterface 描述了一个属性和一个方法
         interface ClockInterface {
           currentTime: Date;
           setTime(d: Date): void;
         }

         // 实现接口
         // 实现类必须包含接口所声明的全部必选属性
         class Clock implements ClockInterface {
           currentTime: Date;
           setTime(d: Date) {
             this.currentTime = d;
           }
           constructor(h: number, m: number) { }
         }

         // 继承接口
         interface MyClock extends ClockInterface {
           hour:number;
           minute:number;
           second:number;
         }

         let detailClock:MyClock={
           currentTime: new Date();
           setTime(d: Date) {};
           hour:0;
           minute:0;
           second:0;
         }
         ```

   9. 类类型
      ~~~
      // 定义类
      class TypeA { // ... }

      // 声明TypeA类型
      let a: TypeA;
      // 赋值TypeA类型
      a = new TypeA();
      ~~~
      对es6的语法扩展
      1. 实例属性和静态属性能直接定义在类内部
      2. public/private/protected
      3. readonly属性必须在声明时或构造函数里被初始化
      4. 抽象类和抽象方法
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
