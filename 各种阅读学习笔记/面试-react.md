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
