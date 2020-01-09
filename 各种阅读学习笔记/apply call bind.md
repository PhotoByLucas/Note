[原文](https://github.com/lin-xin/blog/issues/7)

1. 例子

```
var obj = {
    name : 'linxin'
}

function func(firstName, lastName){
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func.apply(obj, ['A', 'B']);    // A linxin B
func.call(obj, 'C', 'D');       // C linxin D
```

2.  作用

    1. 改变 this 指向
    2. 继承

       ```
       var Person1  = function () {
           this.name = 'linxin';
       }
       var Person2 = function () {
           this.getname = function () {
               console.log(this.name);
           }

           //Person1.call(this) 的作用就是使用 Person1 对象代替 this 对象
           Person1.call(this);
       }
       var person = new Person2();
       person.getname();       // linxin
       ```

    3. 调用函数：apply、call 方法都会使函数立即执行，因此它们也可以用来调用函数。
       ```
       function func() {
       console.log('linxin');
       }
       func.call();            // linxin
       ```

3.  call 和 bind 的区别  
    在 ES5 中扩展了叫 bind 的方法，在低版本的 IE 中不兼容。

    1.  bind 返回的是函数值 2. 参数使用

        ```
        function func(a, b, c) {
        console.log(a, b, c);
        }
        var func1 = func.bind(null,'linxin');

        func('A', 'B', 'C');            // A B C
        func1('A', 'B', 'C');           // linxin A B
        func1('B', 'C');                // linxin B C
        func.call(null, 'linxin');      // linxin undefined undefined
        ```
