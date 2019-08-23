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
5. path.resolve()  
    用于凭借绝对路径，从后向前，
    + 若字符以 **/ 开头**，不会拼接到前面的路径；
    + 若以 **../ 开头**，拼接前面的路径，且不含最后一节路径；
    + 若以 **./ 开头** 或者 **没有符号** 则拼接前面路径；
    ~~~
    path.resolve('/foo/bar', './baz');
    // 返回: '/foo/bar/baz'

    path.resolve('/foo/bar', '/tmp/file/');
    // 返回: '/tmp/file'

    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    // 如果当前工作目录为 /home/myself/node，
    // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
    ~~~
6. 嵌套路由的实现 在sidebar中使用**递归**
7. mapState语法糖
    ~~~
    import { mapState } from 'vuex'

    computed: {
        ...mapState(['route','common'])
    },
    ~~~
    等同于
    ~~~
    computed: {
        route(){
            return this.$store.state.route
        },
        common(){
            return this.$store.state.common
        }
    },
    ~~~