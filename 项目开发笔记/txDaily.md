2020.5.14

- 阅读 antool 组件库项目代码
- 阅读智能客服项目代码
- 阅读腾讯云官网控制台代码
- 阅读组件库 teajs 代码

  技术记录

  1.  tools 的 props 中是一个包含了<>中的两种 type 的组件
      ```
      Tools: React.FC<ToolsProps & WithContextProps> =
      ```
  2.  socket 通信
      tim-js-sdk
  3.  useRef 创建 ref 以供使用
      ```
      function App() {
      const h1Ref = useRef();
      useEffect(() => {
         console.log('useRef')
         console.log(h1Ref.current)
      }, [])
      return <h1 ref={h1Ref}>Hello World!</h1>
      }
      ```
  4.  useCallback 和 useMemo

      callback：依赖不变时，引用不变
      memo：以来不变时，值不变

  5.  [Context](https://zh-hans.reactjs.org/docs/context.html)

      Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法，Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据。

      - 创建

      ```
      const MyContext = React.createContext(defaultValue);
      ```

      - Context.provider

      ```
      <MyContext.Provider value={/* 某个值 */}>
      ```

      每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。

      多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

      - consumer

        这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。

      ```
      <MyContext.Consumer>
      {value => /* 基于 context 值进行渲染*/}
      </MyContext.Consumer>
      ```

      **疑问 不是用 redux 也可以做吗**

  6.  目录结构

      - index -> app
      - app

  7.  useContext 包装 context

            useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

_2020.5.15_

- 完成了富文本框的支持图片复制粘贴功能，暂不支持图片插入功能
- 熟悉 typescipt 的写法
- 完成了 antool 组件中富文本编辑器从 vue 代码到 react 代码的部分转换，并加入 typescipt

  技术记录

  9.  ts 属性后感叹号表示非 null 和非 undefined 断言
  10. react 富文本输入框(支持图片及按钮编辑)

      - window.getSelection() 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。

      - handlepaste 应该用什么事件类型
      - 无法直接使用对象类型进行映射，解决方法定义接口

        `interface mapType { [key: string]: any; [index: number]: any; }`

        `const myMap : mapType = { // ...一个对象 }`


      - 对于useRef的接口规定是直接作用与useRef.current上的**todo**

_2020.5.18_

基本把富文本框功能完成，剩余部分函数待上线后进行调试，已经打 todo

今天在项目中学到的知识总结如下

- 对于函数式组件使用 ref 应该用 useImperativeHandle

* antool 项目中通过 iframe 和 form 的 target 配合提高兼容性

* input 标签 name 属性用于对提交到服务器后的表单数据进行标识，或者在客户端通过 JavaScript 引用表单数据。只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。并通过 ifame 的 callback 对后续请求进行处理

* 对于函数式组件使用 ref 应该用 useImperativeHandle

* useRef 创建 ref 以供使用

  对于 useRef 的范式是针对 useRef.current 进行规定的，无需再惊醒声明

  ```
     function App() {
     const h1Ref = useRef();
     useEffect(() => {
        console.log('useRef')
        console.log(h1Ref.current)
     }, [])
     return <h1 ref={h1Ref}>Hello World!</h1>
     }
  ```

_2020.5.19_

完成富文本框插入图片、粘贴图片功能，对该功能实现逻辑进行简单梳理如下

1. 将 div 声明为 contentEditable={true}，并绑定粘贴事件 onPaste={handlePaste}

2. handlePaste

   1. e.clipboardData 获取复制版中的数据
   2. 对浏览器版本进行判断，并相应的做出一些调整
   3. 对文字和图片分开进行逻辑处理，然后调用 insertNodes 将元素作为 html 节点插入

3. insertNodes

   1. 获取 window.selection

      Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。

   2. 通过 selection.selectAllChildren(\$content)和 ref 在 mouted 中获取到文本中的所有内容用于设置 range

      Range 接口表示一个包含节点与文本节点的一部分的文档片段。

   3. 调用插入节点

   调试过程中 insert 部分会出现重复复制情况，但经 debug 后莫名其妙的消失且无法再复现

开始实现智能助理弹出框功能，已经完成外部弹出框框架封装，组件细化进行中

_知识点总结_

- debugger 的简单调试使用：简化调试过程不用 console.log

  1. 在程序断点处打上 debugger
  2. 点击 source 其中分为三栏
     - watch: 动态计算的表达式的值
     - call stack 所有函数 点击可以查看函数参数及各种变量值
     - scope 作用域链中的各种变量

- ts 中 string 和 String 不同的原因
  ```
  '123' === new String('123') // false
  typeof new String('123') // Object
  ```
  ts 中 String Boolean 都是一个包装类型的对象，跟基础的数据类型区别
- as 关键字 可以起到欺骗 ts 编译器的功能但容易报错
  ```
  (window as any).foo = 1;
  ```
- props.children

  ```
  const DialogContainer :React.FC<DialogContainerProps>= ({children})=>{
      return (
              <div>
                  {children}
              </div>
          )
      }

  export default DialogContainer

  // 使用时 ddddd即为children
  <DialogContainer >ddddd</DialogContainer>
  ```

# _2020.5.20_

今天基本完成智能客服问题分类弹出框的交互功能，正在对接接口中，熟悉了 mobx 的大概使用逻辑，更多接口的研究还有待详细阅读文档

7.  mobx 使用记录

    - observable 相关

      ```
      observable(value)
      @observable classProperty = value
      ```

      - @observer 函数/装饰器可以用来将 React 组件转变成响应式组件。它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。

      使用 @observer 装饰器是可选的，它和 observer(class Timer ... { }) 达到的效果是一样的。

    - 对 observable 进行响应

      - @computed

        ```
        @observable price = 0;
        @observable amount = 1;

        @computed get total() {
            return this.price * this.amount;
        }
        ```

      - 计算值的 setter

    - 改变 observable

      - 使用@action 更改被观察者
      - @inject 使被装饰的组件以 props 的形式获取到 Provider 传递过来的数据。

8.  全局使用 mobx 步骤逻辑

    通过声明不同种类的 store 进行数据管理，然后用自定义 hook 将其挂在到全局的上下文中，并注入到组件中就可进行使用，整体逻辑和 vuex 比较相似，但是没有 vuex 的双向绑定，保留了 react 的单向数据流风格，且与 ts 结合更加方便。

9.  预渲染 config-overrides.js 文件配置插件**todo**

10. typescipt | 和 & 操作符号 对于 TC 例子理解勘误

    ```
    1001 | 1010 = 1011    // 合并1
    1001 & 1010 = 1000    // 只保留共有1
    ```

    ```
    interface IA {
      a: string
      b: number
    }

    type TB = {
      b: number
      c: number[]
    }

    type TC = IA | TB;    // TC类型的变量的键为ab或bc
    type TD = IA & TB;    // TD类型的变量的键必需包含abc
    ```

# _2020.5.21_

今天完成了两个对话框的业务，主要是对前几天总结的知识进行了实践

- mobx 根据 @observable 响应视图与 hook 的结合

  ```
  // store/tickets.ts
  @observable show: boolean = false;

  // first-step-dialog.tsx
  const { ticket } = useStores();

  const { PopularCell } = useObserver(() => ({
    PopularCell: ticket.getPopularCell,
  }));
  ```

# _2020.5.22_

今天主要就昨天提交的代码进行了修改和完善，修改了部分设计上不够合理的地方，通过降低组件的耦合度可以有效的提高组件的可复用性。修正了富文本框粘贴功能和工单分类弹框的部分 bug，将服务评价组件基本完成，剩下接口部分的对接。

1. 在 react 中使用 htmlFor 代替原生标签中的 for 属性
2. 将 label 组件和 input 通过 for 和 id 属性关联
   ```
   <label for="male">Male</label>
   <input type="radio" name="sex" id="male" />
   ```
3. 疑问：如何解决好服务评价的开关问题，过于耦合

# _2020.5.25_

今天完成了服务状态接口的对接，进行服务记录模块

1. 解决 23 日疑问 3，解决空间耦合问题(改为 model 控件)

   减少组件层次以及不合理的设计，将第一二个弹框重复部分使用条件渲染，抽离重复的控制设置展示开关属性到 container，通过 store 进行控制，将整体的组件机构扁平化

# _2020.5.26_

今天完成服务状态和历史消息的接口基本对接，剩下部分问题待处理

1. 滚动下拉功能

   - onScroll 监听滚动事件
   - scrollTop 滚动长度 可以获取或设置一个元素的内容垂直滚动的像素数。

     元素未滚动时，scrollTop 的值为 0，如果元素被垂直滚动了，scrollTop 的值大于 0，且表示元素上方不可见内容的像素宽度

   - clientHeight 只读值

     clientHeight = CSS height + CSS padding - **水平**滚动条高度 (如果存在)

   - scrollHeight 只读属性 是一个元素内容高度的度量

     值等于该元素在**不使用滚动条的情况下为了适应视口中所用内容所需的最小高度**。

2. mobx 对于引用对象的监听应该返回一个全新的对象给监听值，否则无法刷新视图，如使用解构对象或数组

3. [overflow 属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)

   默认为 visable，通过声明为 auto 或者 scroll 显示滚动条

4. 滚动窗中不超出滚动框大小的时候如何监听

5. 项目结构整理

   1. 最外层的 provider 结合 store，提供 store 中的对象**todo 使用方式** useStore
   2. smartyProvider 中包含 **todo**
      - ChatContainer 左侧对话框
      - ToolsContainer 右侧工具栏
   3. ToolsContainer(杂七杂八主要是 UI)
      - Tools 工具图标
      - Entrance 工单外链
      - Support
      - Banner
   4. ChatContainer InputWrapper
      - 各种弹框
      - 输入框
        - Hot tag
        - Editor
      - QA 对话框

# _2020.5.27_

今天完善了服务记录的功能，对接了全部部已经可以开始联调的接口，并对之前的 bug 进行了修复。

1. 配置 host

   用户在浏览器中输入一个需要登录的网址时，系统会首先自动从 Hosts 文件中寻找对应的 IP 地址，找到后，打开对应网页；如果没有找到，则系统再会将网址提交 DNS 域名解析服务器进行 IP 地址的解析

   作用：

   1. 加快域名解析
   2. 局域网中构建映射关系
   3. 屏蔽垃圾网站 : 利用 hosts 文件把垃圾网站的域名映射到一个错误的 IP 或本地计算机的 IP 地址上，实现禁止访问

2. 26 日修复文件上传 bug

   bug：在通过 `<input type='file' ref={inputRef}>` 实现一次文件上传后，再次调用时无法再上传

   原因：在前一次上传后，应该将 input 文件值清除 `inputRef.current.value=''`

3. sdk ready 状态
4. tim 处理逻辑 云函数

   1. 先注册一个 appid 作为 SDKAppID
      ```
      let options = {
        SDKAppID: 0 // 接入时需要将0替换为您的云通信应用的 SDKAppID
      };
      let tim = TIM.create(options); // SDK 实例通常用 tim 表示
      ```
   2. 开启后根据不同的状态，调用接口进行使用

handlepaste 中增加 contentDivRef.current!.innerHTML

# _2020.5.28_

今天主要在进行富文本框部分 bug 的修复，完善了服务评价的部分功能，并对之前的代码结构进行优化

1. Iaas Paas Saas 理解结合 cos 和 im 的理解

   cos 和 im 都是封装好的服务，在使用这些功能的时候，直接调用快速搭建功能，省心省力，应该是属于 Paas。

   - SaaS 是软件的开发、管理、部署都交给第三方，不需要关心技术问题，可以拿来即用。

   - PaaS 提供软件部署平台（runtime），抽象掉了硬件和操作系统细节，可以无缝地扩展（scaling）。开发者只需要关注自己的业务逻辑，不需要关注底层。

   - IaaS 是云服务的最底层，主要提供一些基础资源。IaaS 模式下则是云服务商提供（虚拟的）硬件，从操作系统开始都可以自己选择和定制。

# _2020.5.29_

今天主要解决了富文本框图片粘贴上传的 bug，对富文本框功能实现再次梳理

1. 将 div 声明为 contentEditable={true}，并绑定粘贴事件 onPaste={handlePaste}

2. handlePaste

   1. e.clipboardData 获取复制版中的数据
   2. 对浏览器版本进行判断，并相应的做出一些调整
   3. 对文字和图片分开进行逻辑处理，然后调用 insertNodes 将元素作为 html 节点插入

3. insertNodes

   1. 获取 window.selection

      Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。

   2. 通过 selection.selectAllChildren(\$content)和 ref 在 mouted 中获取到文本中的所有内容用于设置 range

      Range 接口表示一个包含节点与文本节点的一部分的文档片段。

   3. 调用插入节点

4. 对于点击上传图片和粘贴上传图片的不同处理


    - 点击上传：在点击的时候，调用回调事件将图片上传到cos
    - 粘贴上传：通过handlePaste后，监听DomInsert事件，通过回调及格式转换获取到文件，上传cos

5. 通过 ref 获取到输入框 innerHTML 的内容，submit

其他内容

- `window.atob` 和 `window.btoa`

  ```
  let encodedData = window.btoa("Hello, world"); // 编码
  let decodedData = window.atob(encodedData);    // 解码
  ```

# _2020.6.1_

今天对上周的部分代码进行了 code review，修复了部分格式、bug，优化了代码

1. 富文本框按下发送后的逻辑

   1. input-containter/index.tsx 中 handleSend()中调用 addQa
   2. `smarty.addQa()`

      根据 imConnect,isRequesting,answerType 等状态获取到返回结果，刷新 smarty.qas

   3. qas/index.tsx 中将 Qa 的所有数据丢进去 进行条件渲染

阅读了 node 中间层 ssr 的代码，理解了结果项目设计为：前端 SPA+node 中间层做请求转发以及服务端渲染代码处理

2. m-qcloud-smarty

   1. app.use() 将所有中间件串联起来
   2. 中间件栈：中间件 next 前的，然后通过 next 将执行权交给下一个中间件，执行结束后交回给上一层的中间件再执行 next 后的

      1. bodyParser
      2. logger
      3. format 做错误处理，如果 next()出错的话，就返回默认模板
      4. routerIndex 根据 model 对路由分发集成

         ```
         import Router from 'koa-router'

         const smartyRouter = new Router()

         app.use(ticketRouter.routes())
         app.use(smartyRouter.routes())

         // routes/ticket.js
         const ticketRouter = new Router()
         ticketRouter.get('get/url',ticketController.fn)

         // routes/smarty.js
         const smartyRouter = new Router()
         smartyRouter.get('get/url',smartyController.fn)
         ```

      5. 在 controller 中做一层接口 try catch
      6. 最后一步 render 异步？

# _2020.6.2_

今天对接了服务记录的历史对话状态，在处理上拉刷新状态上遇到了问题，

**问题：上拉刷新载入新的消息后，对话框滚动条滚动问题**

本来是通过计算插入新的节点后，监听 scrollheight 属性的差值然后设置滚动条 scrolltop，但是因为 img 标签延迟加载的，会导致滚动条滚动不到位，待解决；本以为是 diff 刷新了 dom 后重置了滚动条为最上，但是设置了 usememo 后也没有作用，好像 84

1. useCallback useMemo

   1. class 时期，react 的性能优化点在于

      - 调用 setState，就会触发组件的重新渲染，无论前后的 state 是否不同
      - 父组件更新，子组件也会自动的更新

   2. 在函数组件中，react 不再区分 mount 和 update 两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑

   3. useMemo 使用 反例

      每次无论是 val 或是 count 重新调用，整个都会执行 expensive，但是其实只依赖于 count

      ```
      export default function WithoutMemo() {
         const [count, setCount] = useState(1);
         const [val, setValue] = useState('');

         function expensive() {
            console.log('compute');
            let sum = 0;
            for (let i = 0; i < count * 100; i++) {
                  sum += i;
            }
            return sum;
         }

         return <div>
            <h4>{count}-{val}-{expensive()}</h4>
            <div>
                  <button onClick={() => setCount(count + 1)}>+c1</button>
                  <input value={val} onChange={event => setValue(event.target.value)}/>
            </div>
         </div>;
      }
      ```

      应该改为

      ```
      useMemo(function expensive() {
         console.log('compute');
         let sum = 0;
         for (let i = 0; i < count * 100; i++) {
               sum += i;
         }
         return sum;
      },[count])
      ```

2. export React.memo(mycomponents) 相当于声明了一个 pure component

# _2020.6.3_

今天主要完成了服务记录的对话内容接入，完成了加载消息的功能，对接了服务分类搜索框的模糊搜索对接，感觉 store/ticket 的业务有些太多了，有空应该进行 code review 下拆分开

1. 今日犯蠢记录：为什莫会这种情况下不会正确执行防抖

   ```
   const debounce = function (func = () => {}, wait = 50) {
   var timer;
   return function () {
      if (timer) {
         console.log('clear')
         clearTimeout(timer);
      }
      var self = this;
      var args = arguments;
      timer = setTimeout(() => {
         func.apply(self, args); // 将变量对象和this指定
      }, wait);
   };
   };

   // 正确用法
   // const a = debounce(() => {
   //   console.log("a");
   // }, 1000);
   // a(); a(); a(); a();

   debounce(() => { console.log("a")}, 1000)()
   debounce(() => { console.log("a")}, 1000)()
   debounce(() => { console.log("a")}, 1000)()
   debounce(() => { console.log("a")}, 1000)()
   ```

   每次立即执行，都会创建四次 debounce，创建了四个独立的 timer，自然就无法清除计时器

# _2020.6.4_

今天主要处理了产品提出的缺陷，修复了服务分类匹配搜索，服务记录时间戳问题，服务评价状态清除等功能

1. 时间戳转换问题，时间戳分为秒和毫秒两个级别，new Date() 处理的是毫米级的，应乘/除 1000

# _2020.6.5_

1. 待重构：感觉 onAutoSend 方法其实可以放到 smarty 中去，横跨了四个层级的方法都用到了
2. 修复了服务分类选择后的 bug

# _2020.6.8_

1. react 官网文档阅读

   - 代码懒加载

     ```
     // 普通
     import OtherComponent from './OtherComponent';

     // 懒加载 此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包
     const OtherComponent = React.lazy(() => import('./OtherComponent'));
     ```

   - context 跨层级向上调用状态
   - Dom 元素索引：react 为了避免和 js 冲突，将很多原生属性进行封装

2. 智能助理项目总结：ing

# _2020.6.9_

今天写了两篇 km 的文章

http://km.oa.com/group/sopdev/articles/show/425806

http://km.oa.com/group/sopdev/articles/show/425863

1. useEffect,useCallback,useMemo 第二个参数的三种情况

   - 啥都不传：每一次渲染结束后，每次组件 render 都会调用，相当于`componentDidMount` 和 `componentDidUpdate`
   - []空数组：只执行一次，相当于 `componentDidMount` 和 `componentWillUnmount`
     - 回调函数会在第一次渲染结束后（`componentDidMount`）执行
     - 返回的函数会在组件卸载时（`componentWillUnmount`）执行。
   - 数组变量：变量变化时更新

2. 性能优化实例： `React.memo` `useCallback` `useMemo`

   react hook 性能优化方向：

   - 减少不需要的重复 render 的次数。
   - 减少重复计算，**对于函数式组件来说，每次 render 都会重新从头开始执行函数调用**。

   1. `React.memo` ：子组件 props 未改变时候，不重新渲染

      - 解决的问题：**父组件发生变化重新渲染，但传给子组件的 props 没有改变**，这种情况下的子组件其实是不需要重新渲染的，但是由于整个 FC 都会重新渲染，子组件也会被动的重新渲染

      - 用法： React.memo 包裹组件，第二个参数为手动通过 props 判断，类似`shouldComponentUpdate`
        ```
         export default React.memo(ChildComponent, (prevProps, newProps) : boolean => {
            // false为更新，true表示状态相同不用更新
         })
        ```

   2. `useCallback` ：依赖不发生改变时候，返回同一个函数方法的引用

      - 解决的问题：在用了 `React.memo` 后，如果通过父组件传给子组件一个方法（如果不通过第二个参数判断），仍然会产生子组件重新渲染

        ```
         // 父组件
         const Parent = () => {
            const fn = () => { //... }
            return (
               <>
                  <Child fromParentFn={fn} />
               </>
            )
         }
        ```

        每次重新渲染父组件，都会重新创建 fn 导致传给 Child 的组件 props 发生改变，重新渲染

        解决方法：

        ```
        const fn = useCallback(() => { //... }, [dep])
        ```

        在 dep 依赖没有产生改变时，返回的 fn 都是对同一个函数的引用，props 就不会改变

   3. `useMemo` ：缓存计算量巨大的函数，与 vue 中的 computed 相似，多了一个依赖控制

      ```
      function expensiveFn() {
         // 计算量很大的代码，
         return xxx
      }

      // 只有当dep发生变化时，才会重新计算该值
      const memoizedValue = useMemo(expensiveFn, [dep]);
      ```

# _2020.6.10_

今天终于看到了困扰已久的怎么部署智能客服，原来是通过手动 build 然后将静态文件复制粘贴到手动部署的平台（愣住，感觉部署相关的东西还有待详细了解学习

进行 ing：阅读《你所不知道的 JavaScript》

# _2020.6.11_

今天给富文本框发送增加了 loading，尝试通过 host 设置和 nginx 反向代理设置本地跨域的问题，了解了 nginx 的一些基本概念及功能，读完了《你所不知道的 JavaScript》第一部分闭包与作用域，待第二部分的 this 与原型对象读完后做做 km 分享。

# _2020.6.12_

今天主要解决了 bug 提单中的一些修复的问题，并对解决服务记录无消息状态提醒，增加了富文本框的文件格式及大小校验

1. 修复遮罩层后背景仍可以滚动问题

   解决方案：body 设置为 overflow:hidden

# _2020.6.15_

1.  阅读 ing [React 深入：从 Mixin 到 HOC 再到 Hook](https://juejin.im/post/5cad39b3f265da03502b1c0a)

    - mixin：可能相互依赖相互耦合，不同 mixin 的方法还可能会产生冲突，不利于代码维护，已被放弃（x

    - 高阶组件 HOC ：其实是一个函数，将要增强的组件作为参数传入，返回增强后的组件

      实现方式

      - 属性代理

        可操作 props,生命周期函数,ref,组件的 static 方法

        ```
        function proxyHOC(WrappedComponent) {
           return class extends Component {
              render() {
                 return <WrappedComponent {...this.props} />;
              }
           }
        }
        ```

      - 反向继承

        由于继承的为原组件，比继承 Component 多了可操作 state

        ```
        // 将返回值改为
        return class extends WrappedComponent {
           render() {
              return super.render();
           }
        }
        ```

      应用场景

      - 日志打点：直接在 HOC 的生命周期函数中增加

        ```
        function logHoc(WrappedComponent) {
           return class extends Component {
              componentWillMount() {
                 console.log('...')
              }
              render() {
                 return <WrappedComponent {...this.props} />
              }
           }
        }
        ```

      - 权限、可用控制：判断 props 中的对应属性

        ```
        render() {
           const { visable } = this.props
           if(visable){
              // ...
           }else{
              // ...
           }
        }
        ```

      - 双向绑定 todo
      - 表单校验 todo
      - redux 中的 connect

      缺陷：过多的 HOC 会导致多重嵌套，影响调试

    - hook

2.  修复智能客服项目的时间显示问题，husky 配置自动 lint 调试中，仍然存在问题
3.  尝试使用 nvm 对 node 版本进行管理，在安装后 node 一直无法自动安装 npm，遂手动安装了另一个 node 版本，使用另一个版本的 npm
4.  尝试了本地使用 fiddler 对 https 进行抓包，配置 autoResponse 后无法成功，在 option->Gateway 设置为 noProxy 后成功，对 fiddler 了解待深入

# _2020.6.16_

1. 开始阅读工单部分代码
2. 简单了解了 teajs 库的使用
3. 修复了智能客服的部分缺陷，其他细节待与产品对接
4. 浏览了下智能客服中存在的部分问题，待回顾
5. 引入了新的 lint 规则，开始修复 warning

# _2020.6.17_

1. 推荐一下 vscode 插件使得 vue 可以拥有 react 那样的变量函数模块跳转能力

   ```
   vscode-elm-jump 定义跳转
   vue-helper 补充属性
   path-alias 支持@绝对路径跳转
   file peek 定义路径跳转，需进行配置 https://www.jianshu.com/p/3aaba2757a2d
   ```

   但是 vuex 有一些暂时还不支持

2. 通过 vue 自定义指令进行数据埋点

   1. 自定义指令 `Vue.directive('treport', ReportDirective)`
   2. [文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
      ```
      ReportDirective = {
         // el: 绑定的元素，可以直接操作dom
         // binding: 绑定的相关的一个对象值
         bind(el,binding) {
            // 数据上报发请求
            el.addEventListener('click', ()=>{
               // ...
               // 绑定时传入值
               report(binding.value)
            })
         }
      }
      ```
   3. 使用
      ```
      <button v-treport="{ // ... }" />
      ```

3. 阅读 工单系统 代码

   todo 打包

   入口为 index.js，通过 AppInit 创建实例

   - index: 主要由 qcvue 组件组合成的表格
   - detail
   - check
   - category: 建立工单
     - 步骤一: 选择工单分类的列表
     - 步骤二: 选择工单问题的列表，选择后或创建工单，或根据选项做出响应
     - 步骤三：创建工单表单 根据条件渲染表单项
   - category/create
   - auth: 服务授权表格，与 index 相似
   - auth/detail
   - tools: 一堆外链

4. 智能客服 服务记录 需求跟进，缺陷修复

# _2020.6.18_

1. 模块化规范

   - 原始形态: 通过立即执行函数暴露模块且使得外部无法修改模块内部内容

     ```
     const module = (function() {
        let _money = 0
        const fun1(){}
        const fun2(){}
        return {
           f1:fun1,
           f2:fun2
        }
     })()
     ```

   - CommonJS: 主要为服务端 nodeJS

     - require
     - exports 和 module.exports

       当 exports 和 module.exports 都存在时，以后者为准

     - 每个模块都有独立的作用域

   - AMD requireJS : 依赖前置

     - 解决的问题
       1. 多个 js 文件中的依赖关系可能因为加载先后被影响
       2. js 加载时会使浏览器停止页面渲染
     - 语法

       ```
       // id 模块名字
       // dependencies：当前模块依赖的数组（可选）。
       // factory 一个需要进行实例化的函数或者一个对象。
       define(id, dependencies, factory)
       ```

       ```
       // 第一个参数 依赖数组
       // 第二个参数 依赖模块都加载完成后的执行的回调函数
       require([dependencies], function(){});
       ```

       ```
       // 定义模块
          define(['myModule'],() => {
          var name = 'Byron';
          function printName(){}
       return {
          printName:printName
          }
       })

       // 加载模块
       require(['myModule'],function(my){
          my.printName();
       })
       ```

   - CMD seajs : 依赖就近 按需加载

     ```
     define(function(require, exports, module) {
        // 通过 require 引入依赖
        var $ = require('jquery');
        var Spinning = require('./spinning');

        // 通过 exports 对外提供接口
        exports.doSomething = ...

        // 或者通过 module.exports 提供整个接口
        module.exports = ...
     });
     ```

2. 智能客服缺陷修改
3. 继续熟悉工单系统代码

# _2020.6.19_

1. 跟进智能客服需求
2. 阅读工单系统代码 ing

# _2020.6.22_

1. 工单系统 灰度测试进行中

   - 浮动智能客服入口 mixin/smarty/template 建立新的全局 mixin
   - 条件判断链接跳转

2. 修复 会话记录下拉错误

3. 跟进智能客服设计重构对接

4. 智能客服文件类型报错全局提示，思考 应该如何封装一个像 antd 那样的全局提示

# _2020.6.23_

1. 跟进智能客服 bug 和反馈
2. 工单系统灰度进行 ing

# _2020.6.24_

1. 跟进智能客服 bug 和反馈
2. 完成工单系统灰度，已提 pr

# _2020.6.28_

1. 跟进智能客服 bug 和反馈
2. 防抖与节流实际应用中区别

   - 防抖：短时间多次合一执行
   - 节流：连续触发时，一定时间内只执行一次

3. 阅读 你不知道的 JavaScript

# _2020.6.29_

1. 跟进智能客服 bug
2. 修改工单系统灰度上线策略
3. 阅读 你不知道的 JavaScript

# _2020.7.1_

1. [hook 的正确使用姿势](https://mp.weixin.qq.com/s/l5axhu1D3CwUxpPVO9oo5w)

   一直以来都把 hook 当成类组件用了，hook 是用来抽离公共逻辑的，不是简单只用来类组件的生命周期中。hook 应该是可以融入到 hook 组件的生命周期上的。

   举个栗子：智能客服中的 useStore，将所有 store 实例通过 context 挂载后，暴露出实例以供使用，这就是一个 hook 的案例

2. 跟进智能客服修改
3. 跟进工单系统修改
4. 阅读腾讯云小程序代码

# _2020.7.2_

阅读 智能客服坐席侧 socket 通信搭建 代码

- [坐席侧](https://git.code.oa.com/andon-fe/cloud-service-im)

  > src/modules/plugins/antool-socket.js

  坐席侧为智能客服的客服侧，通过 npm 包引入 socketSDK，创建 socket 实例并挂载在 vue 全局对象上

- [坐席测引入的 socketSDK](https://git.code.oa.com/antool/antool-socket-sdk)

  基于[socket.io-client](https://www.w3cschool.cn/socket/socket-k49j2eia.html)创建的一个实例

- [socket 服务端](https://git.code.oa.com/antool/antool-realtime-server)

  接受外部服务器推送的消息，并通过 socket 推送给坐席侧

# _2020.7.3_

1. 阅读 [docker + webhook 从零实现前端自动化部署](https://juejin.im/post/5ef4c7eff265da230b52dfc5?utm_source=gold_browser_extension)
2. 申请了 cvm，搭环境，在上面跑了下 docker + wehook 自动化部署
3. antool 推送消息工具环境搭建 ing

# _2020.7.6_

1. 腾讯云小程序 阅读

   - more-info 中渲染帮助与服务 view
   - 智能客服对应 ssr 渲染的页面
   - 工单系统

     根据有没有工单渲染 没有的话会进入创建工单流程

     - quick-guide 工单一级问题列表
     - category 工单二级问题列表
     - create 创建工单

2. 阅读 npm 知识
3. 阅读 v8 垃圾回收机制

# _2020.7.7_

1. 阅读 [build your own react](https://pomb.us/build-your-own-react/)

2. 阅读 tea 组件库

   1. 布局 layout

      ```
      const { Header, Body, Footer, Sider, Content } = Layout;
      ```

      - content 一般放在 body 中，拥有 header body footer 三部分
      - sider 放 menu 作为一个侧边栏路由

   2. 表单状态管理 需结合社区第三方库 react-final-form-hooks

3. 阅读工单系统代码
4. 跟进智能客服需求

# _2020.7.8_

1. 阅读智能客服移动端 ssr
2. 阅读 next 文档
3. 跟进智能客服需求

# _2020.7.9_

1. 智能客服消息提醒进行中
2. 智能客服沉默后会话逻辑进行中

# _2020.7.10_

# _2020.7.13_

1. 阅读 next 文档
2. 对接智能客服需求完成
3. 对接工单系统灰度策略修改

# _2020.7.14_

1. 跟进智能客服需求测试反馈
2. 工单入口视觉效果突出引流需求进行 ing

# _2020.7.15_

1. 跟进智能客服需求测试反馈
2. 工单入口视觉效果突出引流需求完成
3. 修复工单 from 参数

# _2020.7.16_

1. 智能客服用户侧 build 命令

   > 参考 https://juejin.im/post/5b99c9ece51d450e51625630

   1. 通过安装 react-app-rewired ，对 react script 进行扩展

      `npm run build: react-app-rewired build`

      在项目根目录下创建 config-overrides.js 文件，加入预渲染插件

   2. prerender-spa-plugin

      > Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。

      prerender-spa-plugin 原理是在 Webpack 构建阶段的最后，在本地启动一个 Puppeteer 的服务，访问配置了预渲染的路由，然后将 Puppeteer 中渲染的页面输出到 HTML 文件中，并建立路由对应的目录。

   3. 安装 chrome

      在 node_module/puppeteer/package.json 中找到依赖的 chrome 版本

      ```
      "puppeteer": {
         "chromium_revision": "686378" // 版本号
      },
      ```

      [按照版本下载对应的 chrome](https://npm.taobao.org/mirrors/chromium-browser-snapshots/)，解压到路径

   4. 指定 chrome 依赖路径

      `lib/chrome/index.js`中根据环境修改 linux 或 window 路径，为刚刚解压出的 chrome.exe 的路径，如

      ```
      Windows_NT: 'C:/Users/lucaskslu/Desktop/chrome-win/chrome.exe',
      ```

   5. run 他

# _2020.7.17_

1. 跟进工单管理测试反馈
2. 阅读 next 文档
3. 完善智能客服文档，更新 km

4. 预渲染 vs SSR

   - 预渲染：在 build 时候，就生成了 dom 节点，发布后一样是静态文件，但如果路由、页面比较多的时候，由于需要通过工具爬取整个页面，build 过程会比较长

   - SSR：只针对特定页面，渲染的组件，主要的是可以不用等到 js 完全加载完就可以发起请求

# _2020.7.20_

1. 跟进工单测试反馈完成需求
2. 智能客服排队优化 ing

# _2020.7.21_

1. 完成智能客服排队优化需求
2. 工单反馈跟进

# _2020.7.22_

1. 跟进智能客服排队优化
2. 阅读 next 文档

# _2020.7.23_

1. 跟进智能客服测试，code review 做了小优化
2. 跟重庆的小伙伴们开了第一次组会，更完整的了解了中心的主要责任，梳理了现在进行项目中的一些问题
3. 阅读 next 文档

# _2020.7.24_

1. 阅读你不知道的 js
2. 对昨天组会的提到的 node 接入层做法查阅了 km，发现 [ngw](http://ngw.oa.com/) 可能会适合我们用
3. 了解了下 ssr 和 serverless 的结合（直接部署云函数）
4. 跟进智能客服测试

# _2020.7.27_

1. 跟进智能客服需求
2. 查询日志修复上传图片 cos 过滤错误
3. 了解了下 ssr 和 serverless 的结合（直接部署云函数）

# _2020.7.28_

1. 完成智能客服排队优化提测
2. 智能客服 code review
3. 开始 工单系统代码重构项目搭建

# _2020.7.29_

1. 智能客服 分类选择过滤优化
2. 智能客服 文档完善
3. 工单系统代码重构

# _2020.7.30_

1. 智能客服发版
2. 智能客服 taglist报错 bug修复
3. 了解 BPMN 2.0 及其使用场景

# _2020.7.31_

1. 智能客服富文本框逻辑梳理
2. 智能客服code review

# _2020.8.3_

1. 智能客服富文本编辑器code review
2. 富文本编辑器总结

# _2020.8.4_

智能客服 支持客户在会话交互过程进行评价和反馈 需求 进行ing

- todo
   - 坐席与客户交互3次和6次后，评价入口出现动画效果和气泡文案
   - 客户评价后，推送评价系统消息给客户和坐席
   - 支持客户再次评价：
   - 刷新后拉取状态：是否已经接入评论、评论内容
   - 评价新增字段
   - 数据上报

# _2020.8.5_

1. 为啥不能直接设置host代理官网的(待解决)
2. 智能客服 支持客户在会话交互过程进行评价和反馈 需求 进行ing

# _2020.8.6_

2. 评价接口设计重构
3. 了解学习研发流程及规范


# _2020.8.7_
1. 智能客服 支持客户在会话交互过程进行评价和反馈 需求联调
2. 实习内容总结汇报

# _2020.8.10_

1. 智能客服 支持客户在会话交互过程进行评价和反馈 需求联调
2. 实习内容总结汇报
3. 中心年中会议

# _2020.8.11_

1. 智能客服 支持客户在会话交互过程进行评价和反馈 需求联调
2. 实习内容总结汇报

# _2020.8.12_

1. 智能客服 对话优化 需求联调
1. 智能客服 支持客户在会话交互过程进行评价和反馈 需求联调
3. 工单系统 配额工具

# _2020.8.13_

1. 智能客服 对话优化 需求联调
1. 智能客服 支持客户在会话交互过程进行评价和反馈 需求联调

# _2020.8.14_

1. 智能客服 对话优化 需求联调
1. 排期会 安小白了解

# _2020.8.17_

1. 智能客服 对话优化 需求联调
2. 支持客户在会话交互过程进行评价和反馈 需求联调

# _2020.8.20_

1. 在线客服评价功能
1. 在线客服头像功能

# _2020.8.21_

1. 在线客服评价联调
1. 在线客服头像对接

# _2020.8.24_

   在线客服评价联调ing

# _2020.8.26_

1. epc了解
2. 在线客服评价修复
2. 在线客服联调

