[原文](https://mp.weixin.qq.com/s/fH2xYo_Bad0mgvo0OdYRZQ)

### AST(抽象语法树)是对源代码的抽象语法结构的树状表现形式。

### AST 是通过 JS Parser （解析器），将 js 源码转化为抽象语法树，主要分为两步：

1. 分词：将整个的代码字符串，**分割成语法单元（token）**。

   JS 中的语法单元（token）指标识符（function，return），运算符，括号，数字，字符串等能解析的最小单元。主要有以下几种：

2. 语义分析：将分词得到的语法单元进行一个整体的组合，分析确定语法单元之间的关系。 可以理解成**对语句（statement）和表达式（expression）的识别**。

### AST 应用

- babel 把 es6 转 es5

  1. 解析 Parse : 解析出 AST
  2. 转换 TransForm

     babel-traverse 对需要转换的 AST 节点直接转换

  3. 生成 Generate : 通过 babel-generator 将 AST 树生成 es5 代码。
