1. [虚拟 DOM](https://github.com/Advanced-Interview-Question/front-end-interview/blob/master/docs/guide/virtualDom.md)

   1. 为什么要虚拟 DOM

      - 尽可能少地操作 DOM，减少回流重绘
      - Virtual DOM 最初的目的,就是更好的跨平台,比如 Node.js 就没有 DOM,如果想实现**SSR**,那么一个方式就是借助 Virtual DOM,因为 Virtual DOM 本身是 JavaScript 对象.

   2. 过程

      1. 虚拟 DOM 本质上是 JavaScript 对象,是对真实 DOM 的抽象
      2. 状态变更时，记录新树和旧树的差异(diff 算法)
      3. 最后把差异更新到真正的 dom 中

   3. diff算法

2. redux

   - 流程：

     1. 组件向 store dispatch 一个带有 type 和 payload 的 action
     2. store 接受到后执行，后进行 callback

   - 连接方式
     1. mapStateToProps:将 redux 的 state 注入为组件的 prop
     2. mapDispatchToProps

3. hook
4. shouldComponentUpdate 能够写出更优化的dom diff算法，可以极大的提高性能，重写shouldComponentUpdate来避免不必要的dom操作
5. [生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
   - render阶段，可被打断重启  
      1. componentWillMount
      2. componentWillUpdate
      3. shouldComponentUpdate
   - commit阶段，不能被打断
      1. componentDidMount
      2. componentDidUpdate
      3. componentWillUnmount

6. 高阶组件是参数为组件，返回值为新组件的函数。
7. react fiber 算法

   解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

   解决方法

   