// demo2
function test() {
	console.log(foo); //foo(){...}
	console.log(bar); //undefined

	var foo = 'Hello';
	console.log(foo); //'Hello'
	var bar = function () {
			return 'world';
	}
	
	console.log(bar); //bar(){...}

	function foo() {
			return 'hello';
	}
}

test();
