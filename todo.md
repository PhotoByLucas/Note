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
+ 生命周期 
~~~
//这样子会显示键值undefined 但是放在mounted初始化就好了
  computed: {
      xx:()=>{
          return config.columns[this.$route.xxx]
      }
  },
~~~
+ computed 中使用箭头函数无法正常计算
+ object.keys
+  vue-router的history和hash模式todo
+ vue如何实现对象和数组的监听
+ 虚拟dom
+ export default 和 export 的区别 [变量引用函数](http://es6.ruanyifeng.com/?search=export&x=0&y=0#docs/module)

1. 来自哪里
2. 对华工有什么印象
3. 有什么想对即将开始大学生涯的自己说的
4. 对新的四年有什么期待呢