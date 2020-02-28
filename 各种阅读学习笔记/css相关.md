## css

- 如何引入 css

  1. 外部样式表
     ```
     <head>
       <link rel="stylesheet" type="text/css" href="mystyle.css">
     </head>
     ```
  2. 内部样式表

     ```
     <style></style>
     ```

  3. 内联样式表

  内联样式 Inline style > 内部样式 Internal style sheet >外部样式 External style sheet > 浏览器默认样式

- 盒模型  
  margin border padding 内容
- 定位机制

  1.  标准文档流
      - 在常规流中，盒一个接着一个排列
      - 在块级格式化上下文（BFC）里面，它们竖着排列；在行内格式化上下文里面，它们横着排列;
      - 静态定位 position: static(默认值)，盒的位置是常规流布局里的位置；
      - 相对定位 position: relative，元素仍然在标准文档流中
  2.  [浮动 float](https://juejin.im/post/5a260c6d6fb9a0452a3c2c6a#heading-5)

      - 除非设置 clear 属性，否则常规流将环绕在浮动盒的周围，它位于当前行的开头或末尾，表现为：

        - block 元素无视 float 元素，
        - inline 元素像流水一样围绕着 float 元素来实现浮动布局。
        - 浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。

      - 块级框  
         将一个块级元素声明为 float 后，会像 inline 元素一样产生包裹性，宽度随着内容自适应

      - 高度坍塌  
         将 inner div2 中的元素声明为 float 后，无法撑开外部的 div，因为已经脱离文档流，外部 div2 认为 inner 不存在

      <div>
      <head>
      <style type="text/css">
      .div1{
      	border: 3px solid white;
      }
      .div1 div{
          background:blue;
      }
      .div2 {
      	border: 3px solid red;
      }
      .div2 div {
      	float: left;
          background:green;
      }
      </style>
      </head>
      <body>
          <div class="div1">
            <div>inner div1</div>
        </div>
        <div class="div2">
            <div>inner div2</div>
        </div>
        <div style="height:20px"></div>
      </body>
      </div>

      - clear 属性：不允许某个方向有浮动元素，用于使得一个元素不与浮动元素同一行  
        clear : none 默认值，都可以有 | left 左 | right 右 | both 左右两边都不能

3.  [定位 position](https://www.cnblogs.com/linghu-java/p/8964488.html)

    - 相对定位 relative：定位元素的位置**相对于它在普通流中的位置**进行移动，元素仍然会在标准文档流中，也可以理解为他是标准流

    - 绝对定位 absolute  
      绝对定位的元素定位是相对于距离它最近的最近的一个 relative、fixed 或 absolute 的父元素，如果没有则相对于 body；  
      绝对定位的元素**脱离普通流**，在普通流中不占位置  
      使用 z-index
    - 固定定位 fixed  
      相对于浏览器窗口，其余相当于绝对定位

- [BFC 块级格式化上下文(Block Formatting Context)](https://juejin.im/post/5a260c6d6fb9a0452a3c2c6a#heading-5)

  1. 创建 BFC
     - 根元素或其他包含他的元素
     - float 不为 none, position:fixed|absolute 脱离文档流
     - display: inline-block 行内块
     - display: table-cell 表格单元格
     - display: flex | inline-flex
     - overflow 不为 visible 的值
  2. 范围
     - 一个 BFC 包含创建该上下文元素的所有子元素，但不包括创建了新 BFC 的子元素的内部元素
     - 一个元素不能同时存在于两个 BFC 中
  3. 效果
     1. 内部的盒会在垂直方向一个接一个排列
     2. 处于同一个 BFC 中的元素相互影响，可能会发生 margin collapse
     3. 每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
     4. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
     5. [计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算](https://juejin.im/post/59b73d5bf265da064618731d#heading-15)
     6. [BFC 的区域不会与 float box 重叠。](https://juejin.im/post/59b73d5bf265da064618731d#heading-17)
  4. 应用 1. 防止外边距坍塌 2. 容纳浮动元素高度，闭合浮动 3. 防止与浮动元素重叠
     <html>
     <head>
     <style>
     .containerBFC {
       background-color: black;
       overflow: hidden;
     }
     .innertiaomu {
       background-color: white;
       margin: 10px 0;
       text-align: center;
       color:red;
     }
     .outterTiaomu {
       background-color: white;
       margin: 10px 0;
       text-align: center;
       color:red;
     }
     </style>
     </head>
     <body>
       <p class="outterTiaomu">条目 outter 将下面的黑盒子声明为BFC，才不会与这个元素坍塌，该元素下面空行是他的margin</p>
     <div class="containerBFC">
       <p class="innertiaomu">条目 1，该元素上面的黑条为其margin</p>
       <p class="innertiaomu">条目 2</p>
       <p class="innertiaomu">条目 3</p>
     </div>
     </body>
     </html>

- [负边距](https://www.cnblogs.com/2050/archive/2012/08/13/2636467.html)
- 圣杯布局
  1. 确定三个元素宽和高，middle 为 width:100%，由 body 宽度减去两个 padding（400px）得出，且若 body 增大，会逐渐变大
  2. 声明为 float，脱离文档流
  3. 因为行内空间已被 middle 通过 width 占满，则应通过**声明 margin-left 为负**使得左右两个元素可以放入
     - left 若无 margin-left，则 left 的左边应与 middle 右边紧贴（但由于宽度不足被挤到下一行），声明后变为 left 的左边与 middle 左边重叠
     - right 仅需声明一个足以容纳 right 的负边距即可
  4. 添加相对定位，使得 left 和 right 相对于与 middle 边紧贴发生位移
  5. 给 container 加上 overflow:hidden，否则会导致下面写的文字环绕在红色色块右边（形成 BFC 撑开高度）

<html>
<head>
<style type="text/css">
body {
    min-width: 600px; /*两个padding和middle宽度*/
}
.container {
    padding-left: 210px;
    padding-right: 190px;
    overflow: hidden; /* 不加的话会因为float导致高度坍塌*/
}
.middle {
    float: left;
    width: 100%;
    height: 100px;
    background-color: rgba(255, 0, 0, .5);
}
.left {
    position: relative;
    left: -210px;
    float: left;
    width: 200px;
    height: 100px;
    margin-left: -100%;
    background-color: rgba(0, 255, 0, .5);
}
.right {
    position: relative;
    right: -190px;
    float: left;
    width: 180px;
    height: 100px;
    margin-left: -180px;
    background-color: rgba(0, 0, 255, .5);
}
</style>
</head>
<body>
<div class="container">
    <div class="middle"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
</body>
</html>

- 双飞翼

  区别于圣杯，双飞翼布局会一直随着浏览器可视区域宽度减小从而不断挤压中间部分宽度。

  这里不声明 overfloat 是不会出现如圣杯一样的，下面的文字环绕到色块上，是因为 middle-container 的 width100%，已经占满了整行

<html>
<head>
<style type="text/css">
.middle2 {
float: left;
width: 100%;
}
.inner {
height: 100px;
margin-left: 210px;
margin-right: 190px;
background-color: rgba(255, 0, 0, .5);
}
.left2 {
float: left;
width: 200px;
height: 100px;
margin-left: -100%;
background-color: rgba(0, 255, 0, .5);
}
.right2 {
float: left;
width: 180px;
height: 100px;
margin-left: -180px;
background-color: rgba(0, 0, 255, .5);
}
</style>
</head>
<body>
<div class="middle2">
<div class="inner"></div>
</div>
<div class="left2"></div>
<div class="right2"></div>
</body>
</html>

- [圣杯与双飞翼](https://juejin.im/post/5caf4043f265da039f0eff94)
