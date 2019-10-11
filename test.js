const data = {
	a: { b: { c: { d: 1, e: 2 } } }, f: 3, g: { k: 'nmlgb' }
}
let items = ['a.b.c.d', 'a.b.c.e', 'f', 'g.k', 'i.k']
function test(data, item) {
	if (item.length > 1) {
		let temp = item.shift()
		if (!data[temp]) return undefined
		return test(data[temp], item)
	}
	else {
		if (!data[item[0]]) return undefined
		console.log(data[item[0]])
		return data[item[0]]
	}
}

items.forEach(item => {

	test(data, item.split('.'))
});
