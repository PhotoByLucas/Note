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

  1. 标准文档流  
     从左到右从上到下，由块级元素和行内元素组成
  2. [浮动 float](https://juejin.im/post/5a260c6d6fb9a0452a3c2c6a#heading-5)  todo
      - block元素无视float元素，
      - inline元素像流水一样围绕着float元素来实现浮动布局。  
      - 浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。

  3. [定位 position](https://www.cnblogs.com/linghu-java/p/8964488.html)

     - 相对定位 relative：定位元素的位置**相对于它在普通流中的位置**进行移动，元素仍然会在普通流中占位

     - 绝对定位 absolute  
        绝对定位的元素位置是相对于距离它最近的那个已定位的祖先(相对/绝对)元素决定的。 如果元素没有已定位的祖先元素， 那么它的位置相对于初始包含块。  
        绝对定位的元素**脱离普通流**，在普通流中不占位置  
        使用 z-index
      - 固定定位 fixed  
        相对于浏览器窗口，其余相当于绝对定位
- [负边距](https://www.cnblogs.com/2050/archive/2012/08/13/2636467.html)
- 圣杯布局
    1. 确定三个元素宽和高，middle为width:100%，由body宽度减去两个padding（400px）得出，且若body增大，会逐渐变大
    2. 声明为float，脱离文档流
    3. 因为行内空间已被middle通过width占满，则应通过**声明margin-left为负**使得左右两个元素可以放入
        - left 若无margin-left，则left的左边应与middle右边紧贴（但由于宽度不足被挤到下一行），声明后变为left的左边与middle左边重叠
        - right 仅需声明一个足以容纳right的负边距即可
    4. 添加相对定位，使得left和right相对于与middle边紧贴发生位移
<html>

<head>
<style type="text/css">
body {
    min-width: 600px; /*两个padding和middle宽度*/
}
.container {
    padding-left: 210px;
    padding-right: 190px;
}
.middle {
    float: left;
    width: 100%;
    height: 300px;
    background-color: rgba(255, 0, 0, .5);
}
.left {
    position: relative;
    left: -210px;
    float: left;
    width: 200px;
    height: 300px;
    margin-left: -100%;
    background-color: rgba(0, 255, 0, .5);
}
.right {
    position: relative;
    right: -190px;
    float: left;
    width: 180px;
    height: 300px;
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

说到这里需要注意一下 由于双飞翼布局会一直随着浏览器可视区域宽度减小从而不断挤压中间部分宽度。

