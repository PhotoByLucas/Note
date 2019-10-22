## java环境安装
1. 按着[菜鸟教程](https://www.runoob.com/java/java-environment-setup.html)上的走
2. win10中 系统Path中的变量都是成列显示的 不显示说明输入错误 不需要带引号 
3. 在现有的版本中 java不需要配置classpath，只需要配置path和Java_Home两个变量
    ~~~
    Java_Home
    F:\ProgramFiles\Java\jdk1.8.0_131

    Path
    F:\ProgramFiles\Java\jdk1.8.0_131\bin
    F:\ProgramFiles\Java\jdk1.8.0_131\jre\bin
    ~~~
## codorva过于坑爹换react native
1. py环境一定要2不能用3，通过配置环境变量 python --version查看
2. [运行时候开两个终端](https://bbs.reactnative.cn/topic/10/在windows下搭建react-native-android开发环境/36)
    + 一个负责 react-native start
        + 其中有一步是让我们通过浏览器进行访问确认！**但是访问后要记得关掉！否则会占用端口使得模拟器无法启动红屏**
    + 一个负责 react-native run-android
# react 快速入门
## Vitual DOM
1. 用 JavaScript 对象结构表示 DOM 树的结构，然后用这个树构建一个真正的 DOM 树，插到文档当中
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
## react 组件
### 创建
1. 无状态组件 / 函数式组件
2. 有状态组件 / 用class创建
### 通信
~~~
class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        <button onClick={this.props.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}

// ------------分割线-----------
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.props.text || "兄弟组件未更新"}
      </div>
    )
  }
}

// ------------分割线-----------
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refresh(){
    return (e)=>{
      this.setState({
        text: "兄弟组件沟通成功",
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 refresh={this.refresh()}/>
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}
~~~