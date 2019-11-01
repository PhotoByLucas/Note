+ __dirname
+ asset 和 static的区别
    + https://www.jb51.net/article/142230.htm
    + https://www.jb51.net/article/140152.htm
+ 如何定义全局变量的css如
    + 我要使用一个全局通用的background-color
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
+ require 和import的区别

+ computed 中使用箭头函数无法正常计算
+ object.keys
+ vue-router的history和hash模式todo
+ vue如何实现对象和数组的监听
+ 虚拟dom
+ export default 和 export 的区别 [变量引用函数](http://es6.ruanyifeng.com/?search=export&x=0&y=0#docs/module)

+ nextTick
+ 弄清楚 配置win环境变量到底是在干什么
+ 阅读
    + https://zhuanlan.zhihu.com/p/25407758
    + https://juejin.im/post/58cf180b0ce4630057d6727c
+ yarn global dir
    + 任我如何修改基本都雷打不动不知道如何解决

+ connect 
+ 这个recycleBin是不是在model里声明就可以用
~~~
@connect(({ recycleBin, loading }) => {
  return {
    ...recycleBin,
    loading: loading.effects['recycleBin/getRecycleBinList'],
  };
})
~~~
       