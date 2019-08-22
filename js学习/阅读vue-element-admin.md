## 实现侧边栏与路由的结合
### 布局
+ 通过一个layout组件实现

### vue router的实现
1. vueRouter全局钩子函数 用于跳转页面时的管理
    ~~~
    router.beforeEach((to,from,next)=>{

    })
    ~~~
2. 异步加载组件 路由懒加载
    ~~~
    const Foo = resolve => require(['./Foo.vue'], resolve)
    //或者
    const Foo = () => import('./Foo');

    ~~~
3. 多层路由嵌套
    + 在一个 **router-view** 中再嵌套一个 **router-view** ，并在对应的第一个route.js中增加children，children的对象会被加载到嵌套的 router-view中
4. 动态加载路由
    ~~~
    this.$router.options.routes  //对应的router.js中所有页面项
    ~~~
 