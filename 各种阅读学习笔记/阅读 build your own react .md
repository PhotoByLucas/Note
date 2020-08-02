[如何建立一个自己的 react](https://pomb.us/build-your-own-react/)

1. createElement()

   像 JSX 中的元素

   ```
   const element = (
      <div id="foo">
        <a>bar</a>
        <b />
      </div>
    )
    ```
   最后都会被转换为一个对象节点，具有以下的属性
   ~~~
   const element = myReact.createElement(
     type:'div',
     {id:'foo'},
     myReact.createElement(type:'a',{},'bar'),
     myReact.createElement(type:'b')
   )
   ~~~
   从而可以的得出函数
   ~~~
   function createElement(type, props, ...children) {
     return {
       type,
       props:{
         ...props,
         children: children.map(child => (
           typeof child === 'object'
           ? createElement(child)
           : createTextElement(child)
         ))
       }
     }
   }
   ~~~

2. render 功能 ：将对象节点转化为dom节点

    ~~~
    myReact.render(element, container) {

      // 判断节点类型
      const dom = element.type === 'text'
      ? document.createTextNode()
      : document.createElement(element.type)

      // 加上非子节点的属性
      Object.keys(element.props).filter(
        key => key !=='children'
      ).forEach(name => {
        dom[name] = element.props[name]
      })

      // 子节点递归渲染
      element.props.children.forEach(child => {
        render(child, dom)
      })
    }
    ~~~

  3. 并发模式

     递归调用渲染的话，一旦我们开始渲染就不会停止，可能会阻塞主线程太长时间，导致无法处理优先级更高的事件（输入等）

     因此将工作分为多个小单元，在完成每个单元后，可以随时暂停，再通过回调重新运行
     ~~~
     function workLoop(deadline) {
        let shouldYield = false
        while (nextUnitOfWork && !shouldYield) {
          // 执行一个工作单元
          nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
          )

          // 根据时间计算是否需要暂停
          shouldYield = deadline.timeRemaining() < 1
        }

        // 重新回调执行
        requestIdleCallback(workLoop)
      }
     ~~~

  4. 纤维树