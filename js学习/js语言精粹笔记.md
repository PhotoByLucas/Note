### 数组
map方法
filter 方法
# 2. 语法
+ NaN是一个数值 表示一个不能产生正常结果的运算值 **不等于任何值** 可以用 isNaN(number)俩检测
# 3. 对象
+ JS数据类型 
  + number 
  + string 
  + bool 
  + null 
  + undefined 
  + function
  + object 其他的都是对象
+ 对象检索
  + 默认值填充 
    ~~~  
      let a = obj[1] || '默认值'
    ~~~
  + object[]
  + object.xx
+ 对象原型
+ 枚举
  + for in 遍历对象中特定属性
    ~~~
      let name;
      for (name in person){
        console.log(person[name])
      }
    ~~~
+ 删除 delete obj[name]
+ 只运用一个全局变量来减少全局变量污染 

# 4. 函数
+ 函数传参时过多的参数会被丢弃，缺失的会显示undefined，不对函数进行类型检查
+ 调用
  + 方法调用
      + 一个函数被声明为对象属性时，其中this指向函数所属对象
  + 函数调用
  + 构造器调用
  + apply调用