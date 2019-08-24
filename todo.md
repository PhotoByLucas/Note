+ __dirname
+ asset 和 static的区别
    + https://www.jb51.net/article/142230.htm
    + https://www.jb51.net/article/140152.htm
+ 如何定义全局变量的css如
    + 我要使用一个全局通用的background-color
+ vux 使用采坑 辣鸡官方文档
    + https://www.jianshu.com/p/930d9bb22736
    + https://segmentfault.com/q/1010000010618031
+ 将顶部底部栏固定中间滚动方案
    + 关于position的解读 https://blog.csdn.net/qq_33248299/article/details/72617027
    + 动态获取高度方案  
        1. ref捕获元素
            ~~~
                <div class="fixed-item" ref="fixedItem"></div>

                this.fixedItemHeight = this.$refs.fixedItem.offsetHeight 
            ~~~
        2. 生成底部遮罩层
            ~~~
            <div :style="`height:${fixedItemHeight}px`"></div>
            ~~~
+ 移动端转场特效 vueg
+ require 和import的区别