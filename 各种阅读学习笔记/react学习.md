## redux

### 设计思想

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

### 概念

1.  store
    ```
    import { createStore } from 'redux';
    const store = createStore(fn);
    ```
2.  state

    ```
    import { createStore } from 'redux';
    const store = createStore(fn);

    const state = store.getState();
    ```

3.  Action

    ```
    const action = {
      type: 'ADD_TODO',
      payload: 'Learn Redux'

    };
    ```

4.  action creator

    ```
    const ADD_TODO = '添加 TODO';

        function addTodo(text) {
          return {
            type: ADD_TODO,
            text
          }
        }

        const action = addTodo('Learn Redux');
        ~~~

    > 可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

    ```

5.  dispatch

    ```
    import { createStore } from 'redux';
    const store = createStore(fn);

    store.dispatch({
      type: 'ADD_TODO',
      payload: 'Learn Redux'
    });

    // 或者
    store.dispatch(addTodo('Learn Redux'));
    ```

6.  reducer

    > Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

    ```
    const defaultState = 0;
    const reducer = (state = defaultState, action) => {
      switch (action.type) {
        case 'ADD':
          return state + action.payload;
        default:
          return state;
      }
    };

    const state = reducer(1, {
      type: 'ADD',
      payload: 2
    });
    ```

7.  纯函数  
    Reducer 函数里面不能改变 State，必须返回一个全新的对象
8.  store.subscribe()

    > Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

    ```
    // 只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

    store.subscribe(listener);
    ```


    // 解除监听
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );

    unsubscribe();
    ~~~

### react-redux

React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。

1. UI 组件
   - 只负责 UI 的呈现，不带有任何业务逻辑
   - 没有状态（即不使用 this.state 这个变量）
   - 所有数据都由参数（this.props）提供
   - 不使用任何 Redux 的 API
2. 容器组件
   - 负责管理数据和业务逻辑，不负责 UI 的呈现
   - 带有内部状态
   - 使用 Redux 的 API
3. connect() 用于从 UI 组件生成容器组件

   ```
   import { connect } from 'react-redux'

   const VisibleTodoList = connect(
     mapStateToProps,
     mapDispatchToProps
   )(TodoList)
   ```

4. mapStateToProps()
5. mapDispatchToProps()

## dvaJS

1. 核心概念

- State：一个对象，保存整个应用状态
- View：React 组件构成的视图层
- Action：一个对象，描述事件
  ```
  {
    type: 'click-submit-button',
    payload: this.form.data
  }
  ```
- connect 方法：一个函数，绑定 State 到 View  
  connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。
- dispatch 方法：一个函数，发送 Action 到 State
  ```
  dispatch({
    type: 'click-submit-button',
    payload: this.form.data
  })
  ```
  被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。

> connect 的数据来源 model

2. model 层
   ```
   {
     namespace: 'count',
     state: 0,
     reducers: {
       add(state) { return state + 1 },
     },
     effects: {
       *addAfter1Second(action, { call, put }) {
         yield call(delay, 1000);
         yield put({ type: 'add' }); //调用名为'add'的reducer
       },
     },
   }
   ```

- namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
- state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
- reducers: Action 处理器，处理**同步动作**，用来算出最新的 State，**state 的计算器**，从上一个 State 算出当前 State。
- effects：Action 处理器，处理**异步动作**
  - Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。
  - dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。
    - call：执行异步函数
    - put：发出一个 Action，类似于 dispatch

## es7 装饰器

@connect

- @form.create  
  经 Form.create() 包装过的组件会自带 this.props.form 属性

## react hook

1. useState() 状态钩子

   ```
   import React, { useState } from "react";

   export default function  Button()  {
     const  [buttonText, setButtonText] =  useState("Click me,   please");

     function handleClick()  {
       return setButtonText("Thanks, been clicked!");
     }

     return  <button  onClick={handleClick}>{buttonText}</button>;
   }
   ```

   useState()这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是 buttonText），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是 set 前缀加上状态的变量名（上例是 setButtonText）。

2. useContext() 共享状态钩子 -> 类似于给两个组件外部包起来的一个父组件

   ```
   const AppContext = React.createContext({});

   const Navbar = () => {
     const { username } = useContext(AppContext)
     return ( // ...)
   }

   const Messages = () => {
     const { username } = useContext(AppContext)
     return ( //...)
   }

   function App() {
     return (
       <AppContext.Provider value={{
         username: 'superawesome'
       }}>
         <div className="App">
           <Navbar />
           <Messages />
         </div>
       </AppContext.Provider>
     );
   }
   ```

3. useReducer() action 钩子
   ```
   const [state, dispatch] = useReducer(reducer, initialState);
   ```
4. useEffect() 副作用钩子
   ```
   useEffect(()  =>  { // Async Action }, [dependencies])
   ```
   useEffect()接受两个参数。第一个参数是一个函数，异步操作的代码放在里面。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。第二个参数可以省略，这时每次组件渲染时，就会执行 useEffect()。
5. 封装 hook

   1. 定义一个 hook

      ```
      const usePerson = (personId) => {
        const [loading, setLoading] = useState(true);
        const [person, setPerson] = useState({});
        useEffect(() => {
          setLoading(true);
          fetch(`https://swapi.co/api/people/${personId}/`)
            .then(response => response.json())
            .then(data => {
              setPerson(data);
              setLoading(false);
            });
        }, [personId]);
        return [loading, person];
      };
      ```

   2. 使用 hook

      ```

      const Person = ({ personId }) => {
        const [loading, person] = usePerson(personId);

        if (loading === true) {
          return <p>Loading ...</p>;
        }

        return (
          <div>
            <p>You're viewing: {person.name}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
          </div>
        );
      };
      ```
