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