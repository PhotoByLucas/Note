#### 动态参数
~~~
<a v-on:[eventName]="doSomething"> ... </a>
//当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus。
~~~

#### computed
computed属性中的返回值会根据他们的**依赖**的改变相应的进行重新求值  
使用computed会将上一次的计算结果**存入缓存** 在依赖改变前都不会发生改变  
相对于method可以节省调用时的 **每一次的重新计算**
~~~
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
//现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。
~~~

#### 将class与style动态绑定
#### v-if和v-show 
show会一直保留在DOM元素中 但是if不显示时就不存在DOM中   

#### 事件修饰符
+ .stop 阻止单击事件继续传
+ .prevent 
+ .capture
+ .self
+ .once 只触发一次
+ .passive

#### 组件
+ 对于data应为函数的理解  
+ 监听子组件事件  
+ 父组件每次更新时 子组件的props也会随之更新
+ prop对于传入的对象的验证
~~~
// 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
~~~
+ 组件名和prop由于html的特性会存在自动化的大小写转换 
+ 事件名不会
 ~~~
this.$emit('myEvent')
//此监听无效果 应该为myEvent
<my-component v-on:my-event="doSomething"></my-component>
~~~
+ .sync修饰符 实现父子组件数据双向绑定

### 插槽
+ 具名插槽 默认插槽

```
 <child-component>
        <template slot="girl">
            漂亮、美丽、购物、逛街
        </template>
        <template slot="boy">
            帅气、才实
        </template>
        <div>
            我是一类人，
            我是默认的插槽
        </div>
    </child-component>

Vue.component('child-component',{
        template:`
            <div>
            <h4>这个世界不仅有男人和女人</h4>
            <slot name="girl"></slot>
            <slot name="boy"></slot>
            <slot></slot>
            </div>
```
+ 作用域插槽 每次调用子组件可以有不同的渲染方式 slot-scope

+ keep-alive 来保持组件不被重新渲染
+ 通过$root 来访问根组件 $parent来访问父组件
  