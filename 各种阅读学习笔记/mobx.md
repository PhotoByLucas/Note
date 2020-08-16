[原文](https://www.zcfy.cc/article/mobx-ten-minute-introduction-to-mobx-and-react-4306.html?t=new)
[运行](https://mobx.js.org/getting-started.html)
~~~
class ObservableTodoStore {
    @observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
        mobx.autorun(() => console.log(this.report));
    }

    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}

const observableTodoStore = new ObservableTodoStore();
~~~

- 为 MobX 标记了一些 **@observable** 属性，这些属性的值可以随时改变。计算值是用 **@computed** 标记以表示他们可以由 state 推导出来。
- 构造器中用**autorun** 包裹它。autorun 创建了一个 响应（Reaction） 并执行一次，之后这个函数中任何 observable 数据变更时，响应都会被自动执行。