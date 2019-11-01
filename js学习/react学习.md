## redux
### 设计思想
1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。
### 概念
1. store
    ~~~
    import { createStore } from 'redux';
    const store = createStore(fn);
    ~~~
2. state
    ~~~
    import { createStore } from 'redux';
    const store = createStore(fn);

    const state = store.getState();
    ~~~
3. Action
    ~~~
    const action = {
      type: 'ADD_TODO',
      payload: 'Learn Redux'

    };
    ~~~
4. action creator
    ~~~
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
5. dispatch
    ~~~
    import { createStore } from 'redux';
    const store = createStore(fn);

    store.dispatch({
      type: 'ADD_TODO',
      payload: 'Learn Redux'
    });

    // 或者
    store.dispatch(addTodo('Learn Redux'));
    ~~~
6. reducer  
> Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
    ~~~
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
    ~~~
7. 纯函数  
Reducer 函数里面不能改变 State，必须返回一个全新的对象
8. store.subscribe()
    > Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。  
    ~~~
    // 只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

    store.subscribe(listener);


    // 解除监听
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );

    unsubscribe();
    ~~~
### react-redux
React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。
1. UI组件
    + 只负责 UI 的呈现，不带有任何业务逻辑
    + 没有状态（即不使用this.state这个变量）
    + 所有数据都由参数（this.props）提供
    + 不使用任何 Redux 的 API
2. 容器组件
    + 负责管理数据和业务逻辑，不负责 UI 的呈现
    + 带有内部状态
    + 使用 Redux 的 API
3. connect() 用于从 UI 组件生成容器组件
    ~~~
    import { connect } from 'react-redux'

    const VisibleTodoList = connect(
      mapStateToProps,
      mapDispatchToProps
    )(TodoList)
    ~~~
4. mapStateToProps()
5. mapDispatchToProps()
## dvaJS
## es7装饰器
@connect
+ @form.create  
经 Form.create() 包装过的组件会自带 this.props.form 属性

