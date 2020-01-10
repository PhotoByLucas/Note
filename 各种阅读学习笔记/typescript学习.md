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
      - 
   4. 数组类型
   5. 函数类型
   6. 枚举类型
   7. 复合类型
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
