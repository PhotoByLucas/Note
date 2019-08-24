let koa=require('koa')
let app= new koa()

let mid = function (){
	return function* (next){
		this.body='mark'
		yield next
		this.body+=' done'
	}
}
app.use(mid)

app.use(function* (next){
	this.body+=' saved'
	yield next
})

app.listen(3000)