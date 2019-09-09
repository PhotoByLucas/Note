## 2019/08/24
+ generator 函数

	~~~
	function* helloWorldGenerator() {
	  yield 'hello';
	  yield 'world';
	  return 'ending';
	}

	var hw = helloWorldGenerator();

	//调用

	hw.next()
	// { value: 'hello', done: false }

	hw.next()
	// { value: 'world', done: false }

	hw.next()
	// { value: 'ending', done: true }

	hw.next()
	// { value: undefined, done: true }
	~~~
### 2019/09/09
+ \_\_dirname
__dirname 总是指向被执行 js 文件的绝对路径,也就是说你在E:\web\test\abc.js中写__dirname那么路径就是E:\web\test

+ babel是一个js编译器,可以把先进的js版本向下编译
	> https://www.jianshu.com/p/a4c5524799d0