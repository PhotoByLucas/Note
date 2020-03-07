1. 变量提升 => 前端基础进阶 变量对象
2. bind apply call

    bind
    ~~~
    this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
    var module = {
      x: 81,
      getX: function() { return this.x; }
    };

    module.getX(); // 81

    var retrieveX = module.getX;
    retrieveX();   
    // 返回 9 - 因为函数是在全局作用域中调用的

    // 创建一个新函数，把 'this' 绑定到 module 对象
    // 新手可能会将全局变量 x 与 module 的属性 x 混淆
    var boundGetX = retrieveX.bind(module);
    boundGetX(); // 81
    ~~~
    call apply
    ~~~
    let a = {
      value: 1
    }
    function getValue(name, age) {
      console.log(name)
      console.log(age)
      console.log(this.value)
    }
    getValue.call(a, 'yck', '24')
    getValue.apply(a, ['yck', '24'])
    ~~~
3. 