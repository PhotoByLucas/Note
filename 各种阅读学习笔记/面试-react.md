1. [虚拟 DOM](https://github.com/Advanced-Interview-Question/front-end-interview/blob/master/docs/guide/virtualDom.md)

   1. 为什么要虚拟 DOM

      - 尽可能少地操作 DOM，减少回流重绘
      - Virtual DOM 最初的目的,就是更好的跨平台,比如 Node.js 就没有 DOM,如果想实现**SSR**,那么一个方式就是借助 Virtual DOM,因为 Virtual DOM 本身是 JavaScript 对象.

   2. 过程

      1. 虚拟 DOM 本质上是 JavaScript 对象,是对真实 DOM 的抽象
      2. 状态变更时，记录新树和旧树的差异(diff 算法)
      3. 最后把差异更新到真正的 dom 中

   3. diff 算法

2. redux

   - 流程：

     1. 组件向 store dispatch 一个带有 type 和 payload 的 action
     2. store 接受到后执行，后进行 callback

   - 连接方式
     1. mapStateToProps:将 redux 的 state 注入为组件的 prop
     2. mapDispatchToProps

3. hook
4. shouldComponentUpdate 能够写出更优化的 dom diff 算法，可以极大的提高性能，重写 shouldComponentUpdate 来避免不必要的 dom 操作
5. [生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

   componentWillMount 在渲染前调用。
   componentDidMount 在第一次渲染后调用。
   componentWillReceiveProps 在组件接收到一个新的props时被调用。这个方法在第一次渲染时不会被调用。
   shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或state时被调用。在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时使用。
   componentWillUpdate 在组件接收到新的props或state，但还没有render时被调用。在初始化时不会被调用。
   componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
   componentWillUnmount 在组件从DOM中移除的时候立刻被调用。

   mouting

   - render 阶段，可被打断重启
     1. componentWillMount
     2. componentWillUpdate
     3. shouldComponentUpdate
   - commit 阶段，不能被打断
     1. componentDidMount
     2. componentDidUpdate
     3. componentWillUnmount

6. 高阶组件是参数为组件，返回值为新组件的函数。
7. [react fiber 算法](https://segmentfault.com/a/1190000018250127)

   解决主线程长时间被 JS 运算占用这一问题的基本思路，**是将运算切割为多个步骤，分批完成**。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

   - 旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。
   - Fiber 实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的`requestIdleCallback`这一 API。

   解决方法

   React 框架内部的运作可以分为 3 层：

   - Virtual DOM 层，描述页面长什么样。
   - Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
   - Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。

   区别

   - Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑：
   - Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行：

   为了达到这种效果，就需要有一个调度器 (Scheduler) 来进行任务分配。优先级高的任务（如键盘输入）可以打断优先级低的任务（如 Diff）的执行，从而更快的生效。任务的优先级有六种：

   - synchronous，与之前的 Stack Reconciler 操作一样，同步执行
   - task，在 next tick 之前执行
   - animation，下一帧之前执行
   - high，在不久的将来立即执行
   - low，稍微延迟执行也没关系
   - offscreen，下一次 render 时或 scroll 时才执行

   Fiber Reconciler 在执行过程中，会分为 2 个阶段。

   - 阶段一，**生成 Fiber 树**，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
   - 阶段二，**将需要更新的节点一次过批量更新**，这个过程不能被打断。

   fiber 树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。
   ~~~
   const fiber = {
      stateNode,    // 节点实例
      child,        // 子节点
      sibling,      // 兄弟节点
      return,       // 父节点
   }
   ~~~
   Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。**这颗新树每生成一个新的节点，都会将控制权交回给主线程**，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程；如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

   从Stack Reconciler到Fiber Reconciler，源码层面其实就是干了一件**递归改循环**的事情
   
8. react hook 的理解
